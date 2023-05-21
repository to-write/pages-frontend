import { ReactNode } from 'react'

export type MenuType = 'BACK' | 'CLOSE' | 'NONE' | 'HAMBURGER'

export interface DefaultLayoutProps {
  children: ReactNode | string
  aside?: boolean
  metaTitle?: string
  menuType: MenuType
  menuName?: string
  isMobile?: boolean
}
