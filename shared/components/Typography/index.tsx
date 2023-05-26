import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.scss'

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
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  children?: React.ReactNode
  color?: 'black' | 'primary' | 'secondary' | 'positive' | 'negative'
}

const Typography = ({ type, weight = 'regular', color = 'black', tag = 'p', children }: TypographyProps) => {
  const Component = `${tag}` as keyof JSX.IntrinsicElements
  return <Component className={cx(`${type} ${weight} ${color}`)}>{children}</Component>
}

export default Typography
