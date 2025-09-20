import { FONT_FILTER_OPTIONS } from '../constants/fontFilterOptions'
import type { FontFilterType, FontSortBy } from '../types'

/** 필터에서 정렬 기준 찾기 */
export const getFilterSortBy = (filter: FontFilterType): FontSortBy => {
  return FONT_FILTER_OPTIONS.find((option) => option.key === filter)?.sortBy ?? 'createdAt'
}

/**  주어진 필터 값이 유효한 경우 반환, 유효하지 않으면 기본 필터 키를 반환 */
export const getValidFontFilterKey = (filter: string | null): FontFilterType => {
  const validFilter = FONT_FILTER_OPTIONS.find((option) => option.key === filter)

  return validFilter ? validFilter.key : FONT_FILTER_OPTIONS[0].key
}
