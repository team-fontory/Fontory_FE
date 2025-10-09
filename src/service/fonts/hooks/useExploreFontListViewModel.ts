import { useSearchParams } from 'react-router-dom'

import {
  isNetworkError,
  isNotFoundError,
  NetworkError,
} from '@/shared/apis/api.error'
import { FONT_FILTER_OPTIONS } from '@/shared/constants/filter.constant'
import { useExploreFontListQuery } from '@/store/queries/font.query'
import type { ExploreFontListRequest } from '@/store/queries/fontApi.type'

import { convertFontListViewModel } from '../convertToFontViewModel'
import { FontListLoadError, FontNotFoundError } from '../font.error'
import type { FontListModel } from '../fontModel.type'

const findSelectedFilter = (filter: string) => {
  return FONT_FILTER_OPTIONS.find((option) => option.key === filter)
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

/** 둘러보기 폰트 목록을 불러와 뷰모델로 바꾸는 훅 */
export const useExploreFontListViewModel = () => {
  const [searchParams] = useSearchParams()
  const selectedFilter = findSelectedFilter(searchParams.get('filter') || '')

  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const searchQuery = searchParams.get('search') || ''
  const selectedSortBy = selectedFilter?.sortBy ?? 'createdAt'

  const params = {
    page: currentPage,
    sortBy: selectedSortBy,
    size: 8,
    keyword: searchQuery.trim() || null,
  } as ExploreFontListRequest

  const { data: exploreData, isError, error } = useExploreFontListQuery(params)
  if (isError) {
    handleErrorAndThrow(error)
  }

  const isEmptyList = !exploreData || !exploreData?.content.length
  if (isEmptyList) return { fontList: [] as FontListModel, totalPages: 0 }

  return {
    fontList: convertFontListViewModel(exploreData.content),
    totalPages: exploreData.totalPages,
  }
}
