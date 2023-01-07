import { CredentialResponse, GoogleLogin } from '@react-oauth/google'

const GoogleLoginButton = () => {
  const onSuccess = (response: CredentialResponse) => {
    // FIXME: 여기서 백엔드한테 쏴줌
    console.log(response)
  }

  const onFail = () => {
    alert('로그인 실패!')
  }

  return <GoogleLogin onSuccess={onSuccess} onError={onFail} />
}

export default GoogleLoginButton
