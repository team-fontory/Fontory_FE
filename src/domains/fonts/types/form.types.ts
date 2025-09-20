import type z from 'zod'

import type { createFontSchema } from '../constants/createFontConfig'

/** 폰트 생성 폼 데이터 */
export type CreateFontFormData = z.input<typeof createFontSchema>
