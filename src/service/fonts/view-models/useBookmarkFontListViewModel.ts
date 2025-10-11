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
    isError,
    error,
  } = useBookmarkFontListQuery(params)

  if (isError) {
    handleErrorAndThrow(error)
  }

  const isEmptyList = !bookmarkFontData?.content?.length

  if (isEmptyList) {
    return { fontList: [] as FontListModel, totalPages: 0 }
  }

  return {
    fontList: convertFontListViewModel(bookmarkFontData.content),
    totalPages: bookmarkFontData.totalPages,
  }
}
