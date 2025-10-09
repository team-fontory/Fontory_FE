import {
  isNetworkError,
  isNotFoundError,
  NetworkError,
} from '@/shared/apis/api.error'
import { useProgressFontListQuery } from '@/store/queries/font.query'

import { FontListLoadError, FontNotFoundError } from '../errors/font.error'
import { convertInProgressListViewModel } from '../transformers/convertInProgressViewModel'
import type {
  InProgressFontListModel,
  InProgressFontModel,
} from '../types/fontModel.type'

/**
 * API 에러를 도메인 에러로 변환하여 throw
 * @param error - React Query에서 발생한 에러
 * @throws {FontNotFoundError} 404 에러인 경우
 * @throws {NetworkError} 네트워크 에러인 경우
 * @throws {FontListLoadError} 기타 서버 에러인 경우
 */
const handleErrorAndThrow = (error: Error | null) => {
  if (isNotFoundError(error)) {
    throw new FontNotFoundError()
  }
  if (isNetworkError(error)) {
    throw new NetworkError()
  }
  throw new FontListLoadError()
}

/** 제작 중인 폰트를 조회하고 뷰모델로 변환 */
export const useProgressFontListViewModel = (): InProgressFontListModel => {
  const { data: progressFontData, isError, error } = useProgressFontListQuery()

  if (isError) {
    handleErrorAndThrow(error)
  }

  if (!progressFontData?.length) {
    return { fontList: [] as InProgressFontModel[], count: 0 }
  }

  return convertInProgressListViewModel(progressFontData)
}
