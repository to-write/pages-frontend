import { GetServerSidePropsContext } from 'next'
import { ServerSideProps } from '../shared/types/common/next'
import { useRouter } from 'next/router'
import { useSessionStore } from '../shared/store'
import { useEffect } from 'react'
import { useReissueMutation } from '../shared/api'
import { LoginResponse } from '../shared/types/api'

const MyPage = ({ id }: ServerSideProps<typeof getServerSideProps>) => {
  const { logged, nickname, accessToken, refreshToken } = useSessionStore()

  const isNotMine = id !== `@${nickname}` && nickname
  const formmatError = !id.includes('@')

  const router = useRouter()
  const handleSuccess = ({ nickname: name }: LoginResponse) => {
    router.replace(`/@${name}`)
  }
  const { mutate: reissueLoginMutate } = useReissueMutation({ handleSuccess })

  useEffect(() => {
    if (formmatError) {
      alert('에러')
      router.replace('/')
      return
    }
    if (isNotMine) {
      alert('유저 불일치')
      router.replace('/')
      return
    }

    if (!logged && !accessToken && !refreshToken) {
      alert('로그인이 필요한 서비스입니다.')
      router.replace('/login')
      return
    }

    if (!logged && !accessToken && refreshToken) {
      try {
        reissueLoginMutate({ refreshToken })
      } catch (e) {
        alert('로그인이 필요한 서비스입니다.')
        router.replace('/login')
      }
    }
  }, [logged, id, router])

  if (isNotMine || formmatError) {
    return <div>페이지를 찾을 수 없습니다.</div>
  }

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

export const getServerSideProps = async ({ query, res, req }: GetServerSidePropsContext) => {
  const id = `${query.id}`

  console.log('req test', req)
  console.log('res test', res)

  return {
    props: { id },
  }
}
