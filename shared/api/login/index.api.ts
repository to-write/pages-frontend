import { axiosAPI } from '../../api-client'

export interface SnsLoginParams {
  accessToken: string
  authServer: 'kakao' | 'google'
}

export const snsLogin = (params: SnsLoginParams) => axiosAPI.post('/api/login', params)
