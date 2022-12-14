import React from 'react'
import { GoogleLogin } from '@react-oauth/google'

type GoogleButtonProps = {}

const GoogleButton: React.FC<GoogleButtonProps> = () => {
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          // FIXME 임시
          console.log(credentialResponse)
        }}
        onError={() => {
          // FIXME 임시
          console.log('Login Failed')
        }}
      />
    </div>
  )
}
export default GoogleButton
