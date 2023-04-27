import classNames from 'classnames/bind'
import { MouseEventHandler, ReactNode } from 'react'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

export type menuItem = { menuIcon: ReactNode | string; menuName: string; onClick?: MouseEventHandler }

export interface NavigationProps {
  children?: ReactNode
  onClick?: MouseEventHandler
  menuItems?: menuItem[]
}

const Navigation = ({ children, menuItems, onClick }: NavigationProps) => {
  return (
    <nav className={cx('navigation')}>
      <div className='navigation__menu-container'>
        <div className='navigation__logo'>LOGO</div>
        <ul className='navigation__menu'>
          <li className='navigation__menu-item'>
            <span className='navigation__menu-icon'>icon</span>
            <span className='navigation__menu-name'>홈</span>
          </li>
          <li className='navigation__menu-item'>
            <span className='navigation__menu-icon'>icon</span>
            <span className='navigation__menu-name'>내 책장</span>
          </li>
          <li className='navigation__menu-item'>
            <span className='navigation__menu-icon'>icon</span>
            <span className='navigation__menu-name'>내 프로필</span>
          </li>
        </ul>
        <div className='navigation__btn-container'> 버튼 컴포넌트</div>
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
