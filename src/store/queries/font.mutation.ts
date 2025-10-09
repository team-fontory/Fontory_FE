import { useMutation, useQueryClient } from '@tanstack/react-query'

import { addBookmark, createFont, removeBookmark } from './font.api'
import { fontQueryInvalidator } from './font.key'

/** 북마크 추가 */
export const useAddBookmarkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addBookmark,
    onSuccess: () =>
      queryClient.invalidateQueries(fontQueryInvalidator.invalidateAll()),
  })
}

/** 북마크 제거 */
export const useRemoveBookmarkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removeBookmark,
    onSuccess: () =>
      queryClient.invalidateQueries(fontQueryInvalidator.invalidateAll()),
  })
}

/** 폰트 생성 요청 */
export const useCreateFontMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createFont,
    onSuccess: () =>
      queryClient.invalidateQueries(fontQueryInvalidator.invalidateAll()),
  })
}
