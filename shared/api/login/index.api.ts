import axios from 'axios'
import { axiosAPI } from '../../api-client'
import { CheckTokenRequest, LoginReissueRequest, LoginRequest, LoginResponse } from '../../types/api'

// FIXME: 로그인은 219.248.110.167:30800 해당 url 로 보내주어야함 추후 수정되면 axiosAPI instance로 변경
export const snsLogin = async (params: LoginRequest): Promise<LoginResponse> => {
  const { data } = await axios.post('http://219.248.110.167:30800/login', params)
  return data
}

export const loginReissue = async (params: LoginReissueRequest): Promise<LoginResponse> => {
  const { data } = await axiosAPI.post('/reissue', params)
  return data
}

export const checkToken = async (params: CheckTokenRequest): Promise<LoginResponse> => {
  const { token, type } = params
  const { data } = await axiosAPI.get(`/check-token?token=${token}&type=${type}`)
  return data
}
