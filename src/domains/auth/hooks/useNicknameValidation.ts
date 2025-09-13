import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useCheckNickname } from '../services/useAuthQuery'
import { useNicknameStore } from '../stores/nicknameStore'

type Props = {
  onNicknameCheckChange: (checked: boolean) => void
}

/** 닉네임 유효성 검사 비즈니스 로직을 담당하는 커스텀 훅 */
export const useNicknameValidation = ({ onNicknameCheckChange }: Props) => {
  const { control, clearErrors, setError } = useFormContext()
  const nickname = useWatch({ name: 'nickname', control })

  const { refetch, isPending } = useCheckNickname(nickname)
  const { isNicknameChecked, setNicknameCheck, resetNicknameCheck, isAvailable } =
    useNicknameStore()

  // 닉네임이 변경되면 중복 체크 상태 초기화
  useEffect(() => {
    if (nickname && !isNicknameChecked(nickname)) {
      resetNicknameCheck()
      onNicknameCheckChange(false)
    }
  }, [nickname, isNicknameChecked, resetNicknameCheck, onNicknameCheckChange])

  const handleNicknameCheck = async () => {
    if (!nickname || nickname.length < 2) return

    try {
      const result = await refetch()

      if (result.isSuccess && result.data !== undefined) {
        const isDuplicated = result.data
        const isAvailable = !isDuplicated

        setNicknameCheck(nickname, isAvailable)
        onNicknameCheckChange(isAvailable)

        if (isAvailable) {
          clearErrors('nickname')
          toast.success('사용 가능한 닉네임입니다.')
        } else {
          setError('nickname', { message: '이미 사용 중인 닉네임입니다.' })
          toast.error('이미 사용 중인 닉네임입니다.')
        }
      }
    } catch {
      resetNicknameCheck()
      onNicknameCheckChange(false)
      toast.error('닉네임 중복 검사에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const isCurrentNicknameChecked = isNicknameChecked(nickname || '')
  const canCheck = nickname && nickname.length >= 2
  const showSuccessMessage = isCurrentNicknameChecked && isAvailable

  return {
    nickname,
    handleNicknameCheck,
    isPending,
    canCheck,
    showSuccessMessage,
  }
}
