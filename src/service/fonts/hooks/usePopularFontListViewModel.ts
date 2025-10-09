import {
  isNetworkError,
  isNotFoundError,
  NetworkError,
} from '@/shared/apis/api.error'
import { usePopularFontListQuery } from '@/store/queries/font.query'

import { FontListLoadError, FontNotFoundError } from '../errors/font.error'
import { convertFontListViewModel } from '../transformers/convertToViewModel'
import type { FontListModel } from '../types/fontModel.type'

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

/**
 * 인기 폰트 목록을 조회하고 뷰모델로 변환하는 훅
 * @returns {FontListModel} 변환된 폰트 목록
 * @throws {FontNotFoundError | NetworkError | FontListLoadError} API 에러 시
 */
export const usePopularFontListViewModel = () => {
  const { data: popularFontData, isError, error } = usePopularFontListQuery()

  if (isError) {
    handleErrorAndThrow(error)
  }

  if (!popularFontData?.length) {
    return [] as FontListModel
  }

  return convertFontListViewModel(popularFontData)
}
