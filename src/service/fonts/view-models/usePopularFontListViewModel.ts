import { isNetworkError, NetworkError } from '@/shared/apis/api.error'
import { usePopularFontListQuery } from '@/store/queries/font.query'

import { convertFontListViewModel } from '../convertToFontViewModel'
import { FontListLoadError } from '../font.error'
import type { FontListModel } from '../fontModel.type'

/** 에러 타입에 따라 적절한 커스텀 에러를 throw하는 함수 */
const handleError = (error: unknown) => {
  if (isNetworkError(error)) throw new NetworkError()
  throw new FontListLoadError('인기 폰트 목록을 불러오지 못했습니다.')
}

/** 인기 폰트 목록을 조회하고 뷰모델로 변환 */
export const usePopularFontListViewModel = () => {
  const {
    data: popularFontData,
    isLoading,
    isError,
    error,
  } = usePopularFontListQuery()
  const emptyList = [] as FontListModel

  if (isLoading) return { isLoading, fontList: emptyList }
  if (isError) handleError(error)
  if (!popularFontData?.length) return { isLoading, fontList: emptyList }

  return {
    isLoading: false,
    fontList: convertFontListViewModel(popularFontData),
  }
}
