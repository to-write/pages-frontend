import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.scss'
import { getCookie, hasCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import useKakaoLogin from '../../../utils/useKakaoLogin'

const LOGIN_STATUS_STORAGE = 'LoginStatus'
const TOKEN_URL = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`

const cx = classNames.bind(styles)
const KakaoButton = () => {
  const router = useRouter()

  const loginWithKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
    })
  }
  const { code: kakaoAuthCode, error: KakaoServerError } = router.query
  console.log('kakaoAuthCode', kakaoAuthCode)

  const getTokenFromKakao = async (authCode: string | string[] | undefined): Promise<any> => {
    const tokenUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&code=${authCode}`
    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authCode,
        }),
      })

      const data = JSON.stringify(response)
      console.log('getTokenFromKakao - data', data)
    } catch (error) {
      console.log('getTokenFromKakao - error ', error)
    }
  }

  getTokenFromKakao(kakaoAuthCode)
  const loginHandler = async () => {
    try {
      // window.Kakao.Auth.authorize({
      //   redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
      // })
      // const { code: kakaoAuthCode, error: KakaoServerError } = router.query
      // console.log('kakaoAuthCode', kakaoAuthCode)
      // const token = await getTokenFromKakao(kakaoAuthCode as string | string[])
      // const { access_token: accessToken } = token
      // console.log('==== useKakaoLogin - loginhandler ====', accessToken)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button className={cx('kakao-button')} type='button' onClick={loginWithKakao}>
      카카오 로그인
    </button>
  )
}
export default KakaoButton
