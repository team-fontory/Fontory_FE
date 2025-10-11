import { useSearchParams } from 'react-router-dom'

import {
  isNetworkError,
  isNotFoundError,
  NetworkError,
} from '@/shared/apis/api.error'
import { useCompletedFontListQuery } from '@/store/queries/font.query'

import { convertFontListViewModel } from '../convertToFontViewModel'
import { FontListLoadError, FontNotFoundError } from '../font.error'
import type { FontListModel } from '../fontModel.type'

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

/** 제작 완료된 폰트를 조회하고 뷰모델로 변환 */
export const useCompletedFontListViewModel = () => {
  const [searchParams] = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const params = { page: currentPage }

  const {
    data: completedFontData,
    isError,
    error,
  } = useCompletedFontListQuery(params)

  if (isError) {
    handleErrorAndThrow(error)
  }

  if (!completedFontData?.content?.length) {
    return {
      fontList: [] as FontListModel,
      totalPages: completedFontData.totalPages,
    }
  }

  return {
    fontList: convertFontListViewModel(completedFontData.content),
    totalPages: completedFontData.totalPages,
  }
}
