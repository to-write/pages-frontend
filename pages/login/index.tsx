import classNames from 'classnames/bind'
import styles from './index.module.scss'
import GoogleButton from '../../components/oauth/google'
import KakaoButton from '../../components/oauth/kakao'

const cx = classNames.bind(styles)

const LoginPage = () => {
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

// http://localhost:3000/kakao?code=1mxdTdVB3UrDy78vZplb5EzKyTCUWyxAXbD4Id6iUbzoHJvNcvb2nt6q_A1GGAHa3AztOgopdSkAAAGEwvdbvA
// 토큰 저장1
