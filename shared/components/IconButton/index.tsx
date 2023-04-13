import React, { MouseEventHandler, ReactNode } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

interface ButtonProps {
  children: ReactNode
  size: 'small' | 'x-small'
  isDisabled?: boolean
  extendClass?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const IconButton = ({ size, isDisabled = false, children, extendClass, onClick }: ButtonProps) => {
  return (
    <button type='button' className={cx('icon-button', size, extendClass)} disabled={isDisabled} onClick={onClick}>
      {children}
    </button>
  )
}

export default IconButton
