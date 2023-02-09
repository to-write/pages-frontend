import { AxiosError } from 'axios'
import { FailureResponse } from '../types'

export const BadRequestError = (props: FailureResponse) => new AxiosError('잘못된 접근입니다.', props.code)

export const AuthError = (props: FailureResponse) => new AxiosError('로그인 유저 정보를 확인할 수 없습니다', props.code)

export const ForbiddenError = (props: FailureResponse) => new AxiosError('403 ForbiddenError', props.code)

export const NotFoundError = () => new AxiosError('잘못된 API 경로입니다.')
