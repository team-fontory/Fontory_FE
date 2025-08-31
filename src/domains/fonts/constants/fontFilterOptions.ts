/** 폰트 필터 옵션 */
export const FONT_FILTER_OPTIONS = [
  {
    key: 'all' as const,
    label: '전체',
    description: '모든 폰트 보기',
    sortBy: 'createdAt' as const,
  },
  {
    key: 'most-bookmarked' as const,
    label: '북마크순',
    description: '많이 북마크된 순',
    sortBy: 'bookmarkCount' as const,
  },
  {
    key: 'most-downloaded' as const,
    label: '다운로드순',
    description: '많이 다운로드된 순',
    sortBy: 'downloadCount' as const,
  },
] as const
