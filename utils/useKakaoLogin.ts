import { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const TOKEN_URL = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`

const useKakaoLogin = () => {
  const router = useRouter()
  const { code: kakaoAuthCode, error: KakaoServerError } = router.query

  const getTokenFromKakao = async (authCode: string | string[]): Promise<any> => {
    try {
      await fetch(`${TOKEN_URL}&code=${authCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authCode,
        }),
      })
    } catch (error) {
      console.log(error)
    }
  }

  const loginHandler = async () => {
    const token = await getTokenFromKakao(kakaoAuthCode as string | string[])
    const { access_token: accessToken } = token

    console.log('==== useKakaoLogin - loginhandler ====', accessToken)

    return accessToken
  }

  useEffect(() => {
    if (kakaoAuthCode) getTokenFromKakao(kakaoAuthCode)
    if (KakaoServerError) console.log(KakaoServerError)
  }, [KakaoServerError, kakaoAuthCode])

  return [loginHandler]
}

export default useKakaoLogin
