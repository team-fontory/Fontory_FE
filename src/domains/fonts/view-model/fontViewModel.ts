import type {
  FontItemResponse,
  FontItemView,
  FontListView,
  PaginationResponse,
  PaginationView,
} from '../types/font.type'

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
  isOnlyOnePage: response.totalPages === 1,
  pageInfo:
    response.totalPages === 0
      ? '결과 없음'
      : `${response.number + 1} / ${response.totalPages} 페이지`,
})
