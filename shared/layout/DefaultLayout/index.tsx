import classNames from 'classnames/bind'
import styles from './index.module.scss'
import { ReactNode } from 'react'
<<<<<<< HEAD
import { Footer, Header } from '../../components'
=======
>>>>>>> bdf0f38 (Add : 각종 패키지 설치 & env 설정 (shared))

const cx = classNames.bind(styles)

interface DefaultLayoutProps {
  children: ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
<<<<<<< HEAD
    <div className={cx('layout-container')}>
      <Header />
      <main className='layout-container__main'>{children}</main>
      <Footer />
=======
    <div>
      <header>헤더 영역</header>
      <main>{children}</main>
>>>>>>> bdf0f38 (Add : 각종 패키지 설치 & env 설정 (shared))
    </div>
  )
}

export default DefaultLayout
