import classNames from 'classnames/bind'
import { ChangeEventHandler, MouseEventHandler, useRef, useState } from 'react'
import Button from '../Button'
import Typography from '../Typography'
import UserProfileImg from '../UserProfileImg'
import styles from './index.module.scss'

const DEFAULT_PLACE_HOLDER = '텍스트를 입력해주세요.'
const MAX_LENGTH = 300

const cx = classNames.bind(styles)

export interface TextFieldProps {
  placeholder?: string
  withProfileImg?: boolean
  isSubmit?: boolean
  onSubmit?: (text: string) => void
  className?: string
}

const TextField = ({
  placeholder = DEFAULT_PLACE_HOLDER,
  withProfileImg,
  isSubmit = false,
  onSubmit,
  className,
}: TextFieldProps) => {
  const [inputValue, setInputValue] = useState('')
  const textRef = useRef<HTMLTextAreaElement>(null)

  const handleChangeTextArea: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.target.value.length > MAX_LENGTH) return
    setInputValue(e.target.value)
  }

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = () => {
    onSubmit?.(inputValue.trim())
    setInputValue('')
  }

  return (
    <div className={cx('textfield', className)}>
      {withProfileImg && (
        <div className='textfield__profile'>
          <UserProfileImg size='small' />
        </div>
      )}
      <div className='textfield__content'>
        <textarea
          className='textfield__input'
          rows={5}
          ref={textRef}
          value={inputValue}
          onChange={handleChangeTextArea}
          placeholder={placeholder}
        />

        <div className='textfield__etc-container'>
          <Typography type='display-22'>{`${inputValue.trim().length} / ${MAX_LENGTH}`}</Typography>
          {isSubmit && (
            <Button
              extendClass='textfield__submit-btn'
              size='medium'
              variant='cta'
              isDisabled={inputValue.trim() === ''}
              onClick={handleSubmit}
            >
              <Typography type='display-22'>등록하기</Typography>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TextField
