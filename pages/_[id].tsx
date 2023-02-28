import { GetServerSidePropsContext } from 'next'
import { ServerSideProps } from '../shared/types/common/next'
import { useRouter } from 'next/router'

const MyPage = ({ id }: ServerSideProps<typeof getServerSideProps>) => {
  const router = useRouter()
  console.log('======id', id)
  if (!id) router.replace('/')

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
    props: { id },
  }
}
