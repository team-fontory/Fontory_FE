import type { AxiosError } from 'axios'

import type { ApiError } from '../types/axios.type'

export const toApiError = (error: AxiosError): ApiError => {
  const { response } = error
  const apiError: ApiError = new Error(
    response ? getErrorMessage(response.status, response.data) : '네트워크 연결을 확인해주세요.',
  ) as ApiError

  apiError.name = 'ApiError'
  apiError.status = response?.status
  apiError.details = response?.data

  switch (response?.status) {
    case 401:
      break
    case 403:
      apiError.message = '접근 권한이 없습니다.'
      break
    case 404:
      apiError.message = '요청한 리소스를 찾을 수 없습니다.'
      break
    case 500:
      apiError.message = '서버에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      break
  }
  return apiError
}

/* 에러 메시지 생성 함수 */
export const getErrorMessage = (status?: number, data?: unknown): string => {
  if (data && typeof data === 'object' && 'message' in data) {
    return String(data.message)
  }

  switch (status) {
    case 400:
      return '잘못된 요청입니다.'
    case 401:
      return '로그인이 필요합니다.'
    case 403:
      return '접근 권한이 없습니다.'
    case 404:
      return '요청한 리소스를 찾을 수 없습니다.'
    case 429:
      return '너무 많은 요청입니다. 잠시 후 다시 시도해주세요.'
    case 500:
      return '서버에 오류가 발생했습니다.'
    default:
      return '알 수 없는 오류가 발생했습니다.'
  }
}
