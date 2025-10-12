import { useEffect } from 'react'

import {
  isNetworkError,
  isNotFoundError,
  NetworkError,
  UnknownError,
} from '@/shared/apis/api.error'
import { useFontDetailQuery } from '@/store/queries/font.query'
import { useFontItemActions } from '@/store/states/fontItem.store'

import { convertFontItemViewModel } from '../convertToFontViewModel'
import { FontNotFoundError } from '../font.error'

/** fontId가 유효하지 않은지 검사 */
const isInvalidFontId = (fontId: number) => {
  const isInvalid = !fontId || isNaN(fontId) || fontId <= 0
  return isInvalid
}

/** 에러 타입에 따라 적절한 커스텀 에러를 throw하는 함수 */
const handleError = (error: unknown) => {
  if (isNotFoundError(error)) throw new FontNotFoundError()
  if (isNetworkError(error)) throw new NetworkError()
  throw new UnknownError()
}

/** 폰트 상세 정보를 조회하고 ViewModel로 변환 */
export const useFontDetailViewModel = (fontId: number) => {
  if (isInvalidFontId(fontId)) throw new FontNotFoundError()

  const {
    data: fontData,
    isLoading,
    isError,
    error,
  } = useFontDetailQuery({ fontId })
  const { setFontItem, clearFontItem } = useFontItemActions()

  useEffect(() => {
    clearFontItem()
  }, [fontId, clearFontItem])

  useEffect(() => {
    if (fontData) {
      const viewModel = convertFontItemViewModel(fontData)
      setFontItem(viewModel)
    }
  }, [fontData, setFontItem])

  if (isLoading) return { isLoading: true }
  if (isError) return handleError(error)
  if (!fontData) throw new FontNotFoundError()

  return {
    isLoading: false,
    fontData,
  }
}
