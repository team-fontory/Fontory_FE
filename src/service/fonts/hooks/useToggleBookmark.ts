import type { MouseEvent } from 'react'
import { toast } from 'react-toastify'

import { TOAST_MESSAGES } from '@/shared/constants/toast.constant'
import {
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from '@/store/queries/font.mutation'

/** 현재 북마크 상태에 따라서 토글하는 훅 */
export const useToggleBookmark = (fontId: number, isBookmarked: boolean) => {
  const { mutate: addBookmark } = useAddBookmarkMutation()
  const { mutate: removeBookmark } = useRemoveBookmarkMutation()

  const params = { fontId }

  const handleBookmark = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()

    if (isBookmarked) {
      removeBookmark(params, {
        onSuccess: () => toast.success(TOAST_MESSAGES.removeBookmark.success),
        onError: (error) =>
          toast.error(error.message || TOAST_MESSAGES.removeBookmark.error),
      })
    } else {
      addBookmark(params, {
        onSuccess: () => toast.success(TOAST_MESSAGES.addBookmark.success),
        onError: (error) =>
          toast.error(error.message || TOAST_MESSAGES.addBookmark.error),
      })
    }
  }

  return { handleBookmark }
}
