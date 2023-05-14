import classNames from 'classnames/bind'
import { ReactNode, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useMount } from 'react-use'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

export interface AsidePortalProps {
  children: ReactNode
}

const AsidePortal = ({ children }: AsidePortalProps) => {
  const asideRef = useRef<HTMLElement | null>()
  const [mount, setMount] = useState(false)

  useMount(() => {
    setMount(true)
    document && (asideRef.current = document.getElementById('layout-aside'))
  })

  if (mount && asideRef.current) {
    return createPortal(children, asideRef.current)
  }
  return null
}

export default AsidePortal
