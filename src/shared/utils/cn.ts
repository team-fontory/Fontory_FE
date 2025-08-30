/**
 * 조건부로 클래스 이름을 조합하여 반환하는 유틸 함수
 */

export const cn = (...args: (string | undefined | null | false)[]): string => {
  return args.filter(Boolean).join(' ')
}
