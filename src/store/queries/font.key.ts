import type {
  BookmarkFontListRequest,
  CompletedFontListRequest,
  ExploreFontListRequest,
  FontDetailRequest,
  FontDownloadUrlRequest,
  FontNameDuplicateRequest,
  RecommendListRequest,
  RemoveFontRequest,
} from './fontApi.type'

/** 폰트 쿼리 키 팩토리 */
export const fontQueryKeys = {
  all: () => ['font'] as const,

  // 폰트 이름 중복 검사
  fontNameCheck: (params: FontNameDuplicateRequest) =>
    [...fontQueryKeys.all(), 'font-name-check', params.fontName] as const,

  // 둘러보기
  explores: () => [...fontQueryKeys.all(), 'explore'] as const,
  explore: (params: ExploreFontListRequest) =>
    [
      ...fontQueryKeys.explores(),
      params.page,
      params.sortBy,
      params.keyword ?? null,
    ] as const,
  popular: () => [...fontQueryKeys.explores(), 'popular'] as const,

  // 북마크한 폰트
  bookmark: (params: BookmarkFontListRequest) =>
    [...fontQueryKeys.all(), 'bookmark', params.page, params.keyword] as const,

  // 다운로드
  download: (params: FontDownloadUrlRequest) =>
    [...fontQueryKeys.all(), 'download', params.fontId] as const,

  // 폰트 제거
  removeFont: (params: RemoveFontRequest) =>
    [...fontQueryKeys.all(), 'delete', params.fontId] as const,

  // 상세페이지
  details: () => [...fontQueryKeys.all(), 'detail'] as const,
  detail: (params: FontDetailRequest) =>
    [...fontQueryKeys.details(), params.fontId] as const,
  recommend: (params: RecommendListRequest) =>
    [...fontQueryKeys.details(), 'recommend', params.fontId] as const,

  // 내가 제작한 폰트
  progressAll: () => [...fontQueryKeys.all(), 'progress'] as const,
  inProgress: () => [...fontQueryKeys.progressAll(), 'in-progress'] as const,
  complete: (params: CompletedFontListRequest) =>
    [...fontQueryKeys.progressAll(), 'complete', params.page] as const,
} as const

/** 쿼리 무효화를 위한 헬퍼 함수 */
export const fontQueryInvalidator = {
  invalidateAll: () => ({ queryKey: fontQueryKeys.all() }),
  invalidateFont: (fontId: number) => ({
    predicate: (query: { queryKey: readonly unknown[] }) =>
      query.queryKey.includes(fontId),
  }),
  invalidateExplores: () => ({ queryKey: fontQueryKeys.explores() }),
  invalidateDetails: () => ({ queryKey: fontQueryKeys.details() }),
  invalidateMyFonts: () => ({ queryKey: fontQueryKeys.progressAll() }),
} as const

// 쿼리 키 타입 추론을 위한 유틸리티 타입
export type FontQueryKeys = typeof fontQueryKeys
export type FontQueryKey = ReturnType<FontQueryKeys[keyof FontQueryKeys]>
