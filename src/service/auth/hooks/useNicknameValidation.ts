import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import { handleApiErrorWithToast } from '@/shared/apis/api.error'
import { TOAST_MESSAGES } from '@/shared/constants/toast.constant'
import { useCheckNicknameQuery } from '@/store/queries/auth.query'

/** 닉네임 최소 입력 길이 확인 */
const isValidNicknameLength = (nickname: string) => {
  const isValid = !!nickname && nickname.length >= 2
  return isValid
}

/** 닉네임 중복체크를 react-hook-form으로 관리 */
export const useNicknameValidation = () => {
  const { control, setValue, clearErrors, setError, trigger } = useFormContext()
  const nickname = useWatch({ name: 'nickname', control })
  const nicknameVerified = useWatch({ name: 'nicknameVerified', control })

  const { refetch } = useCheckNicknameQuery({ nickname })

  useEffect(() => {
    setValue('nicknameVerified', false)
  }, [nickname, setValue])

  /** 닉네임 중복 처리 */
  const handleNicknameDuplicated = () => {
    const message = TOAST_MESSAGES.validateNickname.duplicated
    setValue('nicknameVerified', false)
    setError('nickname', { message })
    toast.error(message)
  }

  /** 닉네임 사용 가능 처리 */
  const handleNicknameAvailable = () => {
    setValue('nicknameVerified', true)
    clearErrors('nickname')
    toast.success(TOAST_MESSAGES.validateNickname.success)
  }

  /** 닉네임 중복 확인 */
  const handleNicknameCheck = async () => {
    if (!isValidNicknameLength(nickname)) {
      toast.error(TOAST_MESSAGES.signup.nicknameLength)
      return
    }

    try {
      const { data: isDuplicated, isError, error } = await refetch()
      const isApiError = isError || isDuplicated === undefined

      if (isApiError) {
        handleApiErrorWithToast(error)
        return
      }

      if (isDuplicated) handleNicknameDuplicated()
      else handleNicknameAvailable()
    } catch {
      setValue('nicknameVerified', false)
      toast.error(TOAST_MESSAGES.validateNickname.error)
    } finally {
      await trigger('nickname')
    }
  }

  return {
    handleNicknameCheck,
    canCheck: isValidNicknameLength(nickname),
    isVerified: nicknameVerified,
  }
}
