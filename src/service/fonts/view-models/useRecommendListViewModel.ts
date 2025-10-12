import {
  isNetworkError,
  isNotFoundError,
  NetworkError,
  UnknownError,
} from '@/shared/apis/api.error'
import { useRecommendListQuery } from '@/store/queries/font.query'

import { convertFontListViewModel } from '../convertToFontViewModel'
import { FontNotFoundError } from '../font.error'
import type { FontListModel } from '../fontModel.type'

/** fontId가 유효하지 않은지 검사 */
const isInvalidFontId = (fontId: number) => {
  const isInvalid = !fontId || isNaN(fontId) || fontId <= 0
  return isInvalid
}

/** 에러 타입에 따라 적절한 커스텀 에러를 throw하는 함수 */
const handleError = (error: unknown) => {
  if (isNotFoundError(error)) throw new FontNotFoundError()
  if (isNetworkError(error)) throw new NetworkError()
  throw new UnknownError()
}

/** 추천 폰트 목록을 조회하고 뷰모델로 변환 */
export const useRecommendListViewModel = (fontId: number) => {
  if (isInvalidFontId(fontId)) throw new FontNotFoundError()
  const emptyList = [] as FontListModel

  const {
    data: recommendListData,
    isLoading,
    isError,
    error,
  } = useRecommendListQuery({ fontId })

  if (isLoading) return { isLoading, recommendList: emptyList }
  if (isError) return handleError(error)
  if (!recommendListData?.length) return { isLoading, recommendList: emptyList }

  return {
    isLoading,
    recommendList: convertFontListViewModel(recommendListData),
  }
}
