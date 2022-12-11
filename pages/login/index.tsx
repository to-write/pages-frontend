import styles from './login.module.scss'
import classNames from 'classnames/bind'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'

const cx = classNames.bind(styles)

const Login = () => {
  // const { data: session } = useSession();
  // 등록한 redirectUri를 매개변수로 넣어준다.

  const kakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/kakao',
    })
  }

  const googleLogin = () => {}

  return (
    <div className={styles.loginBackground}>
      <div className={styles.loginContainer}>
        <div className={styles.contentBox}>
          <h1>로고 영역</h1>
        </div>
        <div className={styles.buttonWrapper}>
          <button type='button' onClick={kakaoLogin}>
            카카오 로그인
          </button>

          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse)
            }}
            onError={() => {
              console.log('Login Failed')
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Login

// http://localhost:3000/kakao?code=1mxdTdVB3UrDy78vZplb5EzKyTCUWyxAXbD4Id6iUbzoHJvNcvb2nt6q_A1GGAHa3AztOgopdSkAAAGEwvdbvA
// 토큰 저장1
