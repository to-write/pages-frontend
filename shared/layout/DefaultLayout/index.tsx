import classNames from 'classnames/bind'
import styles from './index.module.scss'
import { Footer, Header } from '../../components'
import { DefaultLayoutProps } from '../../types'

const cx = classNames.bind(styles)

const DefaultLayout = ({ children, aside = false }: DefaultLayoutProps) => {
  return (
    <div className={cx('layout-container')}>
      <Header />
      <div className='layout-container__main-conatiner'>
        {aside && <div id='layoutAside' className='layout-container__aisde' />}
        <main className='layout-container__main'>{children}</main>
      </div>
      <Footer />
    </div>
  )
}

export default DefaultLayout
