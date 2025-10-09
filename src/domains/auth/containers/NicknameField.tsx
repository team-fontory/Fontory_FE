import { PrimaryButton } from '@/presentation/components/shared/PrimaryButton'

import { useNicknameValidation } from '../hooks/useNicknameValidation'

export const NicknameField = () => {
  const { handleNicknameCheck, canCheck, showSuccessMessage } =
    useNicknameValidation()

  return (
    <div>
      <div className='flex items-end gap-2'>
        <PrimaryButton
          type='button'
          size='md'
          onClick={handleNicknameCheck}
          disabled={!canCheck}
          className='h-[50px]'
        >
          중복체크
        </PrimaryButton>
      </div>
    </div>
  )
}
