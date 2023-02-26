/* eslint-disable camelcase */
import React, { useEffect } from 'react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { deleteCookie, hasCookie, setCookie } from 'cookies-next'
import { getTokenFromKakao, useLoginMutation } from '../shared/api'
import { LoginRequest } from '../shared/types/api'
import { ServerSideProps } from '../shared/types/common/next'
import { dehydrate } from 'react-query'
import { fetchUserFromKakao, useGetUserFromKakao } from '../shared/api/kakaoLogin/index.queries'

const LOGIN_STATUS_STORAGE = 'LoginStatus'

const Kakao = ({ accessToken }: ServerSideProps<typeof getServerSideProps>) => {
  const router = useRouter()
  const { data } = useGetUserFromKakao(accessToken)

  const handleSuccess = (userName: string) => {
    // FIXME: 세션 스토리지 생성 시 대체될 내용
    hasCookie(LOGIN_STATUS_STORAGE) && deleteCookie(LOGIN_STATUS_STORAGE)
    setCookie(LOGIN_STATUS_STORAGE, userName)
    router.replace(`/${userName}`)
  }

  const { mutate: loginMutate } = useLoginMutation({ handleSuccess })

  // FIXME 여기서 hadleLogin 호출되는 시기 잘 고려해서 코드 좀 잘 짜봐 다시
  useEffect(() => {
    const loginParams: LoginRequest = {
      accessToken,
      authServer: 'kakao',
    }

    loginMutate(loginParams)
  }, [])

  return <div>로그인 중..</div>
}

export default Kakao

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const code = `${query.code}`
  const { access_token: accessToken } = await getTokenFromKakao(code)

  const queryClient = fetchUserFromKakao(accessToken)

  return {
    props: { dehydrateState: dehydrate(queryClient), code, accessToken },
  }
}
