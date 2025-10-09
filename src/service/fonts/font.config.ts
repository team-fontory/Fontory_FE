import { z } from 'zod'

/**  폼 필드 설정 */
export const FONT_FIELDS = {
  file: {
    name: 'file',
  },
  name: {
    name: 'name',
    label: '폰트 한글 이름',
    placeholder: '최대 9글자까지 입력 가능',
    minLength: 1,
    maxLength: 9,
  },
  engName: {
    name: 'engName',
    label: '폰트 영어 이름',
    placeholder: '최대 12글자까지 입력 가능',
    minLength: 1,
    maxLength: 12,
  },
  example: {
    name: 'example',
    label: '예시 문구',
    placeholder: '최소 10글자, 최대 50글자까지 입력 가능',
    minLength: 10,
    maxLength: 50,
  },
  phoneNumber: {
    name: 'phoneNumber',
    label: '전화번호',
    placeholder: '"-"를 제외한 숫자만 입력 가능',
  },
} as const

const BaseFontSchema = z.object({
  file: z
    .custom<File | null>((val) => val === null || val instanceof File, '파일을 업로드해주세요.')
    .refine((file) => file !== null && file.size > 0, '파일을 업로드해주세요.'),
  name: z
    .string()
    .min(1, { message: '폰트 이름을 입력해주세요.' })
    .max(9, { message: '9글자까지 입력 가능합니다.' }),
  fontNameVerified: z.boolean().refine((val) => val, '폰트 이름 중복 확인을 해주세요'),
  engName: z
    .string()
    .min(1, { message: '폰트 영어 이름을 입력해주세요.' })
    .max(12, { message: '12글자까지 입력 가능합니다.' }),
  example: z
    .string()
    .min(10, { message: '10글자 이상 작성해주세요.' })
    .max(50, { message: '50글자까지 입력 가능합니다.' }),
  phoneNumber: z.string().optional(),
})

export const CreateFontSchema = BaseFontSchema
export type CreateFontFormData = z.infer<typeof CreateFontSchema>
export type CreateFontRequest = Omit<CreateFontFormData, 'fontNameVerified'>

export const createFontDefaultValues: CreateFontFormData = {
  file: null,
  name: '',
  fontNameVerified: false,
  engName: '',
  example: '',
  phoneNumber: '',
}
