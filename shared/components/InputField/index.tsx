import React, { ReactNode } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

interface InputFieldProps {
  children?: ReactNode
  type?: 'text' | 'email' | 'password'
  label?: string | ReactNode
  placeholder?: string
  error?: boolean
  readOnly?: boolean
  description?: string
}

const InputField = ({
  type = 'text',
  label,
  placeholder,
  error = false,
  description,
  children,
  readOnly = false,
}: InputFieldProps) => {
  return (
    <>
      <label className={cx('label')}> {label} </label>
      <input type={type} placeholder={placeholder} className={cx('input', error)} readOnly={readOnly} />
      <div className={cx('description')}> {description} </div>
    </>
  )
}

export default InputField
