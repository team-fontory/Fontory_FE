import { apiClient } from '@/shared/api/apiClient'

import type { FontExploreFilter, FontExploreResponse, FontListItem } from '../types/font.type'

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
}

export const fontService = new FontService()
