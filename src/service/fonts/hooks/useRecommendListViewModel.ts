import {
  isNetworkError,
  isNotFoundError,
  NetworkError,
} from '@/shared/apis/api.error'
import { useRecommendListQuery } from '@/store/queries/font.query'

import { FontListLoadError, FontNotFoundError } from '../font.error'
import { convertFontListViewModel } from '../convertToFontViewModel'
import type { FontListModel } from '../fontModel.type'

/** fontId가 유효하지 않은지 검사 */
const isInvalidFontId = (fontId: number) => {
  return !fontId || isNaN(fontId) || fontId <= 0
}

/**
 * API 에러를 도메인 에러로 변환하여 throw
 * @param error - React Query에서 발생한 에러
 * @throws {FontNotFoundError} 404 에러인 경우
 * @throws {NetworkError} 네트워크 에러인 경우
 * @throws {FontListLoadError} 기타 서버 에러인 경우
 */
const handleErrorAndThrow = (error: Error | null) => {
  if (isNotFoundError(error)) {
    throw new FontNotFoundError()
  }
  if (isNetworkError(error)) {
    throw new NetworkError()
  }
  throw new FontListLoadError()
}

/** 추천 폰트 목록을 조회하고 뷰모델로 변환 */
export const useRecommendListViewModel = (fontId: number): FontListModel => {
  if (isInvalidFontId(fontId)) {
    throw new FontNotFoundError()
  }

  const {
    data: recommendListData,
    isError,
    error,
  } = useRecommendListQuery({ fontId })

  if (isError) {
    handleErrorAndThrow(error)
  }

  if (!recommendListData?.length) return [] as FontListModel

  return convertFontListViewModel(recommendListData)
}
