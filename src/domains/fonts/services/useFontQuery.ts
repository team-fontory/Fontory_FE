import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

import { InProgressFontListViewModel } from '../models/inProgressFontViewModel'
import type { FontBookmarkOptionsType, FontOptionsType } from '../types/font.type'
import {
  toFontItemView,
  toFontListViewModel,
  toPaginationViewModel,
} from '../view-model/fontViewModel'

import { fontQueryKeys } from './fontQueryKey'
import { fontService } from './fontService'

/** 폰트 이름 중복 검사 */
export const useCheckFontName = (fontName: string) => {
  return useQuery({
    queryKey: fontQueryKeys.fontNameCheck(fontName),
    queryFn: () => fontService.checkFontNameDuplicate(fontName),
    enabled: false,
  })
}

/** 폰트 둘러보기 목록 */
export const useExploreFontList = (filter: FontOptionsType) => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.explore(filter),
    queryFn: () => fontService.getExplore(filter),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    select: ({ content, ...rest }) => ({
      listView: toFontListViewModel(content),
      paginationView: toPaginationViewModel({ ...rest }),
    }),
  })
}

/** 인기 폰트 목록 */
export const usePopularFontList = () => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.popular(),
    queryFn: () => fontService.getPopular(),
    select: toFontListViewModel,
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
    select: toFontItemView,
  })
}

/** 제작자의 다른 폰트 */
export const useRecommendFontList = (fontId: number) => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.recommend(fontId),
    queryFn: () => fontService.getRecommend(fontId),
    select: toFontListViewModel,
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  })
}

/** 제작 중인 폰트 목록 */
export const useProgressFontList = () => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.inProgress(),
    queryFn: () => fontService.getInProgress(),
    select: (response) => new InProgressFontListViewModel(response),
    staleTime: 60000,
    gcTime: 60000 * 5,
  })
}

/** 제작 완료된 폰트 목록 */
export const useCompletedFontList = (page: number) => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.complete(page),
    queryFn: () => fontService.getCompleted(page),
    select: ({ content, ...rest }) => ({
      listView: toFontListViewModel(content),
      paginationView: toPaginationViewModel({ ...rest }),
    }),
    staleTime: 60000,
    gcTime: 60000 * 5,
  })
}

/** 북마크한 폰트 리스트 */
export const useBookmarkFontList = (filter: FontBookmarkOptionsType) => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.bookmark(filter),
    queryFn: () => fontService.getBookmark(filter),
    select: ({ content, ...rest }) => ({
      listView: toFontListViewModel(content),
      paginationView: toPaginationViewModel({ ...rest }),
    }),
  })
}
