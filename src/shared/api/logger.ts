import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const isDev = import.meta.env.DEV

export function logRequest(config: InternalAxiosRequestConfig) {
  if (!isDev) return

  console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
    params: config.params,
    data: config.data,
    headers: config.headers,
  })
}

export const logResponse = (response: AxiosResponse) => {
  if (!isDev) return

  console.log(`[API Response] ${response.config?.method?.toUpperCase()} ${response.config?.url}`, {
    status: response.status,
    data: response.data,
  })
}

export const logAxiosError = (error: AxiosError) => {
  if (!isDev) return

  console.error(`[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
    status: error.response?.status,
    data: error.response?.data,
    message: error.message,
  })
}
