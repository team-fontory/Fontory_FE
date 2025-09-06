import { Input } from '@/shared/components/Input'
import { PrimaryButton } from '@/shared/components/PrimaryButton'

import { signupAttribute } from '../constants/userConfig'
import { useNicknameValidation } from '../hooks/useNicknameValidation'

type Props = {
  onNicknameCheckChange: (checked: boolean) => void
}

export const NicknameField = ({ onNicknameCheckChange }: Props) => {
  const { handleNicknameCheck, canCheck, showSuccessMessage } = useNicknameValidation({
    onNicknameCheckChange,
  })

  return (
    <div>
      <div className='flex items-end gap-2'>
        <Input
          section={signupAttribute.nickname.section}
          label={signupAttribute.nickname.label}
          placeholder={signupAttribute.nickname.placeholder}
          className='flex-1'
          successMessage={showSuccessMessage ? '사용 가능한 닉네임입니다.' : undefined}
        />
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
