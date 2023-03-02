/* eslint-disable camelcase */
import React, { useEffect } from 'react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { getTokenFromKakao, useLoginMutation } from '../shared/api'
import { LoginRequest, LoginResponse } from '../shared/types/api'
import { ServerSideProps } from '../shared/types/common/next'
import { dehydrate } from 'react-query'
import { fetchUserFromKakao, useGetUserFromKakao } from '../shared/api/kakaoLogin/index.queries'
import { setLoginCookie } from '../utils'

const Kakao = ({ accessToken }: ServerSideProps<typeof getServerSideProps>) => {
  const router = useRouter()
  const { data } = useGetUserFromKakao(accessToken)

  const handleSuccess = ({ access, refresh, nickname }: LoginResponse) => {
    setLoginCookie({ access, refresh })

    router.replace(`/${nickname}`)
  }

  const { mutate: loginMutate } = useLoginMutation({ handleSuccess })

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
