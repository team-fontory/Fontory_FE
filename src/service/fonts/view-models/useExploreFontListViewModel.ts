import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { handleApiErrorWithToast } from '@/shared/apis/api.error'
import { useExploreFontListQuery } from '@/store/queries/font.query'
import type { ExploreFontListRequest } from '@/store/queries/fontApi.type'

import { FONT_FILTER_OPTIONS } from '../constants/filter.constant'
import { convertFontListViewModel } from '../convertToFontViewModel'

/** 필터 키에 해당하는 필터 옵션을 찾아 반환 */
const findSelectedFilter = (filter: string) => {
  return FONT_FILTER_OPTIONS.find((option) => option.key === filter)
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

  const { data: exploreData, isError, error } = useExploreFontListQuery(params)
  const emptyList = useMemo(() => ({ fontList: [], totalPages: 0 }), [])

  if (isError) {
    handleApiErrorWithToast(error)
    return emptyList
  }

  const isEmptyList = !exploreData || !exploreData?.content?.length
  if (isEmptyList) return emptyList

  return {
    fontList: convertFontListViewModel(exploreData.content),
    totalPages: exploreData.totalPages,
  }
}
