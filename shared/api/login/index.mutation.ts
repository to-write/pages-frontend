import { useMutation } from 'react-query'
import { useSessionStore } from '../../store'
import { LoginRequest, LoginResponse } from '../../types/api'
import { snsLogin } from './index.api'

export interface LoginMutationParams {
  handleSuccess?: ({ access, nickname, refresh }: LoginResponse) => void
}

export const useLoginMutation = ({ handleSuccess }: LoginMutationParams) => {
  const { updateState } = useSessionStore()
  return useMutation<LoginResponse, Error, LoginRequest>((params) => snsLogin(params), {
    onSuccess: (data) => {
      updateState({ accessToken: data.access.token, nickname: data.nickname, refreshToken: data.refresh })
      // FIXME: 데이터 확인하기 위한 임시 로직
      alert(`로그인 성공 ${data.nickname}님 환영합니다.`)
      handleSuccess?.(data)
    },
    onError: (error) => {
      console.error(error)
      alert('로그인 정보를 가져오지 못했습니다. 잠시 후 다시 시도해 주십시오.')
    },
  })
}
