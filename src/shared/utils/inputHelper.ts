/** 숫자만 입력된 문자열을 YYYY-MM-DD 형식으로 변환 */
export const formatDateInput = (raw: string): string => {
  const digits = raw.replace(/\D/g, '')

  if (digits.length <= 4) return digits
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`

  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`
}
