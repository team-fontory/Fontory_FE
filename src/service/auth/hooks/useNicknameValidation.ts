import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import { TOAST_MESSAGES } from '@/shared/constants/toast.constant'
import { useCheckNicknameQuery } from '@/store/queries/auth.query'

/** 닉네임 중복체크를 react-hook-form으로 관리 */
export const useNicknameValidation = () => {
  const { control, setValue, clearErrors, setError, trigger } = useFormContext()
  const nickname = useWatch({ name: 'nickname', control })
  const nicknameVerified = useWatch({ name: 'nicknameVerified', control })

  const { refetch } = useCheckNicknameQuery({ nickname })

  useEffect(() => {
    setValue('nicknameVerified', false)
  }, [nickname, setValue])

  const handleNicknameCheck = async () => {
    if (!nickname || nickname.length < 2) return

    try {
      const { data: isDuplicated, isError } = await refetch()
      if (isError || isDuplicated === undefined) throw new Error()

      if (isDuplicated) {
        setValue('nicknameVerified', false)
        setError('nickname', {
          message: TOAST_MESSAGES.validateNickname.duplicated,
        })
        toast.error(TOAST_MESSAGES.validateNickname.duplicated)
      } else {
        setValue('nicknameVerified', true)
        clearErrors('nickname')
        toast.success(TOAST_MESSAGES.validateNickname.success)
      }
    } catch {
      setValue('nicknameVerified', false)
      toast.error(TOAST_MESSAGES.validateNickname.error)
    } finally {
      await trigger('nickname')
    }
  }

  const canCheck = nickname && nickname.length >= 2

  return {
    handleNicknameCheck,
    canCheck,
    isVerified: nicknameVerified,
  }
}
