import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSessionStore } from '../shared/store'

const HomePage = () => {
  const { logged, nickname, isMobile } = useSessionStore()

  const router = useRouter()

  useEffect(() => {
    if (logged) {
      // FIXME: 추후 서버단에서 체크 필요할수 있음 현재 다소 부자연스럽게 동작
      router.replace(`/@${nickname}`)
    }
  }, [logged, nickname, router])

  return (
    <div>
      <span>랜딩 페이지</span>
    </div>
  )
}

HomePage.LayoutProps = {
  metaTitle: '랜딩페이지',
  aside: true,
}

export default HomePage
