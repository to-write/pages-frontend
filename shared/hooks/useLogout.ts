import { useRouter } from 'next/router'
import { MouseEventHandler } from 'react'
import { logout } from '../../utils'

export const useLogout = () => {
  const router = useRouter()

  const logoutCallback = () => {
    router.replace('/login')
  }

  const handleLogout: MouseEventHandler = () => {
    logout(logoutCallback)
  }

  return { logout: handleLogout }
}
