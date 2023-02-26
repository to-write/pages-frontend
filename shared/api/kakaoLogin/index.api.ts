/* eslint-disable consistent-return */
import axios from 'axios'

export interface Token {
  token_type: string
  access_token: string
  refresh_token: string
  id_token: string
  expires_in: number
  refresh_token_expires_in: string
  scope: string
}

export const getTokenFromKakao = async (code: string): Promise<Token | any> => {
  const url = `https://kauth.kakao.com/oauth/token`
  const params = {
    grant_type: 'authorization_code',
    client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
    redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
    code,
  }
  const { data } = await axios.post(url, undefined, { params })

  return data
}

export const getUserFromKakao = async (accessToken: string) => {
  const userInfoUrl = 'https://kapi.kakao.com/v2/user/me'
  const { data } = await axios.get(userInfoUrl, { headers: { Authorization: `Bearer ${accessToken}` } })
  return data
}
