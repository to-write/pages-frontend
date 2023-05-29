import classNames from 'classnames/bind'
import { MouseEventHandler, ReactNode } from 'react'
import { useLogout } from '../../hooks'
import { useSessionStore } from '../../store'
import Button from '../Button'
import Icon from '../Icon'
import UserProfileImg from '../UserProfileImg'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

export type menuItem = { menuIcon: ReactNode | string; menuName: string; onClick?: MouseEventHandler }

export interface NavigationProps {
  children?: ReactNode
  menuItems?: menuItem[]
}

const Navigation = ({ children, menuItems = [] }: NavigationProps) => {
  const { nickname, logged } = useSessionStore()
  const { logout } = useLogout()

  return (
    <nav className={cx('navigation')}>
      <div className='navigation__menu-container'>
        <div className='navigation__logo'>LOGO</div>
        <ul className='navigation__menu'>
          {menuItems.map(({ menuIcon, menuName, onClick }) => (
            <li className='navigation__menu-item' key={menuName}>
              <button className='navigation__menu-item-contents' type='button' onClick={onClick}>
                <span className='navigation__menu-icon'>{menuIcon}</span>
                <span className='navigation__menu-name'>{menuName}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className='navigation__btn-container'> {children} </div>
        {/* FIXME: 로그아웃 기능 테스트용 임시 버튼 */}
        <Button variant='cta' size='large' onClick={logout}>
          로그아웃 임시 버튼
        </Button>
      </div>

      {logged && (
        <div className={cx('navigation-profile')}>
          <div className='navigation-profile__container'>
            <div className='navigation-profile__photo'>
              <UserProfileImg size='small' />
            </div>
            <span className='navigation-profile__name'>{nickname}</span>
          </div>
          <Icon iconName='KEBAB' />
        </div>
      )}
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
