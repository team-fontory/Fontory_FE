import { isNetworkError, NetworkError } from '@/shared/apis/api.error'
import { useFontDetailQuery } from '@/store/queries/font.query'

import { convertFontItemViewModel } from '../convertToFontViewModel'
import { FontNotFoundError } from '../font.error'
import type { FontItemModel } from '../fontModel.type'

/**
 * API 에러를 도메인 에러로 변환하여 throw
 * @param error - React Query에서 발생한 에러
 * @throws {NetworkError} 네트워크 에러인 경우
 * @throws {FontNotFoundError} 기타 서버 에러인 경우
 */
const handleErrorAndThrow = (error: Error | null) => {
  if (isNetworkError(error)) {
    throw new NetworkError()
  }
  throw new FontNotFoundError()
}

/** fontId가 유효하지 않은지 검사 */
const isInvalidFontId = (fontId: number) => {
  const isInvalid = !fontId || isNaN(fontId) || fontId <= 0
  return isInvalid
}

/** 폰트 상세 정보를 조회하고 ViewModel로 변환 */
export const useFontDetailViewModel = (fontId: number): FontItemModel => {
  if (isInvalidFontId(fontId)) {
    throw new FontNotFoundError()
  }

  const {
    data: fontDetailData,
    isError,
    error,
  } = useFontDetailQuery({ fontId })

  if (isError) {
    handleErrorAndThrow(error)
  }

  if (!fontDetailData) {
    throw new FontNotFoundError()
  }

  return convertFontItemViewModel(fontDetailData)
}
