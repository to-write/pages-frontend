import React, { useCallback, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const Kakao: NextPage = () => {
  const router = useRouter()
  const { code: authCode, error: kakaoServerError } = router.query

  const loginHandler = useCallback(
    async (code: string | string[]) => {
      const response: Response = await fetch('/api/auth/kakao-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authCode: code,
        }),
      }).then((res: Response) => res.json())

      if (response.ok) {
        // 성공하면 홈으로 리다이렉트
        router.push('/')
      } else {
        // 실패하면 에러 페이지로 리다이렉트
        router.push('/notifications/authentication-failed')
      }
      // try {
      //   const response = await fetch('', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       authCode: code,
      //     }),
      //   })
      //   const data = await response.json()
      //   console.log('code, data : ', code, data)
      //   router.push('/')
      //   return data
      // } catch (error) {
      //   console.log(error)
      // }
      // return code
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
