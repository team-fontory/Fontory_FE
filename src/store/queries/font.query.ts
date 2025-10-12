import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

import {
  checkFontNameDuplicate,
  getBookmarkFontList,
  getCompletedFontList,
  getExploreFontList,
  getFontDetail,
  getFontDownloadUrl,
  getInProgressFontList,
  getPopularFontList,
  getRecommendFontList,
} from './font.api'
import { fontQueryKeys } from './font.key'
import type {
  BookmarkFontListRequest,
  CompletedFontListRequest,
  ExploreFontListRequest,
  FontDetailRequest,
  FontDownloadUrlRequest,
  FontNameDuplicateRequest,
  RecommendListRequest,
} from './fontApi.type'

/** 폰트 상세 정보 조회 */
export const useFontDetailQuery = (params: FontDetailRequest) => {
  return useQuery({
    queryKey: fontQueryKeys.detail(params),
    queryFn: () => getFontDetail(params),
  })
}

/** 제작자의 다른 폰트 목록 조회 */
export const useRecommendListQuery = (params: RecommendListRequest) => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.recommend(params),
    queryFn: () => getRecommendFontList(params),
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  })
}

/** 폰트 다운로드 URL 조회 */
export const useFontDownloadQuery = (params: FontDownloadUrlRequest) => {
  return useQuery({
    queryKey: fontQueryKeys.download(params),
    queryFn: () => getFontDownloadUrl(params),
    enabled: false,
  })
}

/** 북마크된 폰트 목록 조회 */
export const useBookmarkFontListQuery = (params: BookmarkFontListRequest) => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.bookmark(params),
    queryFn: () => getBookmarkFontList(params),
  })
}

/** 둘러보기용 폰트 목록 조회 */
export const useExploreFontListQuery = (params: ExploreFontListRequest) => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.explore(params),
    queryFn: () => getExploreFontList(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

/** 인기 폰트 목록 조회 */
export const usePopularFontListQuery = () => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.popular(),
    queryFn: getPopularFontList,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  })
}

/** 제작 중인 폰트 목록 조회 */
export const useProgressFontListQuery = () => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.inProgress(),
    queryFn: getInProgressFontList,
    staleTime: 60000,
    gcTime: 60000 * 5,
  })
}

/** 제작 완료된 폰트 목록 조회 */
export const useCompletedFontListQuery = (params: CompletedFontListRequest) => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.complete(params),
    queryFn: () => getCompletedFontList(params),
    staleTime: 60000,
    gcTime: 60000 * 5,
  })
}

/** 폰트 이름 중복 체크 */
export const useCheckFontNameQuery = (params: FontNameDuplicateRequest) => {
  return useQuery({
    queryKey: fontQueryKeys.fontNameCheck(params),
    queryFn: () => checkFontNameDuplicate(params),
    enabled: false,
  })
}
