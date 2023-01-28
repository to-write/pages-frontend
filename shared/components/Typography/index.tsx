import React from 'react'
import classNames from 'classnames/bind'
import styles from 'typography.module.scss'

const cx = classNames.bind(styles)

const typeProps = {
  H1: 'H1',
  H2: 'H2',
  H3: 'H3',
  B1: 'B1',
  B2: 'B2',
  B3: 'B3',
}

type TypographyTag = 'span' | 'div' | 'em' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'li' | 'ul' | 'strong'

export interface TypographyProps {
  type?: keyof typeof typeProps
  tag?: TypographyTag
  weight?: 'regular' | 'medium' | 'bold'
  extendClass?: string
  children?: React.ReactNode
}

const Typography = ({ type = 'B1', tag = 'span', weight = 'regular', extendClass, children }: TypographyProps) => {
  const Component = `${tag}` as keyof JSX.IntrinsicElements
  return <Component className={cx(weight, type, extendClass)}>{children}</Component>
}

export default Typography
