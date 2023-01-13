import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.scss'
import Link from 'next/link'

const cx = classNames.bind(styles)

type KakaoButtonProps = {}

// TODO Kakao JS SDK Login
const kakaoLogin = () => {
  window.Kakao.Auth.authorize({
    redirectUri: 'http://localhost:3000/kakao',
  })
}

const KakaoButton: React.FC<KakaoButtonProps> = () => {
  return (
    // <Link href='http://localhost:8080/oauth2/authorization/kakao'>
    <button className={cx('kakao-button')} type='button' onClick={kakaoLogin}>
      카카오 로그인
    </button>
    // </Link>
  )
}
export default KakaoButton
