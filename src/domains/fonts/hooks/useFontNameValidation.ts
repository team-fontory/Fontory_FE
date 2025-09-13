import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import { createFontAttribute } from '../constants/createFontConfig'
import { useCheckFontName } from '../services/useFontQuery'
import { useFontNameCheckActions, useIsFontNameAvailable } from '../stores/fontNameStore'

type Props = {
  onFontNameCheckChange: (checked: boolean) => void
}

/** 폰트 이름 유효성 검사 비즈니스 로직을 담당하는 커스텀 훅 */
export const useFontNameValidation = ({ onFontNameCheckChange }: Props) => {
  const { control, clearErrors, setError } = useFormContext()
  const fontName = useWatch({ name: createFontAttribute.name.section, control })

  const isFontNameAvailable = useIsFontNameAvailable()
  const { refetch, isPending } = useCheckFontName(fontName)
  const { isFontNameChecked, setFontNameCheck, resetFontNameCheck } = useFontNameCheckActions()

  // 폰트 이름이 변경되면 중복 체크 상태 초기화
  useEffect(() => {
    if (fontName && !isFontNameChecked(fontName)) {
      resetFontNameCheck()
      onFontNameCheckChange(false)
    }
  }, [fontName, isFontNameChecked, resetFontNameCheck, onFontNameCheckChange])

  const handleFontNameCheck = async () => {
    if (!fontName || fontName.length < 2) return

    try {
      const result = await refetch()

      if (result.isSuccess && result.data !== undefined) {
        const isDuplicated = result.data
        const isAvailable = !isDuplicated

        setFontNameCheck(fontName, isAvailable)
        onFontNameCheckChange(isAvailable)

        if (isAvailable) {
          clearErrors('nickname')
          toast.success('사용 가능한 폰트 이름입니다.')
        } else {
          setError('nickname', { message: '이미 사용 중인 폰트 이름입니다.' })
          toast.error('이미 사용 중인 폰트 이름입니다.')
        }
      }
    } catch {
      resetFontNameCheck()
      onFontNameCheckChange(false)
      toast.error('폰트 이름 중복 검사에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const isCurrentFontNameChecked = isFontNameChecked(fontName || '')
  const canCheck = fontName && fontName.length >= 2
  const showSuccessMessage = isCurrentFontNameChecked && isFontNameAvailable

  return {
    fontName,
    handleFontNameCheck,
    isPending,
    canCheck,
    showSuccessMessage,
  }
}
