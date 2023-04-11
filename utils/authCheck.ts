import { getCookie, hasCookie } from 'cookies-next'
import { ACCESS_TOKEN_STORE, REFRESH_TOKEN_STORE } from '../shared/constants'

export type authCheckType = 'EXPIRATION' | 'ACCESS' | 'REFRESH'

export const authCheck = (): authCheckType => {
  console.log('authcheck', hasCookie(REFRESH_TOKEN_STORE), getCookie(REFRESH_TOKEN_STORE))

  if (!hasCookie(ACCESS_TOKEN_STORE) && !hasCookie(REFRESH_TOKEN_STORE)) return 'EXPIRATION'
  if (hasCookie(ACCESS_TOKEN_STORE)) return 'ACCESS'
  return 'REFRESH'
}
