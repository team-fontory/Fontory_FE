import { MAIN_QUERY_KEY } from '@/shared/api/globalQueryKey'

import type { FontExploreFilter } from '../types/font.type'

/** 폰트 쿼리 키 팩토리 */
export const fontQueryKeys = {
  all: () => [...MAIN_QUERY_KEY, 'font'] as const,

  // 둘러보기
  explores: () => [...fontQueryKeys.all(), 'explore'] as const,
  explore: (filter: FontExploreFilter) =>
    [...fontQueryKeys.explores(), filter.page, filter.sortBy, filter.keyword ?? null] as const,
  popular: () => [...fontQueryKeys.explores(), 'popular'] as const,

  // 다운로드
  download: (fontId: number) => [...fontQueryKeys.all(), 'download', fontId] as const,

  // 상세페이지
  details: () => [...fontQueryKeys.all(), 'detail'] as const,
  detail: (fontId: number) => [...fontQueryKeys.details(), fontId] as const,
  recommend: (fontId: number) => [...fontQueryKeys.details(), 'recommend', fontId] as const,

  // 내가 제작한 폰트
  progressAll: () => [...fontQueryKeys.all(), 'progress'] as const,
  inProgress: () => [...fontQueryKeys.progressAll(), 'in-progress'] as const,
  complete: (page: number) => [...fontQueryKeys.progressAll(), 'complete', page] as const,
} as const

/** 쿼리 무효화를 위한 헬퍼 함수 */
export const fontQueryInvalidators = {
  invalidateAll: () => ({ queryKey: fontQueryKeys.all() }),
  invalidateFont: (fontId: number) => ({
    predicate: (query: { queryKey: readonly unknown[] }) => query.queryKey.includes(fontId),
  }),
  invalidateExplores: () => ({ queryKey: fontQueryKeys.explores() }),
  invalidateDetails: () => ({ queryKey: fontQueryKeys.details() }),
  invalidateMyFonts: () => ({ queryKey: fontQueryKeys.progressAll() }),
} as const

// 쿼리 키 타입 추론을 위한 유틸리티 타입
export type FontQueryKeys = typeof fontQueryKeys
export type FontQueryKey = ReturnType<FontQueryKeys[keyof FontQueryKeys]>
