/** 폰트 필터링 옵션 */
export type FontFilterType = 'all' | 'most-downloaded' | 'most-bookmarked'

/** 폰트 정렬 기준 */
export type FontSortBy = 'createdAt' | 'downloadCount' | 'bookmarkCount'

/** 기본 폰트 정보 */
export type FontInfo = {
  id: number
  name: string
  example: string
  bookmarked: boolean
  woff: string
  writerName: string
}

/** 폰트 통계 정보 */
export type FontStats = {
  downloadCount: number
  bookmarkCount: number
}

/** 상세 폰트 정보 */
export type FontDetail = {
  fontId: number
  fontName: string
  writerName: string
  example: string
  isBookmarked: boolean
  fontAddr: string
  downloadCount: number
  bookmarkCount: number
}

/** 폰트 목록 아이템 */
export type FontListItem = FontInfo & FontStats

/** 폰트 목록 데이터  */
export type FontViewData = {
  fontList: FontDetail[]
  currentPage: number
  totalPages: number
}

/** 폰트 둘러보기 필터 옵션 */
export type FontExploreFilter = {
  page: number
  sortBy: FontSortBy
  keyword: string | null
}

/** 폰트 둘러보기 API 응답 */
export type FontExploreResponse = {
  content: FontListItem[]
  number: number
  totalPages: number
}
