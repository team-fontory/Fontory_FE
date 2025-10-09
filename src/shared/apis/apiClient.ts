import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'

import {
  DEFAULT_CONFIG,
  ERROR_MESSAGE_MAP,
  HTTP_STATUS,
  type HttpStatus,
} from './api.constant'
import {
  ApiError,
  type ApiErrorData,
  AuthenticationError,
  AuthorizationError,
  BadRequestError,
  NetworkError,
  NotFoundError,
  ServerError,
} from './api.error'
import { logAxiosError, logRequest, logResponse } from './apiLogger'

/* API 클라이언트 설정 타입 */
type ApiClientConfig = {
  readonly baseURL?: string
  readonly timeout?: number
  readonly withCredentials?: boolean
}

/* API 클라이언트 클래스 */
class ApiClient {
  private static instance: ApiClient | null = null
  private readonly client: AxiosInstance
  private readonly config: Required<ApiClientConfig>

  private constructor() {
    this.config = { ...DEFAULT_CONFIG }
    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      withCredentials: this.config.withCredentials,
      headers: {
        Authorization: import.meta.env.VITE_PUBLIC_ETC,
      },
    })

    this.setupInterceptors()
  }

  /* 싱글톤 인스턴스 생성 또는 반환 */
  static getInstance() {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient()
    }

    return ApiClient.instance
  }

  /* 인터셉터 설정 */
  private setupInterceptors() {
    this.setupRequestInterceptor()
    this.setupResponseInterceptor()
  }

  /* 요청 인터셉터 설정 */
  private setupRequestInterceptor() {
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        logRequest(config)
        return config
      },
      (error: AxiosError) => {
        logAxiosError(error)
        return Promise.reject(toApiError(error))
      },
    )
  }

  /* 응답 인터셉터 설정 */
  private setupResponseInterceptor() {
    this.client.interceptors.response.use(
      this.handleResponseSuccess,
      this.handleResponseError,
    )
  }

  /* 응답 성공 핸들러 */
  private handleResponseSuccess = (
    response: AxiosResponse,
  ): AxiosResponse['data'] => {
    logResponse(response)
    return response.data
  }

  /* 응답 에러 핸들러 */
  private handleResponseError = (error: AxiosError) => {
    logAxiosError(error)
    return Promise.reject(toApiError(error))
  }

  /* GET 요청 */
  get = <T = unknown>(url: string, config?: AxiosRequestConfig) => {
    return this.client.get<T, T>(url, config)
  }

  /* POST 요청 */
  post = <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ) => {
    return this.client.post<T, T>(url, data, config)
  }

  /* PUT 요청 */
  put = <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ) => {
    return this.client.put<T, T>(url, data, config)
  }

  /* PATCH 요청 */
  patch = <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ) => {
    return this.client.patch<T, T>(url, data, config)
  }

  /* DELETE 요청 */
  delete = <T = unknown>(url: string, config?: AxiosRequestConfig) => {
    return this.client.delete<T, T>(url, config)
  }
}

/* 싱글톤 인스턴스 */
const apiClientInstance = ApiClient.getInstance()

/** 메서드 */
export const apiClient = {
  get: apiClientInstance.get,
  post: apiClientInstance.post,
  put: apiClientInstance.put,
  patch: apiClientInstance.patch,
  delete: apiClientInstance.delete,
}

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

/* HTTP 상태 코드별 에러 생성자 맵 */
const ERROR_CONSTRUCTOR_MAP = {
  [HTTP_STATUS.BAD_REQUEST]: BadRequestError,
  [HTTP_STATUS.UNAUTHORIZED]: AuthenticationError,
  [HTTP_STATUS.FORBIDDEN]: AuthorizationError,
  [HTTP_STATUS.NOT_FOUND]: NotFoundError,
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: ServerError,
} as const

/* HTTP 상태 코드에 따른 에러 클래스 생성 */
const createErrorByStatus = (
  status: HttpStatus,
  message: string,
  data?: ApiErrorData,
) => {
  const ErrorConstructor = ERROR_CONSTRUCTOR_MAP[status] || ApiError
  return new ErrorConstructor(message, data)
}

/* Axios 에러를 API 에러로 변환 */
const toApiError = (error: AxiosError) => {
  if (!error.response) {
    const details = { originalError: error.message, code: error.code }

    return new NetworkError(getErrorMessage(undefined, error.message), {
      details,
    })
  }

  const { status, data } = error.response
  const message = getErrorMessage(status as HttpStatus, data)
  const errorData: ApiErrorData = {
    status: status as HttpStatus,
    code: error.code,
    details: data,
  }

  return createErrorByStatus(status as HttpStatus, message, errorData)
}
