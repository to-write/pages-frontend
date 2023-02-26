import classNames from 'classnames/bind'
import styles from './index.module.scss'
import GoogleButton from '../../shared/components/GoogleLoginButton'
import KakaoButton from '../../shared/components/KakaoLoginButton'
import { Display, Heading, Body } from '../../shared/components/Typography'

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

        {/* Typography 시용 예 */}
        <Display type='44'>Display</Display>
        <Heading type='15' weight='regular'>
          Heading
        </Heading>
        <Body>Body</Body>
      </div>
    </div>
  )
}

export default LoginPage
