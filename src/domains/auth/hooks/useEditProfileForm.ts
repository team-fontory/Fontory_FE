import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ROUTES } from '@/app/router/routes.constant'

import { signupDefaultValues } from '../constants/userConfig'
import { useEditProfileMutation } from '../services/useAuthMutation'
import { useNicknameStore } from '../stores/nicknameStore'
import type { EditProfileType } from '../types/auth.type'

const TOAST_MESSAGE = {
  success: '프로필 변경에 성공했습니다.',
  error: '프로필 변경에 실패하였습니다.',
} as const

export const useEditProfileForm = () => {
  const navigate = useNavigate()
  const { mutate: editProfile, isPending } = useEditProfileMutation()
  const { resetNicknameCheck } = useNicknameStore()

  const resetAll = () => {
    resetNicknameCheck()
  }

  const onSuccess = () => {
    toast.success(TOAST_MESSAGE.success)
    navigate(ROUTES.HOME)
    resetAll()
  }

  const onError = () => {
    toast.error(TOAST_MESSAGE.error)
  }

  const handleSubmitForm = (formData: EditProfileType) => {
    editProfile(formData, { onSuccess, onError })
  }

  return {
    handleSubmitForm,
    isPending,
    defaultValues: signupDefaultValues,
  }
}
