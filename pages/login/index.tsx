import classNames from 'classnames/bind'
import { GoogleLoginButton } from '../../shared/components'
import styles from './index.module.scss'
import KakaoButton from '../../shared/components/KakaoLoginButton'

const cx = classNames.bind(styles)

const LoginPage = () => {
  return (
    <div className={cx('login-page')}>
      {/* FIXME: 임시 */}
      <h1 className='login-page__title'>로그인 페이지</h1>
      <div className='login-container__button-container'>
        <KakaoButton />
        {/* <GoogleButton /> */}
      </div>

      <GoogleLoginButton type='login' />
    </div>
  )
}

export default LoginPage

LoginPage.LayoutProps = {
  metaTitle: '로그인',
}
