/**
 * @deprecated 이 파일은 레거시입니다. 대신 './types/index' 를 사용하세요.
 *
 * 새로운 구조:
 * - './types/domain.types' - 기본 도메인 타입들
 * - './types/api.types' - API 응답 타입들
 * - './types/view.types' - 뷰 모델 타입들
 * - './types/filter.types' - 필터/옵션 타입들
 * - './types/form.types' - 폼 관련 타입들
 * - './types/index' - 모든 타입을 한 곳에서 import
 */

// 하위 호환성을 위해 기존 타입들을 re-export
export * from './index'
