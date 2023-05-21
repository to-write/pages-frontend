import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { FailureResponse } from '../types/common'
import { AuthError, BadRequestError, ForbiddenError, NotFoundError } from './errors'

function createAxios(requestConfig: AxiosRequestConfig): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: requestConfig.baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      // eslint-disable-next-line no-console
      console.error('API call failed', error?.response?.config?.url || error)
      const status = error?.response?.status
      const errorData: FailureResponse = error?.response?.data

      // NOTE: 400번대 에러 핸들링
      switch (status) {
        case 400:
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('apiError', { detail: errorData }))
            break
          } else {
            console.log(errorData)
            throw BadRequestError(errorData)
          }
        case 401:
          throw AuthError(errorData)

        case 403:
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('apiError', { detail: errorData }))
            break
          } else {
            throw ForbiddenError(errorData)
          }

        case 404:
          throw NotFoundError()
      }

      return Promise.reject(errorData || error)
    }
  )

  return axiosInstance
}

function getEnvPath(key: string): string {
  let envPath = ''
  if (typeof window !== 'undefined') {
    envPath = key
  } else {
    envPath = key.replace('_PUBLIC', '')
  }

  return process.env.NEXT_PUBLIC_API_URL as string
}

export const axiosAPI = createAxios({ baseURL: getEnvPath('NEXT_PUBLIC_API_URL') })
