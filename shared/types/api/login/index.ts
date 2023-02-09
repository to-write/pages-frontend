export interface LoginRequest {
  accessToken: string
  authServer: 'kakao' | 'google'
}

export interface LoginResponse {
  access: {
    expiresIn: number
    token: string
  }
  nickname: string
  refresh: {
    expiresIn: number
    token: string
  }
}
