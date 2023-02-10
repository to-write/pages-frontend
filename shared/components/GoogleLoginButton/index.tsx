import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'
import { SocialLoginProps } from '../../types/SocialLogin'

import styles from './index.module.scss'
import classNames from 'classnames/bind'
import { snsLogin, useLoginMutation } from '../../api'
import { deleteCookie, hasCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { LoginRequest } from '../../types/api'

const cx = classNames.bind(styles)

const LOGIN_STATUS_STORAGE = 'LoginStatus'

const CustomButton = ({ type }: SocialLoginProps) => {
  const { replace: routerReplace } = useRouter()

  const handleSuccess = (userName: string) => {
    // FIXME: 세션 스토리지 생성 시 대체될 내용
    hasCookie(LOGIN_STATUS_STORAGE) && deleteCookie(LOGIN_STATUS_STORAGE)
    setCookie(LOGIN_STATUS_STORAGE, userName)
    routerReplace(`/${userName}`)
  }

  const { mutate: loginMutate } = useLoginMutation({ handleSuccess })

  const handleLogin = useGoogleLogin({
    async onSuccess(res) {
      const accessToken = res.access_token || ''
      const loginParams: LoginRequest = {
        accessToken,
        authServer: 'google',
      }
      loginMutate(loginParams)
    },
    onError() {
      console.error('구글로그인 정보를 가져오지 못했습니다. 잠시 후 다시 시도해 주십시오.')
    },
  })

  const handleClick = () => {
    handleLogin()
  }

  return (
    <button type='button' onClick={handleClick} className={cx('google-button')}>
      {type === 'login' && <div className='google-button__login'>구글로 로그인하기</div>}
      {type === 'join' && <div className='google-button__join'>구글로 회원가입하기</div>}
    </button>
  )
}

const GoogleLoginButton = ({ type }: SocialLoginProps) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
      <CustomButton type={type} />
    </GoogleOAuthProvider>
  )
}

export default GoogleLoginButton
