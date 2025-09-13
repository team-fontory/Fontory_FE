import { Input } from '@/shared/components/Input'
import { PrimaryButton } from '@/shared/components/PrimaryButton'
import { Textarea } from '@/shared/components/Textarea'

import { createFontAttribute } from '../constants/createFontConfig'
import { useFontNameValidation } from '../hooks/useFontNameValidation'

type Props = {
  onFontNameCheckChange: (checked: boolean) => void
}

/** 폰트 정보 입력 폼 컴포넌트 */
export const FontInfoForm = ({ onFontNameCheckChange }: Props) => {
  const { handleFontNameCheck, canCheck, showSuccessMessage } = useFontNameValidation({
    onFontNameCheckChange,
  })

  return (
    <div className='flex-column gap-6'>
      <div className='grid grid-cols-2 gap-6'>
        <div className='flex items-end gap-2'>
          <Input
            section={createFontAttribute.name.section}
            label={createFontAttribute.name.label}
            placeholder={createFontAttribute.name.placeholder}
            onInput={createFontAttribute.name.onInput}
            className='flex-1'
            successMessage={showSuccessMessage ? '사용 가능한 닉네임입니다.' : undefined}
          />
          <PrimaryButton
            type='button'
            size='md'
            onClick={handleFontNameCheck}
            disabled={!canCheck}
            className='h-[50px]'
          >
            중복체크
          </PrimaryButton>
        </div>
        <Input
          section={createFontAttribute.engName.section}
          label={createFontAttribute.engName.label}
          placeholder={createFontAttribute.engName.placeholder}
          onInput={createFontAttribute.engName.onInput}
        />
      </div>
      <Textarea
        section={createFontAttribute.example.section}
        label={createFontAttribute.example.label}
        placeholder={createFontAttribute.example.placeholder}
        onInput={createFontAttribute.example.onInput}
      />
    </div>
  )
}
