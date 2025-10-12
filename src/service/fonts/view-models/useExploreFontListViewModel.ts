import { useSearchParams } from 'react-router-dom'

import { isNetworkError, NetworkError } from '@/shared/apis/api.error'
import { useExploreFontListQuery } from '@/store/queries/font.query'
import type { ExploreFontListRequest } from '@/store/queries/fontApi.type'

import { FONT_FILTER_OPTIONS } from '../constants/filter.constant'
import { convertFontListViewModel } from '../convertToFontViewModel'
import { FontListLoadError } from '../font.error'
import type { FontListModel } from '../fontModel.type'

/** 필터 키에 해당하는 필터 옵션을 찾아 반환 */
const findSelectedFilter = (filter: string) => {
  return FONT_FILTER_OPTIONS.find((option) => option.key === filter)
}

/** 에러 타입에 따라 적절한 커스텀 에러를 throw하는 함수 */
const handleError = (error: unknown) => {
  if (isNetworkError(error)) throw new NetworkError()
  throw new FontListLoadError('둘러보기 폰트 목록을 불러오지 못했습니다.')
}

/** 둘러보기 폰트 목록을 불러와 뷰모델로 바꾸는 훅 */
export const useExploreFontListViewModel = () => {
  const [searchParams] = useSearchParams()
  const selectedFilter = findSelectedFilter(searchParams.get('filter') || '')

  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const searchQuery = searchParams.get('search') || ''
  const selectedSortBy = selectedFilter?.sortBy ?? 'createdAt'

  const params = {
    page: currentPage - 1,
    sortBy: selectedSortBy,
    size: 8,
    keyword: searchQuery.trim() || null,
  } as ExploreFontListRequest

  const {
    data: exploreData,
    isLoading,
    isError,
    error,
  } = useExploreFontListQuery(params)
  const emptyList = [] as FontListModel

  if (isLoading) return { isLoading, fontList: emptyList, totalPages: 0 }
  if (isError) handleError(error)
  if (!exploreData?.content?.length)
    return { isLoading, fontList: emptyList, totalPages: 0 }

  return {
    isLoading: false,
    fontList: convertFontListViewModel(exploreData.content),
    totalPages: exploreData.totalPages,
  }
}
