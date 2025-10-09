import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ROUTES } from '@/app/router/routes.constant'
import { TOAST_MESSAGES } from '@/shared/constants/toast.constant'
import { useEditProfileMutation } from '@/store/queries/auth.mutation'

import { type EditProfileFormData } from '../configs/user.config'

/** 프로필 수정 커스텀 훅 */
export const useEditProfile = () => {
  const navigate = useNavigate()
  const { mutate: editProfile } = useEditProfileMutation()

  const onSuccess = () => {
    toast.success(TOAST_MESSAGES.editProfile.success)
    navigate(ROUTES.AUTH.LOGIN)
  }

  const onError = () => {
    toast.error(TOAST_MESSAGES.editProfile.error)
  }

  const handleSubmitForm = (formData: EditProfileFormData) => {
    const payload = { nickname: formData.nickname }
    editProfile(payload, { onSuccess, onError })
  }

  return { handleSubmitForm }
}
