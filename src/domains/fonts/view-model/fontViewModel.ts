import { formatDate } from '@/shared/utils/formatDate'

import { PROGRESS_STATUS } from '../constants/progressState'
import type {
  FontItemResponse,
  FontItemView,
  FontListView,
  InProgressFontListView,
  InProgressFontResponse,
  InProgressFontView,
  PaginationResponse,
  PaginationView,
} from '../types'

/** 폰트 정보 -> 폰트 정보 뷰로 변환 */
export const toFontItemView = (item: FontItemResponse): FontItemView => ({
  fontId: item.id,
  fontName: item.name,
  writerName: item.writerName,
  example: item.example,
  isBookmarked: item.bookmarked,
  fontAddr: item.woff,
  downloadCount: item.downloadCount.toLocaleString(),
  bookmarkCount: item.bookmarkCount.toLocaleString(),
})

/** 폰트 리스트 -> 폰트 리스트 뷰로 변환 */
export const toFontListViewModel = (fontList: FontItemResponse[]): FontListView => ({
  list: fontList.map(toFontItemView),
  isEmpty: fontList.length === 0,
})

/** 페이지네이션 응답 -> 페이지네이션 뷰로 변환 */
export const toPaginationViewModel = (response: PaginationResponse): PaginationView => ({
  currentPage: response.number + 1,
  totalPages: response.totalPages,
  pageInfo:
    response.totalPages === 0
      ? '결과 없음'
      : `${response.number + 1} / ${response.totalPages} 페이지`,
})

/** 제작 중 폰트 단건 응답을 뷰모델로 변환 */
export const toInProgressFontView = (data: InProgressFontResponse): InProgressFontView => {
  const formattedCreatedAt = formatDate(data.createdAt)
  const statusText = PROGRESS_STATUS[data.status as keyof typeof PROGRESS_STATUS]

  return {
    id: data.id,
    name: data.name,
    createdAt: data.createdAt,
    formattedCreatedAt,
    status: data.status,
    statusText,
  }
}

/** 제작 중 폰트 배열을 뷰 리스트로 변환 */
export const toInProgressFontListView = (
  list: InProgressFontResponse[],
): InProgressFontListView => ({
  items: list.map(toInProgressFontView),
  isEmpty: list.length === 0,
  count: list.length,
})
