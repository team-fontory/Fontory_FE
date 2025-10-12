import { useSearchParams } from 'react-router-dom'

import {
  isNetworkError,
  isNotFoundError,
  NetworkError,
} from '@/shared/apis/api.error'
import { useBookmarkFontListQuery } from '@/store/queries/font.query'

import { convertFontListViewModel } from '../convertToFontViewModel'
import { FontListLoadError, FontNotFoundError } from '../font.error'
import type { FontListModel } from '../fontModel.type'

/** 에러 타입에 따라 적절한 커스텀 에러를 throw하는 함수 */
const handleError = (error: unknown) => {
  if (isNotFoundError(error)) throw new FontNotFoundError()
  if (isNetworkError(error)) throw new NetworkError()
  throw new FontListLoadError()
}

/** 북마크된 폰트 목록을 불러와 뷰모델로 변환 */
export const useBookmarkFontListViewModel = () => {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  const currentPage = Math.max(1, parseInt(searchParams.get('page') || '1', 10))

  const params = {
    page: currentPage - 1,
    size: 8,
    keyword: searchQuery.trim() || null,
  }

  const {
    data: bookmarkFontData,
    isLoading,
    isError,
    error,
  } = useBookmarkFontListQuery(params)
  const emptyList = [] as FontListModel

  if (isLoading) return { isLoading, fontList: emptyList, totalPages: 0 }
  if (isError) handleError(error)
  if (!bookmarkFontData?.content?.length) {
    return { isLoading, fontList: emptyList, totalPages: 0 }
  }

  return {
    isLoading: false,
    fontList: convertFontListViewModel(bookmarkFontData.content),
    totalPages: bookmarkFontData.totalPages,
  }
}
