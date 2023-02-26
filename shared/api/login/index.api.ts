import { axiosAPI } from '../../api-client'
import { LoginRequest } from '../../types/api'

export const snsLogin = async (params: LoginRequest) => {
  const { data } = await axiosAPI.post('/api/login', params)
  return data
}
