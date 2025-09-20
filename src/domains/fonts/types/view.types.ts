/** 폰트 아이템 뷰 모델 */
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

/** 폰트 목록 뷰 모델 */
export type FontListView = {
  list: FontItemView[]
  isEmpty: boolean
}

/** 페이지네이션 뷰 모델 */
export type PaginationView = {
  currentPage: number
  totalPages: number
  isOnlyOnePage: boolean
  pageInfo: string
}

/** 제작 중인 폰트 뷰 모델 */
export type InProgressFontView = {
  id: number
  name: string
  createdAt: string
  formattedCreatedAt: string
  status: string
  statusText: string
}

/** 제작 중인 폰트 목록 뷰 모델 */
export type InProgressFontListView = {
  items: InProgressFontView[]
  isEmpty: boolean
  count: number
}
