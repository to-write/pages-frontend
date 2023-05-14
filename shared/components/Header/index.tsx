import classNames from 'classnames/bind'
import styles from './index.module.scss'
import { DefaultLayoutProps, MenuType } from '../../types'
import Icon from '../Icon'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'

const cx = classNames.bind(styles)

interface HeaderProps extends Pick<DefaultLayoutProps, 'menuType' | 'menuName' | 'isMobile'> {}

const Header = ({ menuType, menuName, isMobile }: HeaderProps) => {
  const router = useRouter()

  const handleMenuBtn = (e: MouseEvent<HTMLButtonElement>, type: MenuType) => {
    if (type === 'BACK') {
      router.back()
      return
    }
    if (type === 'CLOSE') {
      router.push('/')
    }
  }

  return (
    <header className={cx('header-container')}>
      {!isMobile && (
        <div className='header-container__desktop'>
          <span>desktop {menuName} 내용</span>
        </div>
      )}
      {isMobile && (
        <div className='header-container__mobile'>
          {menuType !== 'NONE' && (
            <button type='button' onClick={(e) => handleMenuBtn(e, 'BACK')}>
              <Icon iconName={menuType} size={24} />
            </button>
          )}
          <span>{menuName}</span>
        </div>
      )}
    </header>
  )
}

export default Header
