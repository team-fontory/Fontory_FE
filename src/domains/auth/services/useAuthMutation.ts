import { useMutation } from '@tanstack/react-query'

import { apiClient } from '@/shared/api/apiClient'

import type { SignupRequest, UserProfile } from '../types/auth.type'

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (formData: SignupRequest) => apiClient.post('/register', formData),
  })
}

export const useEditProfileMutation = () => {
  return useMutation({
    mutationFn: (formData: UserProfile) => apiClient.patch('/member/me', formData),
  })
}
