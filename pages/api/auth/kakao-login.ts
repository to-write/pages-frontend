/* eslint-disable camelcase */
// 먼저 인가코드를 사용해서 토큰을 받아온 뒤
// 받아온 토큰으로 유저 정보를 받는다.
import { NextApiRequest, NextApiResponse } from 'next'

interface Token {
  token_type: string
  access_token: string
  refresh_token: string
  id_token: string
  expires_in: number
  refresh_token_expires_in: string
  scope: string
}

interface UserInfo {
  id: number
  connected_at: string
  properties: {
    nickname: string
    profile_image?: string // 640x640
    thumbnail_image?: string // 110x110
  }
}

const getTokenFromKakao = async (authCode: string) => {
  // 사용자 토큰 요청 시 사용되는 redirect uri
  const tokenUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&code=${authCode}`
  const response: Token = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }).then((res: Response) => res.json())
  return response
}

const getUserFromKakao = async ({ access_token }: Token) => {
  const userInfoUrl = 'https://kapi.kakao.com/v2/user/me'
  const response: any = await fetch(userInfoUrl, {
    // FIXME interface UserInfo
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access_token}` },
  }).then((res: Response) => res.json())
  return response
}

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { authCode } = request.body // 인가코드

  // 토큰 받아오기
  const token = await getTokenFromKakao(authCode)
  console.log('💡 handler / token ---', token)
  // 유저 받아오기
  const user = await getUserFromKakao(token)
  console.log('💡 handler / user ---', user)

  // BE로 access token 보내기 + 서비스 토큰 요청하기
  const { access_token: accessToken } = token
  reqeustServiceToken(accessToken)
}

export default handler

const reqeustServiceToken = async (accessToken: string) => {
  fetch('http://220.127.44.94:30800/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      authServer: 'kakao',
      accessToken,
    }),
  })
    .then((reponse) => reponse.json)
    .then((data) => console.log(data))
}
