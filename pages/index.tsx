import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSessionStore } from '../shared/store'

const HomePage = () => {
  const { logged, nickname } = useSessionStore()

  const router = useRouter()

  useEffect(() => {
    if (logged) {
      // FIXME: 추후 서버단에서 체크 필요할수 있음
      router.replace(`/@${nickname}`)
    }
  }, [logged, nickname, router])

  return <div>랜딩 페이지</div>
}

HomePage.LayoutProps = {
  metaTitle: '랜딩페이지',
  aside: true,
}

export default HomePage
