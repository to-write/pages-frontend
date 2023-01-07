import { CodeResponse, useGoogleLogin } from '@react-oauth/google'
import { SocialLoginProps } from '../../types/SocialLogin'

import styles from './index.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const GoogleLoginButton = ({ type }: SocialLoginProps) => {
  const handleSuccess = (codeResponse: Omit<CodeResponse, 'error' | 'error_description' | 'error_uri'>) => {
    // FIXME: 여기서 백엔드한테 쏴줌
    console.log(codeResponse)
  }

  const handleFail = () => {
    alert('로그인 중 오류가 발생했습니다. 잠시후 다시 시도해주세요.')
  }

  const handleLogin = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: handleFail,
    flow: 'auth-code',
  })

  return (
    <button type='button' onClick={handleLogin} className={cx('google-button')}>
      {type === 'login' && <div className='google-button__login'>구글로 로그인하기</div>}
      {type === 'join' && <div className='google-button__join'>구글로 회원가입하기</div>}
    </button>
  )
}

export default GoogleLoginButton
