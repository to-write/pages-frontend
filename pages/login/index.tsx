import classNames from 'classnames/bind'
import styles from './index.module.scss'
import GoogleButton from '../../shared/components/GoogleLoginButton'
import KakaoButton from '../../shared/components/KakaoLoginButton'

import { useRouter } from 'next/router'

const cx = classNames.bind(styles)

const LoginPage = () => {
  const router = useRouter()

  const { access, refresh } = router.query
  // 1. access, refresh를 쿠키에 저장
  // 저장하는 코드 ...

  return (
    <div className={cx('login-container')}>
      <div className='login-container__logo'>
        <h1>로고 영역</h1>
      </div>
      <div className='login-container__button-container'>
        <KakaoButton />
        <GoogleButton />
      </div>
    </div>
  )
}

export default LoginPage
