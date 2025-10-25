import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

import { checkNicknameDuplicate, getUserProfile } from './auth.api'
import { authQueryKeys } from './auth.key'
import type { NicknameDuplicateRequest } from './authApi.type'

/** 닉네임 중복 검사 */
export const useCheckNicknameQuery = (params: NicknameDuplicateRequest) => {
  return useQuery({
    queryKey: authQueryKeys.nicknameCheck(params),
    queryFn: () => checkNicknameDuplicate(params),
    enabled: false,
  })
}

/** 사용자 프로필 */
export const useUserProfile = () => {
  return useSuspenseQuery({
    queryKey: authQueryKeys.profile(),
    queryFn: getUserProfile,
  })
}

/** 로그인 여부 검사 */
export const useAuthStatusQuery = () => {
  return useQuery({
    queryKey: authQueryKeys.profile(),
    queryFn: getUserProfile,
    retry: false,
  })
}
