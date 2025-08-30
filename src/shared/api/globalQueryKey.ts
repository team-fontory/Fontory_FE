// 중앙 관리 쿼리키

export const MAIN_QUERY_KEY = ['fontory'] as const
export const FONT_QUERY_KEY = [...MAIN_QUERY_KEY, 'font'] as const
export const USER_QUERY_KEY = [...MAIN_QUERY_KEY, 'user'] as const
