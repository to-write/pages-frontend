import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'

import styles from './index.module.scss'
import classNames from 'classnames/bind'
import { useLoginMutation } from '../../api'
import { useRouter } from 'next/router'
import { LoginRequest, LoginResponse } from '../../types/api'
import { setLoginCookie } from '../../../utils'

const cx = classNames.bind(styles)

const rootClass = 'google-button'

export interface GoogleLoginButtonProps {
  type: 'login' | 'join'
  size?: 'small' | 'regular'
}

const CustomButton = ({ type, size = 'regular' }: GoogleLoginButtonProps) => {
  const { replace: routerReplace } = useRouter()

  const handleSuccess = ({ access, refresh, nickname }: LoginResponse) => {
    setLoginCookie({ access, refresh })

    routerReplace(`/@${nickname}`)
  }

  const { mutate: loginMutate } = useLoginMutation({ handleSuccess })

  const handleLogin = useGoogleLogin({
    // useGoogleLogin Hook에서 acceess토큰 받아옴
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
    <button type='button' onClick={handleClick} className={cx(`${rootClass}`, `${rootClass}__${size}`)}>
      {type === 'login' && <div className='google-button__login'>구글로 로그인하기</div>}
      {type === 'join' && <div className='google-button__join'>구글로 회원가입하기</div>}
    </button>
  )
}

const GoogleLoginButton = ({ type, size = 'regular' }: GoogleLoginButtonProps) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
      <CustomButton type={type} size={size} />
    </GoogleOAuthProvider>
  )
}

export default GoogleLoginButton
