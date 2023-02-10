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
        const response = await fetch('/api/auth/kakao-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            authCode: code,
          }),
        })
        console.log(response)
        const data = await response.json()
        return data
      } catch (error) {
        console.log(error)
      }

      // const response: Response = await fetch('/api/auth/kakao-login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     authCode: code,
      //   }),
      // }).then((res: Response) => res.json())

      // console.log('response: ', response)

      // if (hasCookie(LOGIN_STATUS_STORAGE)) {
      //   const userName = getCookie(LOGIN_STATUS_STORAGE)
      //   console.log('kakao username', userName)
      //   router.replace(`/${userName}`)
      // }

      // TODO 라우팅 설정
      // if (response.ok) {
      //   router.push('/')
      // } else {
      //   router.push('/notifications/authentication-failed')
      // }
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
