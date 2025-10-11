/** 제작 상태를 나타내는 상수 */
export const PROGRESS_STATUS = {
  pending: '대기 중',
  processing: '제작 중',
  reviewing: '검토 중',
} as const

/** PROGRESS_STATUS의 키를 뽑아낸 배열 */
export const PROGRESS_STATUS_KEYS = Object.keys(PROGRESS_STATUS) as (keyof typeof PROGRESS_STATUS)[]

/** PROGRESS_STATUS의 키 타입 */
export type ProgressStatusKeyType = keyof typeof PROGRESS_STATUS

/** PROGRESS_STATUS의 값 타입 */
export type ProgressStatusValueType = (typeof PROGRESS_STATUS)[ProgressStatusKeyType]
