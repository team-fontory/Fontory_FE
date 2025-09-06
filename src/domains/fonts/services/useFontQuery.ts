import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

import { FontListViewModel, FontViewModel } from '../models/fontListViewModel'
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

/** 폰트 다운로드 URL 조회 쿼리 */
export const useFontDownloadQuery = (fontId: number) => {
  return useQuery({
    queryKey: fontQueryKeys.download(fontId),
    queryFn: () => fontService.getDownloadUrl(fontId),
    enabled: false,
  })
}

/** 폰트 상세보기 */
export const useFontDetail = (fontId: number) => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.detail(fontId),
    queryFn: () => fontService.getDetail(fontId),
    select: (response) => new FontViewModel(response),
  })
}

/** 제작자의 다른 폰트 */
export const useRecommendFontList = (fontId: number) => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.recommend(fontId),
    queryFn: () => fontService.getRecommend(fontId),
    select: (response) => new FontListViewModel({
      content: response,
      number: 0,
      totalPages: 1,
    }),
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  })
}
