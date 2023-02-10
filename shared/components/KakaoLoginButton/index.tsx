import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.scss'
import { getCookie, hasCookie } from 'cookies-next'
import { useRouter } from 'next/router'

const LOGIN_STATUS_STORAGE = 'LoginStatus'

const cx = classNames.bind(styles)
const KakaoButton = () => {
  const router = useRouter()
  const loginWithKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
    })
  }
  // if (hasCookie(LOGIN_STATUS_STORAGE)) {
  //   const userName = getCookie(LOGIN_STATUS_STORAGE)
  //   console.log('kakao username', userName)
  //   router.replace(`/${userName}`)
  // }
  return (
    <button className={cx('kakao-button')} type='button' onClick={loginWithKakao}>
      카카오 로그인
    </button>
  )
}
export default KakaoButton
