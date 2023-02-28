import React, { ReactNode, useMemo } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

type DisplayTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
type BodyTag = 'span' | 'div' | 'em' | 'li' | 'ul' | 'strong'

type DisplayType = '50' | '44' | '38' | '32' | '28' | '24' | '22' | '22-semibold'
type BodyType = '16' | '15' | '14' | '13'

interface Typography {
  children: ReactNode
}

interface DisplayProps extends Typography {
  type?: DisplayType
  tag?: DisplayTag
}

interface BodyProps extends Typography {
  type?: BodyType
  tag?: BodyTag
}

interface HeadingProps extends Typography {
  type?: '20' | '18' | BodyType
  tag?: DisplayTag | BodyTag
  weight?: 'bold' | 'semi-bold' | 'medium' | 'regular'
}

export const Display = ({ type = '32', tag = 'h1', children }: DisplayProps) => {
  const Tag = `${tag}` as keyof JSX.IntrinsicElements
  const fontSize = useMemo(() => ({ fontSize: `${type}px` }), [])
  return (
    <Tag className={cx('display', `display-${type}`)} style={fontSize}>
      {children}
    </Tag>
  )
}

export const Body = ({ type = '14', tag = 'span', children }: BodyProps) => {
  const Tag = `${tag}` as keyof JSX.IntrinsicElements
  const fontSize = useMemo(() => ({ fontSize: `${type}px` }), [])
  return (
    <Tag className={cx('body', `body-${type}`)} style={fontSize}>
      {children}
    </Tag>
  )
}

export const Heading = ({ type = '16', tag = 'h2', children, weight }: HeadingProps) => {
  const Tag = `${tag}` as keyof JSX.IntrinsicElements
  const fontSize = useMemo(() => ({ fontSize: `${type}px` }), [])
  return (
    <Tag className={cx(type, weight)} style={fontSize}>
      {children}
    </Tag>
  )
}
