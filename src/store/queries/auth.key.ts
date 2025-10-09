import type { NicknameDuplicateRequest } from './authApi.type'

/** 인증 관련 쿼리 키 팩토리 */
export const authQueryKeys = {
  all: () => ['auth'] as const,

  // 닉네임 중복 검사
  nicknameCheck: (params: NicknameDuplicateRequest) =>
    [...authQueryKeys.all(), 'nickname-check', params.nickname] as const,

  // 프로필 정보
  profile: () => [...authQueryKeys.all(), 'profile'] as const,
} as const

/** 쿼리 무효화를 위한 헬퍼 함수 */
export const authQueryInvalidator = {
  invalidateAll: () => ({ queryKey: authQueryKeys.all() }),
  invalidateNicknameCheck: () => ({
    queryKey: [...authQueryKeys.all(), 'nickname-check'],
  }),
  invalidateProfile: () => ({ queryKey: [...authQueryKeys.all(), 'profile'] }),
} as const

// 쿼리 키 타입 추론을 위한 유틸리티 타입
export type AuthQueryKeys = typeof authQueryKeys
export type AuthQueryKey = ReturnType<AuthQueryKeys[keyof AuthQueryKeys]>
