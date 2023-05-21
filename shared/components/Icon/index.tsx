import classNames from 'classnames/bind'
import { ICON_NAME } from '../../constants/icon'
import { IconName } from '../../types'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

export interface IconProps {
  size?: number
  iconName: IconName
  className?: string
}

const Icon = ({ size = 18, iconName, className }: IconProps) => {
  const iconStyles = {
    width: `${size}px`,
    height: `${size}px`,
  }

  const iconSrc = ICON_NAME[iconName]?.src || ''

  return (
    <i style={{ ...iconStyles }} className={cx('icon', className)}>
      {iconSrc && <img src={iconSrc} alt='icon' />}
    </i>
  )
}

export default Icon
