import classNames from 'classnames/bind'
import styles from './index.module.scss'
import { Footer, Header } from '../../components'
import { DefaultLayoutProps } from '../../types'

const cx = classNames.bind(styles)

const DefaultLayout = ({
  aside = false,
  children,
  menuType = 'BACK',
  menuName,
  isMobile = false,
}: DefaultLayoutProps) => {
  return (
    <div className={cx('layout-container')}>
      <Header menuType={menuType} menuName={menuName} isMobile={isMobile} />
      <div className='layout-container__main-conatiner'>
        {!isMobile && aside && <aside id='layout-aside' className='layout-container__aside' />}
        <main className='layout-container__main'>{children}</main>
      </div>
      <Footer />
    </div>
  )
}

export default DefaultLayout
