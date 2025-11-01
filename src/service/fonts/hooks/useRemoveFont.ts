import { toast } from 'react-toastify'

import { TOAST_MESSAGES } from '@/shared/constants/toast.constant'
import { useRemoveFontMutation } from '@/store/queries/font.mutation'
import type { RemoveFontRequest } from '@/store/queries/fontApi.type'

export const useRemoveFont = ({ fontId }: RemoveFontRequest) => {
  const { mutate: removeFont } = useRemoveFontMutation()
  const params = { fontId }

  const onSuccess = () => {
    toast.success(TOAST_MESSAGES.removeFont.success)
  }

  const onError = () => {
    toast.error(TOAST_MESSAGES.removeFont.error)
  }

  const handleRemoveFont = () => {
    removeFont(params, { onSuccess, onError })
  }

  return { handleRemoveFont }
}
