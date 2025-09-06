import { Input } from '@/shared/components/Input'
import { Textarea } from '@/shared/components/Textarea'

import { createFontAttribute } from '../constants/createFontConfig'

/** 폰트 정보 입력 폼 컴포넌트 */
export const FontInfoForm = () => {
  return (
    <div className='flex-column gap-6'>
      <div className='grid grid-cols-2 gap-6'>
        <Input
          section={createFontAttribute.name.section}
          label={createFontAttribute.name.label}
          placeholder={createFontAttribute.name.placeholder}
          onInput={createFontAttribute.name.onInput}
        />
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
