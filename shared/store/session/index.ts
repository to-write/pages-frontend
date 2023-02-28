import { createContext } from 'react'
import { create, StoreApi, UseBoundStore } from 'zustand'

export interface Session {
  nickname?: string
  refreshToken?: string
  accessToken?: string
}

export interface SessionStore extends Session {
  logged: boolean
  updateState(session: Omit<Session, 'updateState'>): void
}

let store: UseBoundStore<StoreApi<SessionStore>>

export const initializeStore = (session?: Omit<Session, 'updateState'>) =>
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

  if (session && isReused) {
    store.setState({}, true)
  }

  return () => store
}

export const { Provider } = createContext(initializeStore())
