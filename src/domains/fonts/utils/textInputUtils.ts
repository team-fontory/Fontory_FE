import type { FormEvent } from 'react'

type InputFilterType = 'english' | 'number' | 'korean' | 'alphanumeric' | 'custom'

const FILTER_PATTERNS: Record<Exclude<InputFilterType, 'custom'>, RegExp> = {
  english: /[a-zA-Z]/g,
  number: /[0-9]/g,
  korean: /[가-힣]/g,
  alphanumeric: /[a-zA-Z0-9]/g,
}

type Props = {
  input: string
  maxLength: number
  type?: InputFilterType
  customPattern?: RegExp
}

/**
 * 미리 정의된 패턴 타입 또는 커스텀 정규식으로 입력값을 필터링하고 최대 글자 수를 제한
 */

export const filterInput = ({ input, maxLength, type = 'custom', customPattern }: Props) => {
  if (type === 'custom') {
    if (!customPattern) return input.slice(0, maxLength)
    const filtered = input.match(customPattern)?.join('') || ''
    return filtered.slice(0, maxLength)
  }

  const pattern = FILTER_PATTERNS[type]
  if (!pattern) return input.slice(0, maxLength)

  const filtered = input.match(pattern)?.join('') || ''
  return filtered.slice(0, maxLength)
}

/** 숫자만 입력된 문자열을 YYYY-MM-DD 형식으로 변환 */
export const formatDateInput = (raw: string): string => {
  const digits = raw.replace(/\D/g, '')

  if (digits.length <= 4) return digits
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`

  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`
}

/** 전화번호 형태를 '-' 추가된 형식으로 반환 */
export const formatPhoneNumberInput = (raw: string): string => {
  const digits = raw.replace(/\D/g, '')

  if (digits.length <= 3) return digits
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`

  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`
}

/** filterInput을 사용하는 onInput 핸들러 생성 */
export const createFilterInputHandler = (
  maxLength: number,
  type?: InputFilterType,
  customPattern?: RegExp,
) => {
  return (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const input = e.currentTarget
    input.value = filterInput({
      input: input.value,
      maxLength,
      type,
      customPattern,
    })
  }
}

/** 전화번호 포맷팅 onInput 핸들러 */
export const createPhoneInputHandler = () => {
  return (e: FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    input.value = formatPhoneNumberInput(input.value)
  }
}
