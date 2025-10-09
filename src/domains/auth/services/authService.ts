import { apiClient } from '@/shared/apis/apiClient'

import type { UserProfile } from '../types/auth.type'

class AuthService {
  /** 닉네임 중복 검사 */
  checkNicknameDuplicate(nickname: string) {
    return apiClient.get<boolean>(`/register/check-duplicate`, {
      params: { nickname },
    })
  }

  /** 사용자 프로필 */
  getUserProfile() {
    return apiClient.get<UserProfile>(`/member/me`)
  }
}

export const authService = new AuthService()
