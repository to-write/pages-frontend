import React, { ReactNode, useMemo } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

type TextDisplayTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
type TextBodyTag = 'span' | 'div' | 'em' | 'li' | 'ul' | 'strong'

type TextDisplayType = '50' | '44' | '38' | '32' | '28' | '24' | '22' | '22-semibold'
type TextBodyType = '16' | '15' | '14' | '13'

interface Typography {
  children?: React.ReactNode
  colors?: 'black' | 'primary' | 'secondary' | 'positive' | 'negative'
}

interface TextDisplayProps extends Typography {
  type?: TextDisplayType
  tag?: TextDisplayTag
}

interface TextBodyProps extends Typography {
  type?: TextBodyType
  tag?: TextBodyTag
}

interface TextHeadingProps extends Typography {
  type?: '20' | '18' | TextBodyType
  tag?: TextDisplayTag | TextBodyTag
  weight?: 'bold' | 'semi-bold' | 'medium' | 'regular'
}

export const TextDisplay = ({ type = '32', tag = 'h1', colors = 'black', children }: TextDisplayProps) => {
  const Tag = `${tag}` as keyof JSX.IntrinsicElements
  const fontSize = useMemo(() => ({ fontSize: `${type}px` }), [])
  return (
    <Tag className={cx('display', `display-${type}`, colors)} style={fontSize}>
      {children}
    </Tag>
  )
}

export const TextBody = ({ type = '14', tag = 'span', colors = 'black', children }: TextBodyProps) => {
  const Tag = `${tag}` as keyof JSX.IntrinsicElements
  const fontSize = useMemo(() => ({ fontSize: `${type}px` }), [])
  return (
    <Tag className={cx('body', `body-${type}`, colors)} style={fontSize}>
      {children}
    </Tag>
  )
}

export const TextHeading = ({ type = '16', tag = 'h2', colors = 'black', children, weight }: TextHeadingProps) => {
  const Tag = `${tag}` as keyof JSX.IntrinsicElements
  const fontSize = useMemo(() => ({ fontSize: `${type}px` }), [])
  return (
    <Tag className={cx(type, weight, colors)} style={fontSize}>
      {children}
    </Tag>
  )
}
