import { handleApiErrorWithToast } from '@/shared/apis/api.error'
import { usePopularFontListQuery } from '@/store/queries/font.query'

import { convertFontListViewModel } from '../convertToFontViewModel'
import type { FontListModel } from '../fontModel.type'

/** 인기 폰트 목록을 조회하고 뷰모델로 변환 */
export const usePopularFontListViewModel = () => {
  const { data: popularFontData, isError, error } = usePopularFontListQuery()

  if (isError) {
    handleApiErrorWithToast(error, { onUnknown: () => {} })
    return [] as FontListModel
  }

  if (!popularFontData?.length) {
    return [] as FontListModel
  }

  return convertFontListViewModel(popularFontData)
}
