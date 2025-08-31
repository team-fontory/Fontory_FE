import { FONT_FILTER_OPTIONS } from '../constants/fontFilterOptions'
import type { FontFilterType, FontSortBy } from '../types/font.type'

/** 필터에서 정렬 기준 찾기 */
export const getFilterSortBy = (filter: FontFilterType): FontSortBy => {
  return FONT_FILTER_OPTIONS.find((option) => option.key === filter)?.sortBy ?? 'createdAt'
}
