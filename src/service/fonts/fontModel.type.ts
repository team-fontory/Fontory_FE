/** 폰트 단일 항목 모델 */
export type FontItemModel = {
  fontId: number
  fontName: string
  writerName: string
  example: string
  isBookmarked: boolean
  fontAddr: string
  downloadCount: string
  bookmarkCount: string
}

/** 폰트 목록 모델 */
export type FontListModel = FontItemModel[]

/** 제작 중인 폰트 단일 항목 모델 */
export type InProgressFontModel = {
  id: number
  name: string
  formattedCreatedAt: string
}

/** 제작 중인 폰트 목록 모델 */
export type InProgressFontListModel = InProgressFontModel[]
