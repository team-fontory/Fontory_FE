import type { FontCardInfoResponse } from '@/store/queries/fontApi.type'

import type { FontItemModel, FontListModel } from '../types/fontModel.type'

/** 폰트 데이터 (API 응답) -> 폰트 아이템 뷰모델 변환 */
export const convertFontItemViewModel = (
  item: FontCardInfoResponse,
): FontItemModel => {
  return {
    fontId: item.id,
    fontName: item.name,
    writerName: item.writerName,
    example: item.example,
    isBookmarked: item.bookmarked,
    fontAddr: item.woff,
    downloadCount: item.downloadCount.toLocaleString(),
    bookmarkCount: item.bookmarkCount.toLocaleString(),
  }
}

/** 폰트 리스트 (API 응답 배열) -> 폰트 리스트 뷰모델 배열 변환 */
export const convertFontListViewModel = (
  fontList: FontCardInfoResponse[],
): FontListModel => {
  return fontList.map((item) => convertFontItemViewModel(item))
}
