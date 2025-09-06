import { useMutation } from '@tanstack/react-query'

import { apiClient } from '@/shared/api/apiClient'

import type { SignupRequest } from '../types/auth.type'

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (formData: SignupRequest) => apiClient.post('/register', formData),
  })
}
