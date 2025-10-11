import type { ProgressStatusValueType } from '@/service/fonts/constants/progress.constant'

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
  createdAt: string
  formattedCreatedAt: string
  status: string
  statusText: ProgressStatusValueType
}

/** 제작 중인 폰트 목록 모델 */
export type InProgressFontListModel = {
  fontList: InProgressFontModel[]
  count: number
}
