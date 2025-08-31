import { useSuspenseQuery } from '@tanstack/react-query'

import { FontListViewModel } from '../models/fontListViewModel'
import type { FontExploreFilter } from '../types/font.type'

import { fontQueryKeys } from './fontQueryKey'
import { fontService } from './fontService'

/** 폰트 둘러보기 목록 */
export const useExploreFontList = (filter: FontExploreFilter) => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.explore(filter),
    queryFn: () => fontService.getExplore(filter),
    select: (response) => new FontListViewModel(response),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

/** 인기 폰트 목록 */
export const usePopularFontList = () => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.popular(),
    queryFn: () => fontService.getPopular(),
    select: (response) =>
      new FontListViewModel({
        content: response,
        number: 0,
        totalPages: 1,
      }),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  })
}
