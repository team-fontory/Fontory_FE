/** 폰트 카드 공통 정보 */
export type FontCardInfoResponse = {
  id: number
  name: string
  example: string
  woff: string
  writerName: string
  downloadCount: number
  bookmarkCount: number
  bookmarked: boolean
}

/** 페이지네이션 공통 정보 */
export type PaginationInfoResponse = {
  number: number
  totalPages: number
}

/** 폰트 이름 중복 검사 요청 */
export type FontNameDuplicateRequest = {
  fontName: string
}

/** 폰트 이름 중복 검사 응답 */
export type FontNameDuplicateResponse = boolean

/** 둘러보기 폰트 목록 요청 */
export type ExploreFontListRequest = {
  page: number
  size: number
  sortBy: string
  keyword: string | null
}

/** 둘러보기 폰트 목록 응답 */
export type ExploreFontListResponse = PaginationInfoResponse & {
  content: FontCardInfoResponse[]
}

/** 인기 폰트 목록 응답 */
export type PopularFontListResponse = FontCardInfoResponse[]

/** 폰트 다운로드 요청 */
export type FontDownloadUrlRequest = {
  fontId: number
}

/** 폰트 다운로드 응답 */
export type FontDownloadUrlResponse = {
  id: number
  name: string
  ttf: string
}

/** 폰트 삭제 요청 */
export type RemoveFontRequest = {
  fontId: number
}

/** 폰트 상세보기 요청 */
export type FontDetailRequest = {
  fontId: number
}

/** 폰트 상세보기 응답 */
export type FontDetailResponse = FontCardInfoResponse

/** 제작자의 다른 폰트 요청 */
export type RecommendListRequest = {
  fontId: number
}

/** 제작자의 다른 폰트 응답 */
export type RecommendListResponse = FontCardInfoResponse[]

/** 제작 중인 폰트 단일 응답 */
export type InProgressFontResponse = {
  id: number
  name: string
  createdAt: string
  status: string
}

/** 제작 중인 폰트 응답 */
export type InProgressFontListResponse = InProgressFontResponse[]

/** 완료된 폰트 목록 요청 */
export type CompletedFontListRequest = {
  page: number
}

/** 완료된 폰트 목록 응답 */
export type CompletedFontListResponse = PaginationInfoResponse & {
  content: FontCardInfoResponse[]
}

/** 북마크한 폰트 목록 요청 */
export type BookmarkFontListRequest = {
  page: number
  size: number
  keyword: string | null
}

/** 북마크한 폰트 목록 응답 */
export type BookmarkFontListResponse = PaginationInfoResponse & {
  content: FontCardInfoResponse[]
}

/** 북마크 추가 요청 */
export type AddBookmarkRequest = {
  fontId: number
}

/** 북마크 제거 요청 */
export type RemoveBookmarkRequest = {
  fontId: number
}
