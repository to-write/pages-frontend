// import { useLoginMutation } from './../../../shared/api/login/index.mutation'
/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import { deleteCookie, hasCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/router'

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
  connected_at: Date | string
  properties: { nickname: string }
  kakao_account: {
    profile_nickname_needs_agreement: boolean
    profile_image_needs_agreement: boolean
    profile: { nickname: string }
    has_email: boolean
    email_needs_agreement: boolean
    is_email_valid: boolean
    is_email_verified: boolean
    email: string
    has_gender: boolean
    gender_needs_agreement: boolean
  }
}

// TODO interface 이름 수정필요
interface ResponseBody {
  nickName: string
  access: TokenType
  refresh: TokenType
}
type TokenType = { token: string; expiresIn: number }

const getTokenFromKakao = async (authCode: string) => {
  const tokenUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&code=${authCode}`
  const response: Token = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }).then((res: Response) => res.json())
  return response
}

const getUserFromKakao = async ({ access_token }: Token) => {
  const userInfoUrl = 'https://kapi.kakao.com/v2/user/me'
  const response: UserInfo = await fetch(userInfoUrl, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access_token}` },
  }).then((res: Response) => res.json())
  return response
}

const LOGIN_STATUS_STORAGE = 'LoginStatus'
// const { replace: routerReplace } = useRouter()

// const handleSuccess = (userName: string) => {
//   // FIXME: 세션 스토리지 생성 시 대체될 내용
//   hasCookie(LOGIN_STATUS_STORAGE) && deleteCookie(LOGIN_STATUS_STORAGE)
//   setCookie(LOGIN_STATUS_STORAGE, userName)
//   routerReplace(`/${userName}`)
// }

// const { mutate: loginMutate } = useLoginMutation({})

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { authCode } = request.body

  const token = await getTokenFromKakao(authCode)

  const user = await getUserFromKakao(token)

  const { access_token: accessToken } = token

  // 여기서 accessToken 사용

  fetchServiceToken(accessToken)
}

export default handler

const fetchServiceToken = async (accessToken: string) => {
  fetch('http://220.127.44.94:30800/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      authServer: 'kakao',
      accessToken,
    }),
  })
    .then((reponse) => reponse.json())
    .then((data) => {
      console.log('📍 data ---', data)
      const user: ResponseBody[] = [data]
      const responseBody = user.map((item) => {
        return {
          nickName: item.nickName,
          access: item.access,
          refresh: item.refresh,
        }
      })
    })
}
