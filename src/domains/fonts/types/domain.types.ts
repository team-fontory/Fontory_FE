/** 폰트 기본 정보 */
export type Font = {
  id: number
  name: string
  example: string
  woff: string
  writerName: string
}

/** 폰트 통계 정보 */
export type FontStats = {
  downloadCount: number
  bookmarkCount: number
}

/** 폰트 북마크 정보 */
export type FontBookmark = {
  isBookmarked: boolean
}

/** 폰트 전체 정보 */
export type FontWithDetails = Font &
  FontStats &
  FontBookmark & {
    fontAddr: string
  }
