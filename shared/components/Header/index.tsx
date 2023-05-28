import classNames from 'classnames/bind'
import styles from './index.module.scss'
import { DefaultLayoutProps, MenuType } from '../../types'
import Icon from '../Icon'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'
import Typography from '../Typography'

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
          <Typography tag='span' type='display-22'>
            {menuName}
          </Typography>
        </div>
      )}
      {isMobile && (
        <div className='header-container__mobile'>
          {menuType !== 'NONE' && (
            <button type='button' onClick={(e) => handleMenuBtn(e, 'BACK')}>
              <Icon iconName={menuType} size={24} />
            </button>
          )}
          <Typography type='display-22'>{menuName}</Typography>
        </div>
      )}
    </header>
  )
}

export default Header
