/* eslint-disable camelcase */
import { QueryClient, useQuery } from 'react-query'
import { LOGIN_QUERY_KEY } from '../queryKey'
import { getUserFromKakao } from './index.api'

export const useGetUserFromKakao = (accessToken: string) =>
  useQuery([LOGIN_QUERY_KEY.KAKAO.GET_USER, accessToken], () => getUserFromKakao(accessToken))

export const fetchUserFromKakao = (accessToken: string) => {
  const queryClient = new QueryClient()

  queryClient.prefetchQuery([LOGIN_QUERY_KEY.KAKAO.GET_USER, accessToken], () => getUserFromKakao(accessToken))
  return queryClient
}
