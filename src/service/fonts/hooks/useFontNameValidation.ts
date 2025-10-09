import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import { TOAST_MESSAGES } from '@/shared/constants/toast.constant'
import { useCheckFontNameQuery } from '@/store/queries/font.query'

/** 폰트 이름 유효성 검사 및 중복 확인 처리하는 훅 */
export const useFontNameValidation = () => {
  const { control, setValue, clearErrors, setError, trigger } = useFormContext()
  const fontName = useWatch({ name: 'name', control })
  const fontNameVerified = useWatch({ name: 'fontNameVerified', control })

  const { refetch } = useCheckFontNameQuery({ fontName })

  useEffect(() => {
    setValue('fontNameVerified', false)
  }, [fontName, setValue])

  const handleFontNameCheck = async () => {
    if (!fontName || fontName.length < 2) return

    try {
      const { data: isDuplicated, isError } = await refetch()
      if (isError || isDuplicated === undefined) throw new Error()

      if (isDuplicated) {
        setError('name', {
          message: TOAST_MESSAGES.validateFontName.duplicated,
        })
        setValue('fontNameVerified', false)
        toast.error(TOAST_MESSAGES.validateFontName.duplicated)
      } else {
        clearErrors('name')
        setValue('fontNameVerified', true)
        toast.success(TOAST_MESSAGES.validateFontName.success)
      }
    } catch {
      setValue('fontNameVerified', false)
      toast.error(TOAST_MESSAGES.validateFontName.error)
    } finally {
      await trigger()
    }
  }

  const canCheck = fontName && fontName.length >= 2

  return {
    handleFontNameCheck,
    canCheck,
    isVerified: fontNameVerified,
  }
}
