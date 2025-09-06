import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@/shared/api/apiClient'

import { fontQueryInvalidators } from './fontQueryKey'

export const useAddBookmark = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (fontId: number) => apiClient.post(`/bookmarks/${fontId}`),
    onSuccess: () => queryClient.invalidateQueries(fontQueryInvalidators.invalidateAll()),
  })
}

export const useRemoveBookmark = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (fontId: number) => apiClient.delete(`/bookmarks/${fontId}`),
    onSuccess: () => queryClient.invalidateQueries(fontQueryInvalidators.invalidateAll()),
  })
}
