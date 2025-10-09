/** 폰트 필터 옵션 */
export const FONT_FILTER_OPTIONS = [
  {
    key: 'all' as const,
    sortBy: 'createdAt' as const,
    label: '전체',
    description: '모든 폰트 보기',
  },
  {
    key: 'most-bookmarked' as const,
    sortBy: 'bookmarkCount' as const,
    label: '북마크순',
    description: '많이 북마크된 순',
  },
  {
    key: 'most-downloaded' as const,
    sortBy: 'downloadCount' as const,
    label: '다운로드순',
    description: '많이 다운로드된 순',
  },
] as const

/** key 타입 추출 - "all" | "most-bookmarked" | "most-downloaded" */
export type FontFilterKeyType = (typeof FONT_FILTER_OPTIONS)[number]['key']

/** sortBy 타입 추출 - "createdAt" | "bookmarkCount" | "downloadCount" */
export type FontFilterSortByType = (typeof FONT_FILTER_OPTIONS)[number]['sortBy']
