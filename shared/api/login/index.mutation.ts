import { useMutation } from 'react-query'
import { setLoginCookie } from '../../../utils'
import { useSessionStore } from '../../store'
import { LoginReissueRequest, LoginRequest, LoginResponse } from '../../types/api'
import { loginReissue, snsLogin } from './index.api'

export interface LoginMutationParams {
  handleSuccess?: ({ access, nickname, refresh }: LoginResponse) => void
}

export const useLoginMutation = ({ handleSuccess }: LoginMutationParams) => {
  const { updateState } = useSessionStore()
  return useMutation<LoginResponse, Error, LoginRequest>((params) => snsLogin(params), {
    onSuccess: (data) => {
      const { access, refresh, nickname } = data
      setLoginCookie({ access, refresh })
      updateState({ accessToken: access.token, nickname, refreshToken: refresh.token })
      // FIXME: 데이터 확인하기 위한 임시 로직
      alert(`로그인 성공 ${nickname}님 환영합니다.`)
      handleSuccess?.(data)
    },
    onError: (error) => {
      console.error(error)
      alert('로그인 정보를 가져오지 못했습니다. 잠시 후 다시 시도해 주십시오.')
    },
  })
}

export const useReissueMutation = ({ handleSuccess }: LoginMutationParams) => {
  const { updateState } = useSessionStore()
  return useMutation<LoginResponse, Error, LoginReissueRequest>((params) => loginReissue(params), {
    onSuccess: (data) => {
      const { access, refresh, nickname } = data
      setLoginCookie({ access, refresh })
      updateState({ accessToken: data.access.token, nickname: data.nickname, refreshToken: data.refresh.token })
      handleSuccess?.(data)
    },
    onError: (error) => {
      console.error(error)
      alert('로그인 정보를 가져오지 못했습니다. 잠시 후 다시 시도해 주십시오.')
    },
  })
}
