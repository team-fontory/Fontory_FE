import { toast } from 'react-toastify'

import { TOAST_MESSAGES } from '../constants/toast.constant'

import { HTTP_STATUS, type HttpStatus } from './api.constant'

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

// TODO: 삭제 예정
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

/** 커스텀 에러 핸들러 타입 */
export type CustomErrorHandler = (error: unknown) => void

/** 에러 타입별 핸들러 설정 */
export type ErrorHandlers = {
  onBadRequest?: CustomErrorHandler
  onAuthentication?: CustomErrorHandler
  onAuthorization?: CustomErrorHandler
  onNetwork?: CustomErrorHandler
  onNotFound?: CustomErrorHandler
  onServer?: CustomErrorHandler
  onUnknown?: CustomErrorHandler
}

/** 에러 처리 헬퍼 함수 */
const handleErrorType = (
  error: unknown,
  defaultMessage: string,
  customHandler?: CustomErrorHandler,
) => {
  if (customHandler) {
    customHandler(error)
  } else {
    toast.error(defaultMessage)
  }
}

/** 에러 타입별 처리 매핑 */
const errorTypeHandlers = [
  {
    check: isBadRequestError,
    getHandler: (handlers?: ErrorHandlers) => handlers?.onBadRequest,
    defaultMessage: TOAST_MESSAGES.error.badRequest,
  },
  {
    check: isAuthenticationError,
    getHandler: (handlers?: ErrorHandlers) => handlers?.onAuthentication,
    defaultMessage: TOAST_MESSAGES.error.authentication,
  },
  {
    check: isAuthorizationError,
    getHandler: (handlers?: ErrorHandlers) => handlers?.onAuthorization,
    defaultMessage: TOAST_MESSAGES.error.authorization,
  },
  {
    check: isNotFoundError,
    getHandler: (handlers?: ErrorHandlers) => handlers?.onAuthorization,
    defaultMessage: TOAST_MESSAGES.error.authorization,
  },
  {
    check: isNetworkError,
    getHandler: (handlers?: ErrorHandlers) => handlers?.onNetwork,
    defaultMessage: TOAST_MESSAGES.error.network,
  },
  {
    check: isServerError,
    getHandler: (handlers?: ErrorHandlers) => handlers?.onServer,
    defaultMessage: TOAST_MESSAGES.error.server,
  },
]

/** API 에러 핸들러 (Toast 기본 + 커스텀 핸들러 선택적) */
export const handleApiErrorWithToast = (
  error: unknown,
  customHandlers?: ErrorHandlers,
) => {
  const errorHandler = errorTypeHandlers.find((handler) => handler.check(error))

  if (errorHandler) {
    const customHandler = errorHandler.getHandler(customHandlers)
    handleErrorType(error, errorHandler.defaultMessage, customHandler)
  } else {
    handleErrorType(
      error,
      TOAST_MESSAGES.error.default,
      customHandlers?.onUnknown,
    )
  }
}
