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

type CookieObj = { [key: string]: string | number }

export const sanitizeCookieString = (str: string) => {
  if (!str) {
    return str
  }

  const cookieArray = str.split(';')
  const cookieObj: CookieObj = {}

  for (let i = 0, max = cookieArray.length; i < max; ++i) {
    const [key, value] = cookieArray[i].split('=').map((cookie) => cookie.trim())

    cookieObj[key] = value
  }

  return cookieObj
}
