import classNames from 'classnames/bind'
import styles from './index.module.scss'
import { Footer, Header } from '../../components'
import { DefaultLayoutProps } from '../../types'
import Navigation from '../../components/Navigation'
import Button from '../../components/Button'

const cx = classNames.bind(styles)

const DefaultLayout = ({
  aside = false,
  children,
  menuType = 'BACK',
  menuName,
  isMobile = false,
}: DefaultLayoutProps) => {
  return (
    <div className={cx('layout')}>
      <Navigation
        // FIXME: routePath 임시 지정 상태.
        menuItems={[
          { menuIcon: 'HOME', menuName: '홈', routePath: '/' },
          { menuIcon: 'SHELF', menuName: '책장', routePath: 'bookshelf' },
          { menuIcon: 'USER', menuName: '프로필', routePath: 'profile' },
          { menuIcon: 'BOOKMARK', menuName: '북마크', routePath: 'bookmark' },
        ]}
      >
        <Button variant='cta' size='large'>
          icon 문장 쓰기
        </Button>
      </Navigation>
      <div className='layout__main-container'>
        <Header menuType={menuType} menuName={menuName} isMobile={isMobile} />
        <main className='layout__main'>{children}</main>
      </div>
      {/* <div className='layout__main-conatiner'>
        <Header />
        {aside && <div id='layoutAside' className='layout__aisde' />}
        <main className='layout__main'>{children}</main>
      </div> */}
    </div>
  )
}

export default DefaultLayout
