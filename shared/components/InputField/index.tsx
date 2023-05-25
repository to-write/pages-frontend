import React, { ReactNode, useState } from 'react'
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
  const [input, setInput] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  return (
    <>
      <label className={cx('label')}> {label} </label>
      <input
        type={type}
        placeholder={placeholder}
        className={cx('input', error && 'error', input && 'filled')}
        readOnly={readOnly}
        onChange={handleChange}
      />
      <div className={cx('description')}> {description} </div>
    </>
  )
}

export default InputField
