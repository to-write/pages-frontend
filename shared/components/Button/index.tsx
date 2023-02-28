import React, { ReactNode } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.scss'

const cx = classNames.bind(styles)
// size: 56 50 44 40 32 28

interface ButtonProps {
  type?: 'cta' | 'primary' | 'secondary'
  size?: 'x-large' | 'large' | 'medium' | 'small' | 'x-small'
  isLoading?: boolean
  children: ReactNode
}

const Button = ({ type, size, isLoading = false, children }: ButtonProps) => {
  return (
    <button type='button' className={cx(type, size)}>
      {isLoading ? '로딩 스피너' : children}
    </button>
  )
}

export default Button
