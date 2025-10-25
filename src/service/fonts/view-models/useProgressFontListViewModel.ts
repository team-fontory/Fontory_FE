import {
  isNetworkError,
  isNotFoundError,
  NetworkError,
} from '@/shared/apis/api.error'
import { useProgressFontListQuery } from '@/store/queries/font.query'

import { PROGRESS_STATUS_KEYS } from '../constants/progress.constant'
import { convertInProgressListViewModel } from '../convertToFontViewModel'
import { FontListLoadError, FontNotFoundError } from '../font.error'
import type { InProgressFontListModel } from '../fontModel.type'

/** 에러 타입에 따라 적절한 커스텀 에러를 throw하는 함수 */
const handleError = (error: unknown) => {
  if (isNotFoundError(error)) throw new FontNotFoundError()
  if (isNetworkError(error)) throw new NetworkError()
  throw new FontListLoadError('제작 중인 폰트 목록을 불러오지 못했습니다.')
}

/** 제작 중인 폰트를 조회하고 뷰모델로 변환 */
export const useProgressFontListViewModel = () => {
  const {
    data: progressFontData,
    isLoading,
    isError,
    error,
  } = useProgressFontListQuery()
  const emptyList = [] as InProgressFontListModel

  if (isLoading) return { isLoading, fontList: emptyList }
  if (isError) handleError(error)
  if (!progressFontData?.length) {
    return { isLoading, fontList: emptyList }
  }

  const progressFontList = progressFontData.filter(
    (font) => font.status === PROGRESS_STATUS_KEYS.progress,
  )

  return {
    isLoading: false,
    fontList: convertInProgressListViewModel(progressFontList),
  }
}
