import classNames from 'classnames/bind'
import styles from './index.module.scss'
import { ReactNode } from 'react'

const cx = classNames.bind(styles)

interface DefaultLayoutProps {
  children: ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div>
      <header>헤더 영역</header>
      <main>{children}</main>
    </div>
  )
}

export default DefaultLayout
