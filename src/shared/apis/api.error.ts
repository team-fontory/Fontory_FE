import type { AxiosError } from 'axios'

import { ERROR_MESSAGE_MAP, HTTP_STATUS, type HttpStatus } from './api.constant'

/* API 에러 타입 */
export type ApiErrorData = {
  readonly status?: HttpStatus
  readonly code?: string
  readonly details?: unknown
  readonly timestamp?: string
}

/* 기본 API 에러 클래스 */
export class ApiError extends Error {
  readonly status?: HttpStatus
  readonly code?: string
  readonly details?: unknown
  readonly timestamp: string

  constructor(message: string, data?: ApiErrorData) {
    super(message)
    this.name = 'ApiError'
    this.status = data?.status
    this.code = data?.code
    this.details = data?.details
    this.timestamp = data?.timestamp ?? new Date().toISOString()

    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

/* 네트워크 에러 클래스 */
export class NetworkError extends ApiError {
  constructor(message = '네트워크 연결을 확인해주세요.', data?: ApiErrorData) {
    super(message, data)
    this.name = 'NetworkError'
    Object.setPrototypeOf(this, NetworkError.prototype)
  }
}

/* 잘못된 요청 에러 클래스 */
export class BadRequestError extends ApiError {
  constructor(message = '잘못된 요청입니다.', data?: ApiErrorData) {
    super(message, { ...data, status: HTTP_STATUS.BAD_REQUEST })
    this.name = 'BadRequestError'
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }
}

/* 인증 에러 클래스 */
export class AuthenticationError extends ApiError {
  constructor(message = '로그인이 필요합니다.', data?: ApiErrorData) {
    super(message, { ...data, status: HTTP_STATUS.UNAUTHORIZED })
    this.name = 'AuthenticationError'
    Object.setPrototypeOf(this, AuthenticationError.prototype)
  }
}

/* 권한 에러 클래스 */
export class AuthorizationError extends ApiError {
  constructor(message = '접근 권한이 없습니다.', data?: ApiErrorData) {
    super(message, { ...data, status: HTTP_STATUS.FORBIDDEN })
    this.name = 'AuthorizationError'
    Object.setPrototypeOf(this, AuthorizationError.prototype)
  }
}

/* 리소스 찾기 실패 에러 클래스 */
export class NotFoundError extends ApiError {
  constructor(
    message = '요청한 리소스를 찾을 수 없습니다.',
    data?: ApiErrorData,
  ) {
    super(message, { ...data, status: HTTP_STATUS.NOT_FOUND })
    this.name = 'NotFoundError'
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}

/* 서버 에러 클래스 */
export class ServerError extends ApiError {
  constructor(message = '서버에 오류가 발생했습니다.', data?: ApiErrorData) {
    super(message, { ...data, status: HTTP_STATUS.INTERNAL_SERVER_ERROR })
    this.name = 'ServerError'
    Object.setPrototypeOf(this, ServerError.prototype)
  }
}

/* 알 수 없는 에러 클래스 */
export class UnknownError extends ApiError {
  constructor(
    message = '알 수 없는 오류가 발생했습니다.',
    data?: ApiErrorData,
  ) {
    super(message, { ...data, status: undefined })
    this.name = 'UnknownError'
    Object.setPrototypeOf(this, UnknownError.prototype)
  }
}

/* HTTP 상태 코드별 에러 생성자 맵 */
export const ERROR_CONSTRUCTOR_MAP = {
  [HTTP_STATUS.BAD_REQUEST]: BadRequestError,
  [HTTP_STATUS.UNAUTHORIZED]: AuthenticationError,
  [HTTP_STATUS.FORBIDDEN]: AuthorizationError,
  [HTTP_STATUS.NOT_FOUND]: NotFoundError,
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: ServerError,
} as const

export const isNetworkError = (error: unknown): error is NetworkError =>
  error instanceof NetworkError

export const isBadRequestError = (error: unknown): error is BadRequestError =>
  error instanceof BadRequestError

export const isAuthenticationError = (
  error: unknown,
): error is AuthenticationError => error instanceof AuthenticationError

export const isAuthorizationError = (
  error: unknown,
): error is AuthorizationError => error instanceof AuthorizationError

export const isNotFoundError = (error: unknown): error is NotFoundError =>
  error instanceof NotFoundError

export const isServerError = (error: unknown): error is ServerError =>
  error instanceof ServerError

/* 응답 데이터에서 메시지 추출 */
const extractMessageFromData = (data: unknown) => {
  const message = (data as { message?: unknown })?.message
  return typeof message === 'string' ? message : null
}

/* HTTP 상태 코드로 에러 메시지 조회 */
const getMessageByStatus = (status?: HttpStatus): string => {
  if (status) return ERROR_MESSAGE_MAP[status]
  return '알 수 없는 오류가 발생했습니다.'
}

/* 에러 메시지 생성 */
export const getErrorMessage = (status?: HttpStatus, data?: unknown) => {
  return extractMessageFromData(data) ?? getMessageByStatus(status)
}

/* Axios 에러를 API 에러로 변환 */
export const toApiError = (error: AxiosError) => {
  if (!error.response) {
    const details = { originalError: error.message, code: error.code }

    return new NetworkError(getErrorMessage(undefined, error.message), {
      details,
    })
  }

  const { status, data } = error.response as {
    status: HttpStatus
    data: unknown
  }
  const message = getErrorMessage(status, data)
  const errorData: ApiErrorData = { status, code: error.code, details: data }
  const ErrorConstructor = ERROR_CONSTRUCTOR_MAP[status] || ApiError

  return new ErrorConstructor(message, errorData)
}
