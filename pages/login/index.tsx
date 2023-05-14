import classNames from 'classnames/bind'
import { GoogleLoginButton } from '../../shared/components'
import styles from './index.module.scss'
import KakaoButton from '../../shared/components/KakaoLoginButton'

const cx = classNames.bind(styles)

const LoginPage = () => {
  return (
    <div className={cx('login-page')}>
      <div className='login-page__info-container'>
        <h1 className='login-page__title'>시작하기</h1>
        <div className='login-page__sub-title'>읽고, 발견하고, 연결해보기</div>
      </div>
      <div className='login-page__button-container'>
        <KakaoButton />

        <GoogleLoginButton type='login' />
      </div>
    </div>
  )
}

export default LoginPage

LoginPage.LayoutProps = {
  metaTitle: '로그인',
  menuName: '로그인',
  menuType: 'BACK',
}
