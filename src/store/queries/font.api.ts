import { apiClient } from '@/shared/apis/apiClient'

import type {
  AddBookmarkRequest,
  BookmarkFontListRequest,
  BookmarkFontListResponse,
  CompletedFontListRequest,
  CompletedFontListResponse,
  ExploreFontListRequest,
  ExploreFontListResponse,
  FontDetailRequest,
  FontDetailResponse,
  FontDownloadUrlRequest,
  FontDownloadUrlResponse,
  FontNameDuplicateRequest,
  FontNameDuplicateResponse,
  InProgressFontListResponse,
  PopularFontListResponse,
  RecommendListRequest,
  RecommendListResponse,
  RemoveBookmarkRequest,
} from './fontApi.type'

/** 폰트 이름 중복 체크 */
export const checkFontNameDuplicate = (params: FontNameDuplicateRequest) => {
  return apiClient.get<FontNameDuplicateResponse>(`/fonts/verify-name`, {
    params,
  })
}

/** 둘러보기용 폰트 목록 조회 */
export const getExploreFontList = (params: ExploreFontListRequest) => {
  return apiClient.get<ExploreFontListResponse>('/fonts', { params })
}

/** 인기 폰트 목록 조회 */
export const getPopularFontList = () => {
  return apiClient.get<PopularFontListResponse>('/fonts/popular')
}

/** 폰트 다운로드 URL 조회 */
export const getFontDownloadUrl = (params: FontDownloadUrlRequest) => {
  return apiClient.get<FontDownloadUrlResponse>(
    `/fonts/${params.fontId}/download`,
  )
}

/** 폰트 상세 정보 조회 */
export const getFontDetail = (params: FontDetailRequest) => {
  return apiClient.get<FontDetailResponse>(`/fonts/${params.fontId}`)
}

/** 제작자의 다른 폰트 목록 조회 */
export const getRecommendFontList = (params: RecommendListRequest) => {
  return apiClient.get<RecommendListResponse>(`/fonts/${params.fontId}/others`)
}

/** 제작 중인 폰트 목록 조회 */
export const getInProgressFontList = () => {
  return apiClient.get<InProgressFontListResponse>('/fonts/progress')
}

/** 제작 완료된 폰트 목록 조회 */
export const getCompletedFontList = (params: CompletedFontListRequest) => {
  return apiClient.get<CompletedFontListResponse>('/fonts/members', { params })
}

/** 북마크된 폰트 목록 조회 */
export const getBookmarkFontList = (params: BookmarkFontListRequest) => {
  return apiClient.get<BookmarkFontListResponse>('/bookmarks', { params })
}

/** 북마크 추가 */
export const addBookmark = (params: AddBookmarkRequest) => {
  return apiClient.post(`/bookmarks/${params.fontId}`)
}

/** 북마크 제거 */
export const removeBookmark = (params: RemoveBookmarkRequest) => {
  return apiClient.delete(`/bookmarks/${params.fontId}`)
}

/** 폰트 생성 요청 */
export const createFont = (formData: FormData) => {
  return apiClient.post(`/fonts`, formData)
}
