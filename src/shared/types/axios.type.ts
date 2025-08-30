export type ApiError = {
  status?: number
  code?: string
  details?: unknown
} & Error

export type ApiResponse<T = unknown> = {
  success: boolean
  data: T
  message?: string
  code?: string
}
