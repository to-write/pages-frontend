import classNames from 'classnames/bind'
import styles from './index.module.scss'
import { Footer, Header } from '../../components'
import { DefaultLayoutProps } from '../../types'
import Navigation from '../../components/Navigation'
import Button from '../../components/Button'

const cx = classNames.bind(styles)

const DefaultLayout = ({ children, aside = false }: DefaultLayoutProps) => {
  const tempOnClick = () => console.log('클릭')

  return (
    <div className={cx('layout')}>
      <Navigation
        menuItems={[
          { menuIcon: 'iconA', menuName: 'nameA', onClick: tempOnClick },
          { menuIcon: 'iconB', menuName: 'nameB', onClick: tempOnClick },
          { menuIcon: 'iconC', menuName: 'nameC', onClick: tempOnClick },
        ]}
      >
        <Button type='cta' size='large'>
          icon 문장 쓰기
        </Button>
      </Navigation>
      <div className='layout__main-container'>
        <Header />
        <main className='layout__main'>
          {children}
          {/* <button type='button' onClick={() => console.log('test')}>
            click me
          </button>
          <br /> */}
          <button type='button' onClick={tempOnClick}>
            click me
          </button>
        </main>
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
