import classNames from 'classnames/bind'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { useLogout } from '../../hooks'
import { useSessionStore } from '../../store'
import { IconName } from '../../types'
import Button from '../Button'
import Icon from '../Icon'
import Typography from '../Typography'
import UserProfileImg from '../UserProfileImg'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

export interface MenuItem {
  menuIcon: IconName
  menuName: string
  routePath: string
  onClick?: () => void
}

export interface NavigationProps {
  children?: ReactNode
  menuItems?: MenuItem[]
}

const Navigation = ({ children, menuItems = [] }: NavigationProps) => {
  const { nickname, logged } = useSessionStore()
  const { logout } = useLogout()

  const router = useRouter()

  console.log('router.asPath,', router.asPath, logged)

  return (
    <nav className={cx('navigation')}>
      <div className='navigation__menu-container'>
        <div className='navigation__logo'>LOGO</div>
        <ul className='navigation__menu'>
          {menuItems.map(({ menuIcon, menuName, routePath, onClick }) => (
            <li className='navigation__menu-item' key={menuName}>
              <Link className='navigation__link' href={routePath}>
                <button className='navigation__menu-item-contents' type='button' onClick={onClick}>
                  <Icon iconName={menuIcon} />
                  {/* <Typography type='body-15' extendClass='navigation__menu-icon'>
                  {menuIcon}
                </Typography> */}
                  <Typography type='body-15' extendClass='navigation__menu-name'>
                    {menuName}
                  </Typography>
                </button>
              </Link>
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
