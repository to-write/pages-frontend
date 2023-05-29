import { deleteCookie, hasCookie } from 'cookies-next'
import { ACCESS_TOKEN_STORE, REFRESH_TOKEN_STORE } from '../shared/constants'

export const logout = (callback: () => void) => {
  // TODO: 추후 Alert 컴포넌트로 대체 예정
  // eslint-disable-next-line no-restricted-globals, no-alert
  if (confirm('로그아웃 하시겠습니까?')) {
    hasCookie(ACCESS_TOKEN_STORE) && deleteCookie(ACCESS_TOKEN_STORE)
    hasCookie(REFRESH_TOKEN_STORE) && deleteCookie(REFRESH_TOKEN_STORE)
    callback()
  }
}
