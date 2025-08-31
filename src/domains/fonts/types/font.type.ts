import type { FONT_FILTER_OPTIONS } from '../constants/fontFilterOptions'

/** 클라이언트에서 사용되는 폰트 필터 "all" | "most-bookmarked" | "most-downloaded" */
export type FontFilterType = (typeof FONT_FILTER_OPTIONS)[number]['key']

/** 서버에서 사용되는 폰트 필터 "createdAt" | "bookmarkCount" | "downloadCount" */
export type FontSortBy = (typeof FONT_FILTER_OPTIONS)[number]['sortBy']

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

/** 폰트 다운로드 API 응답 */
export type FontDownloadResponse = Pick<FontInfo, 'id' | 'name'> & {
  ttf: string
}
