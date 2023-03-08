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
  maxLength = 1000,
}: TextareaFieldProps) => {
  const [text, setText] = useState('')
  const [count, setCount] = useState(0)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
    setCount(text.length + 1)
    console.log(text.length + 1)
  }

  return (
    <>
      <textarea
        placeholder={placeholder}
        className={cx('textarea', error && 'error', text && 'filled')}
        readOnly={readOnly}
        onChange={handleChange}
        maxLength={maxLength}
      />
      <span>
        {count} / {maxLength}
      </span>
    </>
  )
}

export default TextareaField
