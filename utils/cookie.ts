export const ENCODED_URI_REGEX = /^[%.\-a-zA-Z0-9]+$/

export const checkUriEncodedSimply = (str: string) => ENCODED_URI_REGEX.test(str)

/** Decode values that might be malformed */
export const tryDecodeCookieValue = (str: string): [string, null] | [null, string] => {
  try {
    const decoded = decodeURIComponent(str)
    return [decoded, null]
  } catch {
    return [null, str]
  }
}

export type CookieObj = { [key: string]: string }
// FIXME: 추후 타입 수정
interface Cookie {
  ACCESS_TOKEN_STORE: string
  REFRESH_TOKEN_STORE: ''
}

export const sanitizeCookieString = (str: string) => {
  const cookieObj: CookieObj = {
    ACCESS_TOKEN_STORE: '',
    REFRESH_TOKEN_STORE: '',
  }
  if (!str) {
    return cookieObj
  }

  const cookieArray = str.split(';')

  for (let i = 0, max = cookieArray.length; i < max; i += 1) {
    const [key, value] = cookieArray[i].split('=').map((cookie) => cookie.trim())

    cookieObj[key] = value
  }

  return cookieObj
}
