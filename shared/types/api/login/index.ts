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

export interface LoginReissueRequest {
  refreshToken: string
}

export interface CheckTokenRequest {
  token: string
  type: 'access' | 'refresh'
}
