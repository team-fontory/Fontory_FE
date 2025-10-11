import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ROUTES } from '@/app/router/routes.constant'
import { TOAST_MESSAGES } from '@/shared/constants/toast.constant'
import { useSignupMutation } from '@/store/queries/auth.mutation'

import type { SignupFormData } from '../user.config'

/** 회원가입 폼 제출 커스텀 훅 */
export const useSignup = () => {
  const navigate = useNavigate()
  const { mutate: signup } = useSignupMutation()

  const onSuccess = () => {
    toast.success(TOAST_MESSAGES.signup.success)
    navigate(ROUTES.AUTH.LOGIN)
  }

  const onError = () => {
    toast.error(TOAST_MESSAGES.signup.error)
  }

  const handleSubmitForm = (formData: SignupFormData) => {
    const payload = {
      nickname: formData.nickname,
      birth: formData.birth,
      gender: formData.gender,
    }
    signup(payload, { onSuccess, onError })
  }

  return { handleSubmitForm }
}
