import { memo, ReactNode } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.scss'
import { TypographyTag } from '../../types'

const cx = classNames.bind(styles)

interface TypographyProps {
  type:
    | 'display-50'
    | 'display-44'
    | 'display-38'
    | 'display-32'
    | 'display-28'
    | 'display-24'
    | 'display-22'
    | 'heading-20'
    | 'heading-18'
    | 'heading-16'
    | 'heading-15'
    | 'heading-14'
    | 'heading-13'
    | 'body-16'
    | 'body-15'
    | 'body-14'

  weight?: 'bold' | 'semibold' | 'medium' | 'regular'
  tag?: TypographyTag
  children: ReactNode
  color?: 'black' | 'primary' | 'secondary' | 'positive' | 'negative'
  extendClass?: string
}

const Typography = ({
  type,
  weight = 'regular',
  color = 'black',
  tag = 'span',
  children,
  extendClass,
}: TypographyProps) => {
  const Component = tag
  console.log('test', children)

  return <Component className={cx(`${type} ${weight} ${color}`, extendClass)}>{children}</Component>
}

export default memo(Typography)
