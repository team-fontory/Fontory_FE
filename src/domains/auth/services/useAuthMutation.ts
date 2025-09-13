import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fontQueryInvalidators } from '@/domains/fonts/services/fontQueryKey'
import { apiClient } from '@/shared/api/apiClient'

import type { SignupRequest, UserProfile } from '../types/auth.type'

import { authQueryInvalidators } from './authQueryKey'

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (formData: SignupRequest) => apiClient.post('/register', formData),
  })
}

export const useEditProfileMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: UserProfile) => apiClient.patch('/member/me', formData),
    onSuccess: () => {
      queryClient.invalidateQueries(authQueryInvalidators.invalidateAll())
      queryClient.invalidateQueries(fontQueryInvalidators.invalidateAll())
    },
  })
}

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => apiClient.post('/auth/logout'),
    onSuccess: () => {
      queryClient.invalidateQueries(authQueryInvalidators.invalidateAll())
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => apiClient.delete('/member/me'),
    onSuccess: () => {
      queryClient.invalidateQueries(authQueryInvalidators.invalidateAll())
      queryClient.invalidateQueries(fontQueryInvalidators.invalidateAll())
    },
  })
}
