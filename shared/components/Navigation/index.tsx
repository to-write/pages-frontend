import classNames from 'classnames/bind'
import { MouseEventHandler, ReactNode } from 'react'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

export type menuItem = { menuIcon: ReactNode | string; menuName: string; onClick?: MouseEventHandler }

export interface NavigationProps {
  children?: ReactNode
  // onClick?: MouseEventHandler
  menuItems?: menuItem[]
}

const Navigation = ({ children, menuItems }: NavigationProps) => {
  console.log('=====', menuItems)
  return (
    <nav className={cx('navigation')}>
      <div className='navigation__menu-container'>
        <div className='navigation__logo'>LOGO</div>
        <ul className='navigation__menu'>
          {menuItems?.map((item) => (
            // FIXME eslint 설정
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li className='navigation__menu-item' key={item.menuName} onClick={item.onClick}>
              <span className='navigation__menu-icon'>{item.menuIcon}</span>
              <span className='navigation__menu-name'>{item.menuName}</span>
            </li>
          ))}
        </ul>
        <div className='navigation__btn-container'> {children} </div>
      </div>

      <div className={cx('navigation-profile')}>
        <div className='navigation-profile__container'>
          <span className='navigation-profile__photo'> 사진자리 </span>
          <span className='navigation-profile__name'>닉네임</span>
        </div>
        <span className='navigation-profile__menu-btn'> ... </span>
      </div>
    </nav>
  )
}

export default Navigation

/*
랜딩페이지에서 로그인 상태
logged true -> 마이페이지
logged false -> 로그인 화면

useRouter - replace
*/
