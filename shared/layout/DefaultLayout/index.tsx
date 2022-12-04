import classNames from 'classnames/bind'
import styles from './index.module.scss'
import { ReactNode } from 'react'
import { Footer, Header } from '../../components'

const cx = classNames.bind(styles)

interface DefaultLayoutProps {
  children: ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className={cx('layout-container')}>
      <Header />
      <main className='layout-container__main'>{children}</main>
      <Footer />
    </div>
  )
}

export default DefaultLayout
