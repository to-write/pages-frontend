import { setCookie } from 'cookies-next'
import dayjs from 'dayjs'
import { useLayoutEffect } from 'react'
import create, { StoreApi, UseBoundStore } from 'zustand'
import createContext from 'zustand/context'
import { ACCESS_TOKEN_STORE, REFRESH_TOKEN_STORE } from '../../constants'

export interface Session {
  nickname?: string
  refreshToken?: string
  accessToken?: string
  accessExpire?: number
  refreshExpire?: number
}

export interface SessionStore extends Session {
  logged: boolean
  updateState(session: Session): void
}

export const { Provider, useStore: useSessionStore } = createContext<SessionStore>()

let store: UseBoundStore<SessionStore, StoreApi<SessionStore>>

export const initializeStore = (session?: Session) => {
  return create<SessionStore>((set) => ({
    logged: !!(session?.accessToken && session?.nickname && session?.refreshToken) || false,
    ...session,
    updateState(newState) {
      set((state) => {
        return {
          ...state,
          ...newState,
          logged: !!(state.accessToken && state.nickname && state.refreshToken),
        }
      })
    },
  }))
}

export const useCreateStore = (session?: Session) => {
  if (typeof window === 'undefined') {
    return () => initializeStore(session)
  }

  store ??= initializeStore(session)

  useLayoutEffect(() => {
    if (session) {
      store.setState(
        {
          ...store.getState(),
          ...session,
        },
        true
      )
      session.accessExpire &&
        setCookie(ACCESS_TOKEN_STORE, session.accessToken, {
          expires: dayjs().add(session.accessExpire, 'millisecond').toDate(),
        })
      session.refreshExpire &&
        setCookie(REFRESH_TOKEN_STORE, session.refreshToken, {
          expires: dayjs().add(session.refreshExpire, 'millisecond').toDate(),
        })
    }
  })

  return () => store
}
