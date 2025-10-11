/* HTTP 상태 코드 상수 정의 */
export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const

export type HttpStatus = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS]

/* 에러 메시지 맵 */
export const ERROR_MESSAGE_MAP = {
  [HTTP_STATUS.BAD_REQUEST]: '잘못된 요청입니다.',
  [HTTP_STATUS.UNAUTHORIZED]: '로그인이 필요합니다.',
  [HTTP_STATUS.FORBIDDEN]: '접근 권한이 없습니다.',
  [HTTP_STATUS.NOT_FOUND]: '요청한 리소스를 찾을 수 없습니다.',
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: '서버에 오류가 발생했습니다.',
} as const

/* 기본 설정값 */
export const DEFAULT_CONFIG = {
  baseURL: import.meta.env.VITE_PUBLIC_SERVER_DOMAIN,
  timeout: 10000,
  withCredentials: true,
} as const
