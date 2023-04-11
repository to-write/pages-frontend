import { GetServerSidePropsContext } from 'next'
import { ServerSideProps } from '../shared/types/common/next'
import { useRouter } from 'next/router'
import { useSessionStore } from '../shared/store'
import { useEffect } from 'react'
import { getCookie, hasCookie } from 'cookies-next'
import { ACCESS_TOKEN_STORE, REFRESH_TOKEN_STORE } from '../shared/constants'
import { authCheck } from '../utils/authCheck'
import { useReissueMutation } from '../shared/api'
import { LoginResponse } from '../shared/types/api'

const MyPage = ({ id, authState }: ServerSideProps<typeof getServerSideProps>) => {
  const { logged, nickname, accessToken, refreshToken } = useSessionStore()

  const router = useRouter()
  const handleSuccess = ({ nickname: name }: LoginResponse) => {
    router.replace(`/${name}`)
  }
  const { mutate: reissueLoginMutate } = useReissueMutation({ handleSuccess })

  useEffect(() => {
    console.log('cookie', hasCookie(REFRESH_TOKEN_STORE))

    if (!id) {
      router.replace('/')
    }
    if (!logged) {
      alert('로그인이 필요한 서비스입니다.')
      router.replace('/login')

      // if (authState === 'EXPIRATION') {
      //   alert('로그인이 필요한 서비스입니다.')
      //   router.replace('/login')
      //   return
      // }
      // if (authState === 'REFRESH') {
      //   reissueLoginMutate({ refreshToken: `${getCookie(REFRESH_TOKEN_STORE)}` })
      // }
    }
  }, [logged, id])

  if (!logged) {
    // FIXME: 임시
    return <div>로그인이 필요합니다</div>
  }

  return (
    <div>
      <h1 className='my-page__title'>{id} 페이지</h1>
    </div>
  )
}

export default MyPage

MyPage.LayoutProps = {
  metaTitle: `마이페이지`,
}

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const id = `${query.id}`

  return {
    props: { id, authState: authCheck() },
  }
}
