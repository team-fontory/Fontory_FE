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

/** 에러 타입에 따라 적절한 커스텀 에러를 throw하는 함수 */
const handleError = (error: unknown) => {
  if (isNotFoundError(error)) throw new FontNotFoundError()
  if (isNetworkError(error)) throw new NetworkError()
  throw new FontListLoadError('제작 완료된 목록을 불러오지 못했습니다.')
}

/** 제작 완료된 폰트를 조회하고 뷰모델로 변환 */
export const useCompletedFontListViewModel = () => {
  const [searchParams] = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const params = { page: currentPage }

  const {
    data: completedFontData,
    isLoading,
    isError,
    error,
  } = useCompletedFontListQuery(params)
  const emptyList = [] as FontListModel

  if (isLoading) return { isLoading: true, fontList: emptyList, totalPages: 0 }
  if (isError) handleError(error)
  if (!completedFontData?.content?.length) {
    return { isLoading, fontList: emptyList, totalPages: 0 }
  }

  return {
    isLoading: false,
    fontList: convertFontListViewModel(completedFontData.content),
    totalPages: completedFontData.totalPages,
  }
}
