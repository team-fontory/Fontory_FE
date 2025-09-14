import type z from 'zod'

import type { createFontSchema } from '../constants/createFontConfig'
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

/** 서버에 전송할 폰트 필터 옵션 */
export type FontOptionsType = {
  page: number
  sortBy: FontSortBy
  keyword: string | null
}

export type FontBookmarkOptionsType = Omit<FontOptionsType, 'sortBy'>

/** 폰트 둘러보기 API 응답 */
export type FontListResponse = {
  content: FontListItem[]
  number: number
  totalPages: number
}

/** 폰트 다운로드 API 응답 */
export type FontDownloadResponse = Pick<FontInfo, 'id' | 'name'> & {
  ttf: string
}

/** 폰트 상세보기 API 응답 */
export type FontDetailResponse = FontInfo & FontStats

export type CreateFontFormType = z.input<typeof createFontSchema>

export type InProgressFontResponse = Pick<FontInfo, 'id' | 'name'> & {
  createdAt: string
  status: string
}

export type CompletedFontResponse = {
  content: FontDetailResponse[]
  number: number
  totalPages: number
}

export type FontItemResponse = FontInfo & FontStats
export type PaginationResponse = {
  number: number
  totalPages: number
}

export type FontItemView = {
  fontId: number
  fontName: string
  writerName: string
  example: string
  isBookmarked: boolean
  fontAddr: string
  downloadCount: string
  bookmarkCount: string
}

export type FontListView = {
  list: FontItemView[]
  isEmpty: boolean
}

export type PaginationView = {
  currentPage: number
  totalPages: number
  isOnlyOnePage: boolean
  pageInfo: string
}
