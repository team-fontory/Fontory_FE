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
