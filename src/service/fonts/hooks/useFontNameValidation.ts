import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import { TOAST_MESSAGES } from '@/shared/constants/toast.constant'
import { useCheckFontNameQuery } from '@/store/queries/font.query'

/** 폰트 이름 최소 입력 길이 확인 */
const isValidFontNameLength = (nickname: string) => {
  const isValid = !!nickname && nickname.length >= 1
  return isValid
}

/** 폰트 이름 유효성 검사 및 중복 확인 */
export const useFontNameValidation = () => {
  const { control, setValue, clearErrors, setError, trigger } = useFormContext()
  const fontName = useWatch({ name: 'name', control })
  const fontNameVerified = useWatch({ name: 'fontNameVerified', control })

  const { refetch } = useCheckFontNameQuery({ fontName })

  useEffect(() => {
    setValue('fontNameVerified', false)
  }, [fontName, setValue])

  /** 폰트 이름 중복 처리 */
  const handleFontNameDuplicated = () => {
    const message = TOAST_MESSAGES.validateFontName.duplicated
    setValue('fontNameVerified', false)
    setError('name', { message })
    toast.error(message)
  }

  /** 폰트 이름 사용 가능 처리 */
  const handleFontNameAvailable = () => {
    setValue('fontNameVerified', true)
    clearErrors('name')
    toast.success(TOAST_MESSAGES.validateFontName.success)
  }

  /** 폰트 이름 중복 확인 */
  const handleFontNameCheck = async () => {
    if (!isValidFontNameLength(fontName)) {
      toast.error(TOAST_MESSAGES.validateFontName.length)
      return
    }

    try {
      const { data: isDuplicated } = await refetch()
      if (isDuplicated) {
        handleFontNameDuplicated()
      } else {
        handleFontNameAvailable()
      }
    } catch {
      setValue('fontNameVerified', false)
      toast.error(TOAST_MESSAGES.validateFontName.error)
    } finally {
      await trigger('name')
    }
  }

  return {
    handleFontNameCheck,
    canCheck: isValidFontNameLength(fontName),
    isVerified: fontNameVerified,
  }
}
