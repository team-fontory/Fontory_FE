import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ROUTES } from '@/app/router/routes.constant'

import { useCreateFontMutation } from '../services/useFontMutation'
import { useFontNameCheckActions } from '../stores/fontNameStore'
import type { CreateFontFormType } from '../types/font.type'

const TOAST_MESSAGE = {
  success: '폰트 생성 요청에 성공했습니다.',
  error: '폰트 생성 요청에 실패하였습니다.',
} as const

export const useCreateFontForm = () => {
  const navigate = useNavigate()
  const { mutate: createFont, isPending } = useCreateFontMutation()
  const { resetFontNameCheck } = useFontNameCheckActions()

  const resetAll = () => {
    resetFontNameCheck()
  }

  const onSuccess = () => {
    toast.success(TOAST_MESSAGE.success)
    navigate(ROUTES.MYPAGE.MY_FONT)
    resetAll()
  }

  const onError = () => {
    toast.error(TOAST_MESSAGE.error)
  }

  const handleSubmitForm = (formData: CreateFontFormType) => {
    const sendForm = new FormData()

    const { file, phoneNumber, ...rest } = formData
    sendForm.append('file', file as File)
    sendForm.append(
      'fontCreateDTO',
      JSON.stringify({ phoneNumber: phoneNumber.replace(/-/g, '') || '', ...rest }),
    )
    createFont(sendForm, { onSuccess, onError })
  }

  return { handleSubmitForm, isPending }
}
