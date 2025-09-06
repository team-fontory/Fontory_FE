import { apiClient } from '@/shared/api/apiClient'

import type {
  CompletedFontResponse,
  FontBookmarkOptionsType,
  FontDetailResponse,
  FontDownloadResponse,
  FontListItem,
  FontListResponse,
  FontOptionsType,
  InProgressFontResponse,
} from '../types/font.type'

class FontService {
  /** 둘러보기 폰트 목록 */
  getExplore({ page, sortBy, keyword }: FontOptionsType) {
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
  getPopular(): Promise<FontListItem[]> {
    return apiClient.get<FontListItem[]>('/fonts/popular')
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
  getBookmark({ page, keyword }: FontBookmarkOptionsType) {
    return apiClient.get<FontListResponse>('/bookmarks', {
      params: { page: page - 1, size: 8, keyword },
    })
  }
}

export const fontService = new FontService()
