import React, { MouseEventHandler, ReactNode } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

interface ButtonProps {
  children: ReactNode
  type: 'cta' | 'primary' | 'secondary'
  size: 'huge' | 'x-large' | 'large' | 'medium' | 'small' | 'x-small' | 'mini'
  isDisabled?: boolean
  isLoading?: boolean // TODO: 예정
  extendClass?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button = ({ type, size, isLoading = false, isDisabled = false, children, extendClass, onClick }: ButtonProps) => {
  return (
    <button type='button' className={cx('button', type, size, extendClass)} disabled={isDisabled} onClick={onClick}>
      {/* {isLoading ? '로딩 스피너' : children} TODO: 예정 */}
      {children}
    </button>
  )
}

export default Button
