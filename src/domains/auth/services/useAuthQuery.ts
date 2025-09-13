import { useQuery } from '@tanstack/react-query'

import { authQueryKeys } from './authQueryKey'
import { authService } from './authService'

/** 닉네임 중복 검사 */
export const useCheckNickname = (nickname: string) => {
  return useQuery({
    queryKey: authQueryKeys.nicknameCheck(nickname),
    queryFn: () => authService.checkNicknameDuplicate(nickname),
    enabled: false,
  })
}

/** 사용자 프로필 */
export const useUserProfile = () => {
  return useQuery({
    queryKey: authQueryKeys.profile(),
    queryFn: () => authService.getUserProfile(),
  })
}
