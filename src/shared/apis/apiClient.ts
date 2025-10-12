import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'

import { DEFAULT_CONFIG } from './api.constant'
import { toApiError } from './api.error'
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

