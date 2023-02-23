/* eslint-disable camelcase */
import React, { useCallback, useEffect } from 'react'
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse, NextPage } from 'next'
import { useRouter } from 'next/router'
import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next'
import { useLoginMutation } from '../shared/api'
import { LoginRequest } from '../shared/types/api'
import { ServerSideProps } from '../shared/types/common/next'

export interface Token {
  token_type: string
  access_token: string
  refresh_token: string
  id_token: string
  expires_in: number
  refresh_token_expires_in: string
  scope: string
}

const LOGIN_STATUS_STORAGE = 'LoginStatus'

const Kakao = ({ code }: ServerSideProps<typeof getServerSideProps>) => {
  const router = useRouter()
  // const { code, error: kakaoServerError } = router.query
  console.log('code', code)

  // const loginHandler = useCallback(
  //   async (code: string | string[]) => {
  //     try {
  //       await fetch('/api/auth/kakao-login', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           // /api/auth/kakao-login로 인가코드를 보냄
  //           authCode: code,
  //         }),
  //       })
  //       // console.log(response)
  //       // const data = await response.json()
  //       // return data
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   },

  //   [router]
  // )

  // useEffect(() => {
  //   if (authCode) loginHandler(authCode)
  //   if (kakaoServerError) console.log('❗️', kakaoServerError)
  // }, [loginHandler, authCode, kakaoServerError, router])

  const handleSuccess = (userName: string) => {
    // FIXME: 세션 스토리지 생성 시 대체될 내용
    hasCookie(LOGIN_STATUS_STORAGE) && deleteCookie(LOGIN_STATUS_STORAGE)
    setCookie(LOGIN_STATUS_STORAGE, userName)
    router.replace(`/${userName}`)
  }
  const { mutate: loginMutate } = useLoginMutation({ handleSuccess })

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
    const response = await fetch(userInfoUrl, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access_token}` },
    }).then((res: Response) => res.json())
    return response
  }

  const handleLogin = async () => {
    const token = await getTokenFromKakao(code as string) // type 수정 필요
    const user = await getUserFromKakao(token)
    const { access_token: accessToken } = token
    console.log('accessToken: ', accessToken)
    console.log('user: ', user)

    // TODO 여기서 accessToken 사용
    // fetchServiceToken(accessToken)
    // FIXME api/login 400 에러 뜸
    const loginParams: LoginRequest = {
      accessToken,
      authServer: 'kakao',
    }

    await loginMutate(loginParams)
    // await handleLogin()
  }
  // FIXME 여기서 hadleLogin 호출되는 시기 잘 고려해서 코드 좀 잘 짜봐 다시
  useEffect(() => {
    console.log('useEffect')
    handleLogin()
  }, [])
  // handleLogin()
  return <div>로그인 중..</div>
}

export default Kakao

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const code = `${query.code}`

  return {
    props: { code },
  }
}
