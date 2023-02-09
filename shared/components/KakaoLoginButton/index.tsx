import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.scss'

const cx = classNames.bind(styles)
const KakaoButton = () => {
  const loginWithKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI, // 인가코드 요청에 사용되는 redirect uri
    })
  }
  console.log(process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI)
  return (
    <button className={cx('kakao-button')} type='button' onClick={loginWithKakao}>
      카카오 로그인
    </button>
  )
}
export default KakaoButton
