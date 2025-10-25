import type { FormEvent } from 'react'

import { FormField } from '@/presentation/_components/shared/FormField'
import { CreateFontStepSection } from '@/presentation/font-create/component/CreateFontStepSection'
import { FONT_FIELDS } from '@/service/fonts/font.config'

/** 전화번호 형태를 '-' 추가된 형식으로 반환 */
const formatPhoneNumberInput = (raw: string) => {
  const digits = raw.replace(/\D/g, '')

  if (digits.length <= 3) return digits
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`

  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`
}

/** 전화번호 포맷팅 onInput 핸들러 */
const createPhoneInputHandler = () => {
  return (e: FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    input.value = formatPhoneNumberInput(input.value)
  }
}

/** 전화번호 입력 섹션 컴포넌트 */
export const PhoneNumberSection = () => {
  return (
    <CreateFontStepSection
      step={2}
      title='연락처 정보 입력 (선택)'
      description='폰트 제작이 완료되면 문자 알림을 전송해드려요.'
      isActive={false}
    >
      {/* 핸드폰 번호 필드 */}
      <FormField
        name={FONT_FIELDS.phoneNumber.name}
        label={FONT_FIELDS.phoneNumber.label}
        placeholder={FONT_FIELDS.phoneNumber.placeholder}
        onInput={createPhoneInputHandler()}
      />
    </CreateFontStepSection>
  )
}
