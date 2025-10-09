import type { FontFilterSortByType } from '@/shared/constants/filter.constant'

/** 폰트 목록 조회 옵션 */
export type FontListOptions = {
  page: number
  sortBy: FontFilterSortByType
  keyword: string | null
}

/** 북마크 폰트 조회 옵션 */
export type FontBookmarkOptions = Omit<FontListOptions, 'sortBy'>
