import { deleteCookie, hasCookie, setCookie } from 'cookies-next'
import dayjs from 'dayjs'
import { ACCESS_TOKEN_STORE, REFRESH_TOKEN_STORE } from '../shared/constants'
import { LoginResponse } from '../shared/types/api'

// FIXME: 보안 이슈 존재
/** 로그인 완료 후 쿠키 세팅할 함수 */
export const setLoginCookie = ({ access, refresh }: Omit<LoginResponse, 'nickname'>) => {
  const { expiresIn: accessExpires, token: accessToken } = access
  const { expiresIn: refreshExpires, token: refreshToken } = refresh

  // accessToken 쿠키 세팅
  hasCookie(ACCESS_TOKEN_STORE) && deleteCookie(ACCESS_TOKEN_STORE)
  setCookie(ACCESS_TOKEN_STORE, accessToken, { expires: dayjs().add(accessExpires, 'millisecond').toDate() })

  // refreshToken 쿠키 세팅
  hasCookie(REFRESH_TOKEN_STORE) && deleteCookie(REFRESH_TOKEN_STORE)
  setCookie(REFRESH_TOKEN_STORE, refreshToken, { expires: dayjs().add(refreshExpires, 'millisecond').toDate() })
}
