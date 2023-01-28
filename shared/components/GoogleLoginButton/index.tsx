import { CodeResponse, useGoogleLogin } from '@react-oauth/google'
import { SocialLoginProps } from '../../types/SocialLogin'

import styles from './index.module.scss'
import classNames from 'classnames/bind'
import { snsLogin, SnsLoginParams } from '../../api'

const cx = classNames.bind(styles)

const GoogleLoginButton = ({ type }: SocialLoginProps) => {
  const handleSuccess = async (codeResponse: Omit<CodeResponse, 'error' | 'error_description' | 'error_uri'>) => {
    // FIXME: 여기서 백엔드한테 쏴줌
    const { code: accessToken } = codeResponse

    const loginParams: SnsLoginParams = {
      accessToken,
      authServer: 'google',
    }
    console.log(codeResponse)

    await snsLogin(loginParams).then((res) => console.log('res', res.data))
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
