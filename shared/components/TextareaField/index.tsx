import React, { ReactNode, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

interface TextareaFieldProps {
  children?: ReactNode
  placeholder?: string
  error?: boolean
  readOnly?: boolean
  maxLength?: number
}

const TextareaField = ({
  placeholder,
  error = false,
  readOnly = false,
  children,
  maxLength = 500,
}: TextareaFieldProps) => {
  const [text, setText] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  return (
    <div className={cx('textarea-wrapper')}>
      <textarea
        className={cx('textarea', error && 'error', text && 'filled')}
        rows={5}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={handleChange}
        maxLength={maxLength}
      />
      <div className={cx('counter')}>
        <span className={cx('current-length')}> {text.length} </span>
        <span className={cx('max-length')}> / {maxLength} </span>
      </div>
    </div>
  )
}

export default TextareaField
