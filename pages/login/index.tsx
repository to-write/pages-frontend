import classNames from 'classnames/bind'
import styles from './index.module.scss'
import KakaoButton from '../../shared/components/KakaoLoginButton'

const cx = classNames.bind(styles)

const LoginPage = () => {
  return (
    <div className={cx('login-container')}>
      <div className='login-container__logo'>
        <h1>로고 영역</h1>
      </div>
      <div className='login-container__button-container'>
        <KakaoButton />
      </div>
    </div>
  )
}

export default LoginPage
