import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteUser, editProfile, logout, signup } from './auth.api'
import { authQueryInvalidator } from './auth.key'
import { fontQueryInvalidator } from './font.key'

/** 회원가입 */
export const useSignupMutation = () => {
  return useMutation({
    mutationFn: signup,
  })
}

/** 프로필 수정 */
export const useEditProfileMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(authQueryInvalidator.invalidateAll())
      queryClient.invalidateQueries(fontQueryInvalidator.invalidateAll())
    },
  })
}

/** 로그아웃 */
export const useLogoutMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries(authQueryInvalidator.invalidateAll())
    },
  })
}

/** 회원탈퇴 */
export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(authQueryInvalidator.invalidateAll())
      queryClient.invalidateQueries(fontQueryInvalidator.invalidateAll())
    },
  })
}
