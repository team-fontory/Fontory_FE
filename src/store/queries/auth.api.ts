import type {
  EditProfileRequest,
  SignupRequest,
} from '@/service/auth/user.config'
import { apiClient } from '@/shared/apis/apiClient'

import type {
  NicknameDuplicateRequest,
  NicknameDuplicateResponse,
  UserProfileResponse,
} from './authApi.type'

/** 닉네임 중복 체크 */
export const checkNicknameDuplicate = (params: NicknameDuplicateRequest) => {
  return apiClient.get<NicknameDuplicateResponse>(`/register/check-duplicate`, {
    params,
  })
}

/** 사용자 프로필 조회 */
export const getUserProfile = () => {
  return apiClient.get<UserProfileResponse>(`/member/me`)
}

/** 회원가입 */
export const signup = (params: SignupRequest) => {
  return apiClient.post('/register', params)
}

/** 프로필 수정 */
export const editProfile = (params: EditProfileRequest) => {
  return apiClient.patch('/member/me', params)
}

/** 로그아웃 */
export const logout = () => {
  return apiClient.post('/auth/logout')
}

/** 회원탈퇴 */
export const deleteUser = () => {
  return apiClient.delete('/member/me')
}
