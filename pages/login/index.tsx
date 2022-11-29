const Login = () => {
  // const { data: session } = useSession();
  // 등록한 redirectUri를 매개변수로 넣어준다.
  function kakaoLogin() {
    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/kakao',
    })
  }

  return (
    <div>
      <button type='button' onClick={kakaoLogin}>
        카카오 로그인
      </button>
    </div>
  )
}

export default Login

// http://localhost:3000/kakao?code=1mxdTdVB3UrDy78vZplb5EzKyTCUWyxAXbD4Id6iUbzoHJvNcvb2nt6q_A1GGAHa3AztOgopdSkAAAGEwvdbvA
// 토큰 저장
