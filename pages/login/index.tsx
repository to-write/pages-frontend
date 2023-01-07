import classNames from 'classnames/bind'
import styles from './index.module.scss'
import GoogleLoginButton from '../../shared/components/GoogleLoginButton'

const cx = classNames.bind(styles)

const LoginPage = () => {
  // const { data: session } = useSession();
  // 등록한 redirectUri를 매개변수로 넣어준다.
  function kakaoLogin() {
    // window.Kakao.Auth.authorize({
    //   redirectUri: 'http://localhost:3000/kakao',
    // })
  }

  return (
    <div className={cx('login-page')}>
      {/* FIXME: 임시 */}
      <h1 className='login-page__title'>로그인 페이지</h1>
      <button type='button' onClick={kakaoLogin}>
        카카오 로그인
      </button>
      <GoogleLoginButton type='login' />
    </div>
  )
}

export default LoginPage

LoginPage.LayoutProps = {
  metaTitle: '로그인',
}

// http://localhost:3000/kakao?code=1mxdTdVB3UrDy78vZplb5EzKyTCUWyxAXbD4Id6iUbzoHJvNcvb2nt6q_A1GGAHa3AztOgopdSkAAAGEwvdbvA
// 토큰 저장1
