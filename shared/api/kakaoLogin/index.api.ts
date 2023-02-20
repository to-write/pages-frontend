/* eslint-disable consistent-return */
import axios from 'axios'

export const getKakaoToken = async (code: string | string[]) => {
  const url = 'https://kauth.kakao.com/oauth/token'
  const params = {
    grant_type: 'authorization_code',
    client_id: process.env.NEXT_PUBLIC_KAKAO_JS_KEY,
    redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
    code,
  }

  try {
    const response = await axios.post(url, null, {
      params,
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    })

    return response.data
  } catch (error) {
    console.error(error as Error)
  }
}

export const getKakaoInfo = async (token: string) => {
  const url = 'https://kapi.kakao.com/v1/user/access_token_info'
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await axios.get(url, config)
    const { id } = response.data

    return id
  } catch (error) {
    console.error(error as Error)
  }
}
