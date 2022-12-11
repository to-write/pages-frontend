import AsidePortal from '../shared/components/AsidePortal'

const HomePage = () => {
  return (
    <div>
      랜딩 페이지
      <AsidePortal>
        <aside>어사이드입니다</aside>
      </AsidePortal>
    </div>
  )
}

HomePage.LayoutProps = {
  metaTitle: '랜딩페이지',
  aside: true,
}

export default HomePage
