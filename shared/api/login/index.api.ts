import { axiosAPI } from '../../api-client'
import { LoginReissueRequest, LoginRequest, LoginResponse } from '../../types/api'

export const snsLogin = async (params: LoginRequest): Promise<LoginResponse> => {
  const { data } = await axiosAPI.post('/api/login', params)
  return data
}

export const loginReissue = async (params: LoginReissueRequest): Promise<LoginResponse> => {
  const { data } = await axiosAPI.post('/api/reissue', params)
  return data
}
