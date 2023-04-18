import { axiosAPI } from '../../api-client'
import { CheckTokenRequest, LoginReissueRequest, LoginRequest, LoginResponse } from '../../types/api'

export const snsLogin = async (params: LoginRequest): Promise<LoginResponse> => {
  const { data } = await axiosAPI.post('/api/login', params)
  return data
}

export const loginReissue = async (params: LoginReissueRequest): Promise<LoginResponse> => {
  const { data } = await axiosAPI.post('/api/reissue', params)
  return data
}

export const checkToken = async (params: CheckTokenRequest): Promise<LoginResponse> => {
  const { token, type } = params
  const { data } = await axiosAPI.get(`/api/check-token?token=${token}&type=${type}`)
  return data
}
