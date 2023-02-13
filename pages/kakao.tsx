import React, { useCallback, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { getCookie, hasCookie } from 'cookies-next'

const LOGIN_STATUS_STORAGE = 'LoginStatus'

const Kakao: NextPage = () => {
  const router = useRouter()
  const { code: authCode, error: kakaoServerError } = router.query

  const loginHandler = useCallback(
    async (code: string | string[]) => {
      try {
        await fetch('/api/auth/kakao-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // /api/auth/kakao-login로 인가코드를 보냄
            authCode: code,
          }),
        })
        // console.log(response)
        // const data = await response.json()
        // return data
      } catch (error) {
        console.log(error)
      }
    },

    [router]
  )

  useEffect(() => {
    if (authCode) loginHandler(authCode)
    if (kakaoServerError) console.log('❗️', kakaoServerError)
  }, [loginHandler, authCode, kakaoServerError, router])
  return <div>로그인 중..</div>
}

export default Kakao
