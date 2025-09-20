import { apiClient } from '@/shared/api/apiClient'

import type {
  CompletedFontResponse,
  FontBookmarkOptions,
  FontDetailResponse,
  FontDownloadResponse,
  FontListOptions,
  FontListResponse,
  FontResponse,
  InProgressFontResponse,
} from '../types'

class FontService {
  /** 폰트 이름 중복 검사 */
  checkFontNameDuplicate(fontName: string) {
    return apiClient.get<boolean>(`/fonts/verify-name`, {
      params: { fontName },
    })
  }

  /** 둘러보기 폰트 목록 */
  getExplore({ page, sortBy, keyword }: FontListOptions) {
    return apiClient.get<FontListResponse>('/fonts', {
      params: {
        page: page - 1,
        size: 8,
        keyword: keyword || undefined,
        sortBy,
      },
    })
  }

  /** 인기 폰트 목록 */
  getPopular() {
    return apiClient.get<FontResponse[]>('/fonts/popular')
  }

  /** 폰트 다운로드 URL 조회 */
  getDownloadUrl(fontId: number) {
    return apiClient.get<FontDownloadResponse>(`/fonts/${fontId}/download`)
  }

  /** 폰트 상세보기 */
  getDetail(fontId: number) {
    return apiClient.get<FontDetailResponse>(`/fonts/${fontId}`)
  }

  /** 제작자의 다른 폰트 */
  getRecommend(fontId: number) {
    return apiClient.get<FontDetailResponse[]>(`/fonts/${fontId}/others`)
  }

  /** 제작 중인 폰트 목록 */
  getInProgress() {
    return apiClient.get<InProgressFontResponse[]>('/fonts/progress')
  }

  /** 제작 완료된 폰트 목록 */
  getCompleted(page: number) {
    return apiClient.get<CompletedFontResponse>('/fonts/members', { params: { page: page - 1 } })
  }

  /** 북마크한 폰트 목록 */
  getBookmark({ page, keyword }: FontBookmarkOptions) {
    return apiClient.get<FontListResponse>('/bookmarks', {
      params: { page: page - 1, size: 8, keyword },
    })
  }
}

export const fontService = new FontService()
