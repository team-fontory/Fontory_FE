import { MAIN_QUERY_KEY } from '@/shared/api/globalQueryKey'

/** 인증 관련 쿼리 키 팩토리 */
export const authQueryKeys = {
  all: () => [...MAIN_QUERY_KEY, 'auth'] as const,
  
  // 닉네임 중복 검사
  nicknameCheck: (nickname: string) => [...authQueryKeys.all(), 'nickname-check', nickname] as const,
} as const

/** 쿼리 무효화를 위한 헬퍼 함수 */
export const authQueryInvalidators = {
  invalidateAll: () => ({ queryKey: authQueryKeys.all() }),
  invalidateNicknameCheck: () => ({ queryKey: [...authQueryKeys.all(), 'nickname-check'] }),
} as const

// 쿼리 키 타입 추론을 위한 유틸리티 타입
export type AuthQueryKeys = typeof authQueryKeys
export type AuthQueryKey = ReturnType<AuthQueryKeys[keyof AuthQueryKeys]>