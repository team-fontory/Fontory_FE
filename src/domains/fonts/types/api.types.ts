import type { Font, FontStats } from './domain.types'

/** 기본 페이지네이션 응답 */
export type PaginationResponse = {
  number: number
  totalPages: number
}

/** 폰트 아이템 API 응답 */
export type FontResponse = Font & FontStats & { bookmarked: boolean }

/** 폰트 목록 API 응답 */
export type FontListResponse = PaginationResponse & {
  content: FontResponse[]
}

/** 폰트 상세보기 API 응답 */
export type FontDetailResponse = FontResponse

/** 폰트 다운로드 API 응답 */
export type FontDownloadResponse = Pick<Font, 'id' | 'name'> & {
  ttf: string
}

/** 제작 중인 폰트 API 응답 */
export type InProgressFontResponse = Pick<Font, 'id' | 'name'> & {
  createdAt: string
  status: string
}

/** 완료된 폰트 목록 API 응답 */
export type CompletedFontResponse = PaginationResponse & {
  content: FontDetailResponse[]
}
