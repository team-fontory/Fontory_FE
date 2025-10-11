import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ROUTES } from '@/app/router/routes.constant'
import { TOAST_MESSAGES } from '@/shared/constants/toast.constant'
import { useCreateFontMutation } from '@/store/queries/font.mutation'

import type { CreateFontFormData } from '../font.config'

export const useCreateFont = () => {
  const navigate = useNavigate()
  const { mutate: createFont } = useCreateFontMutation()

  const onSuccess = () => {
    toast.success(TOAST_MESSAGES.createFont.success)
    navigate(ROUTES.MYPAGE.MY_FONT)
  }

  const onError = () => {
    toast.error(TOAST_MESSAGES.createFont.error)
  }

  const handleSubmitForm = (formData: CreateFontFormData) => {
    const sendForm = new FormData()
    const payload = {
      name: formData.name,
      engName: formData.engName,
      example: formData.example,
      phoneNumber: formData.phoneNumber?.replace(/-/g, '') || '',
    }

    sendForm.append('file', formData.file as File)
    sendForm.append('fontCreateDTO', JSON.stringify(payload))
    createFont(sendForm, { onSuccess, onError })
  }

  return { handleSubmitForm }
}
