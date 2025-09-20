import type { FONT_FILTER_OPTIONS } from '../constants/fontFilterOptions'

/** 클라이언트에서 사용되는 폰트 필터 */
export type FontFilterType = (typeof FONT_FILTER_OPTIONS)[number]['key']

/** 서버에서 사용되는 폰트 정렬 기준 */
export type FontSortBy = (typeof FONT_FILTER_OPTIONS)[number]['sortBy']

/** 폰트 목록 조회 옵션 */
export type FontListOptions = {
  page: number
  sortBy: FontSortBy
  keyword: string | null
}

/** 북마크 폰트 조회 옵션 */
export type FontBookmarkOptions = Omit<FontListOptions, 'sortBy'>
