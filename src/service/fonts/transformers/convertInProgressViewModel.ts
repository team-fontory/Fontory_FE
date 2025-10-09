import {
  PROGRESS_STATUS,
  type ProgressStatusKeyType,
} from '@/shared/constants/progress.constant'
import type {
  InProgressFontListResponse,
  InProgressFontResponse,
} from '@/store/queries/fontApi.type'

import type { InProgressFontListModel } from '../types/fontModel.type'

/** 제작 중인 폰트 데이터 (API 응답) -> 폰트 아이템 뷰모델 변환 */
const convertInProgressViewModel = (font: InProgressFontResponse) => {
  const statusText = PROGRESS_STATUS[font.status as ProgressStatusKeyType]
  const formattedCreatedAt = new Date(font.createdAt).toLocaleDateString(
    'ko-KR',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  )

  return {
    id: font.id,
    name: font.name,
    createdAt: font.createdAt,
    formattedCreatedAt,
    status: font.status,
    statusText,
  }
}

/** 제작 중인 폰트 리스트 (API 응답 배열) -> 폰트 리스트 뷰모델 배열 변환 */
export const convertInProgressListViewModel = (
  fontList: InProgressFontListResponse,
): InProgressFontListModel => {
  return {
    fontList: fontList.map(convertInProgressViewModel),
    count: fontList.length,
  }
}
