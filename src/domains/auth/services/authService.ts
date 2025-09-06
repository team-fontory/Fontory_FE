import { apiClient } from '@/shared/api/apiClient'

class AuthService {
  /** 닉네임 중복 검사 */
  checkNicknameDuplicate(nickname: string) {
    return apiClient.get<boolean>(`/register/check-duplicate`, {
      params: { nickname },
    })
  }
}

export const authService = new AuthService()
