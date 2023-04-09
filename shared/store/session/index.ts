import { useLayoutEffect } from 'react'
import create, { StoreApi, UseBoundStore } from 'zustand'
import createContext from 'zustand/context'

export interface Session {
  nickname?: string
  refreshToken?: string
  accessToken?: string
}

export interface SessionStore extends Session {
  logged: boolean
  updateState(session: Session): void
}

export const { Provider, useStore: useSessionStore } = createContext<SessionStore>()

let store: UseBoundStore<SessionStore, StoreApi<SessionStore>>

export const initializeStore = (session?: Session) =>
  create<SessionStore>((set) => ({
    logged: false,
    ...session,
    updateState(newState) {
      set((state) => ({
        ...state,
        ...newState,
        logged: !!(state.accessToken && state.nickname && state.refreshToken),
      }))
    },
  }))

export const useCreateStore = (session?: Session) => {
  if (typeof window === 'undefined') {
    return () => initializeStore(session)
  }

  const isReused = !!session
  store ??= initializeStore(session)

  useLayoutEffect(() => {
    if (session && isReused) {
      store.setState(
        {
          ...store.getState(),
          ...session,
        },
        true
      )
    }
  })
  return () => store
}
