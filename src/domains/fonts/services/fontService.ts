import { apiClient } from '@/shared/api/apiClient'

import type {
  FontDetailResponse,
  FontDownloadResponse,
  FontExploreFilter,
  FontExploreResponse,
  FontListItem,
} from '../types/font.type'

class FontService {
  /** 둘러보기 폰트 목록 */
  getExplore({ page, sortBy, keyword }: FontExploreFilter) {
    return apiClient.get<FontExploreResponse>('/fonts', {
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
}

export const fontService = new FontService()
