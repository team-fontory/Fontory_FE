import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'

import { toApiError } from './error'
import { logAxiosError, logRequest, logResponse } from './logger'

const BASE_URL = import.meta.env.VITE_PUBLIC_SERVER_DOMAIN

const client: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
})

/* 요청 인터셉터 */
client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    logRequest(config)
    return config
  },
  (error) => {
    logAxiosError(error)
    return Promise.reject(error)
  },
)

/* 응답 인터셉터 */
client.interceptors.response.use(
  (response: AxiosResponse) => {
    logResponse(response)
    return response.data
  },
  async (error: AxiosError) => {
    logAxiosError(error)

    const apiError = toApiError(error)
    return Promise.reject(apiError)
  },
)

const get = <T = unknown>(url: string, config?: AxiosRequestConfig) => {
  return client.get<T, T>(url, config)
}

const post = <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
  return client.post<T, T>(url, data, config)
}

const put = <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
  return client.put<T, T>(url, data, config)
}

const patch = <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
  return client.patch<T, T>(url, data, config)
}

const _delete = <T = unknown>(url: string, config?: AxiosRequestConfig) => {
  return client.delete<T, T>(url, config)
}

export const apiClient = {
  get,
  post,
  put,
  patch,
  delete: _delete,
}
