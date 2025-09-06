import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ROUTES } from '@/app/router/routes.constant'

import { signupDefaultValues } from '../constants/userConfig'
import { useSignupMutation } from '../services/useSignupMutation'
import { useNicknameStore } from '../stores/nicknameStore'
import type { SignupFormType } from '../types/auth.type'

const TOAST_MESSAGE = {
  success: '회원가입에 성공했습니다.',
  error: '회원가입에 실패하였습니다.',
} as const

export const useSignupForm = () => {
  const navigate = useNavigate()
  const { mutate: signup, isPending } = useSignupMutation()
  const { resetNicknameCheck } = useNicknameStore()

  const resetAll = () => {
    resetNicknameCheck()
  }

  const onSuccess = () => {
    toast.success(TOAST_MESSAGE.success)
    navigate(ROUTES.AUTH.LOGIN)
    resetAll()
  }

  const onError = () => {
    toast.error(TOAST_MESSAGE.error)
  }

  const handleSubmitForm = (formData: SignupFormType) => {
    const { serviceTerms, privacyTerms, fontTerms, ...rest } = formData
    const sendData = { ...rest }

    signup(sendData, { onSuccess, onError })
  }

  return {
    handleSubmitForm,
    isPending,
    defaultValues: signupDefaultValues,
  }
}
