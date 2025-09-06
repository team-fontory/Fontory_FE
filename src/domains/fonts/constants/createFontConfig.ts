import { z } from 'zod'

import { createFilterInputHandler, createPhoneInputHandler } from '../utils/filterInput'

export const createFontAttribute = {
  file: {
    section: 'file',
  },
  name: {
    section: 'name',
    label: '폰트 한글 이름',
    placeholder: '최대 9글자까지 입력 가능',
    onInput: createFilterInputHandler(9),
  },
  engName: {
    section: 'engName',
    label: '폰트 영어 이름',
    placeholder: '최대 12글자까지 입력 가능',
    onInput: createFilterInputHandler(12, 'english'),
  },
  example: {
    section: 'example',
    label: '예시 문구',
    placeholder: '최소 10글자, 최대 50글자까지 입력 가능',
    onInput: createFilterInputHandler(50),
  },

  phoneNumber: {
    section: 'phoneNumber',
    label: '전화번호',
    placeholder: '"-"를 제외한 숫자만 입력 가능',
    onInput: createPhoneInputHandler(),
  },
}

export const createFontSchema = z.object({
  file: z
    .custom<File | null>((val) => val === null || val instanceof File, '파일을 업로드해주세요.')
    .refine((file) => file !== null && file.size > 0, '파일을 업로드해주세요.'),
  name: z
    .string()
    .min(1, { message: '폰트 이름을 입력해주세요.' })
    .max(9, { message: '9글자까지 입력 가능합니다.' }),
  engName: z
    .string()
    .min(1, { message: '폰트 영어 이름을 입력해주세요.' })
    .max(12, { message: '12글자까지 입력 가능합니다.' }),
  example: z
    .string()
    .min(10, { message: '10글자 이상 작성해주세요.' })
    .max(50, { message: '50글자까지 입력 가능합니다.' }),
  phoneNumber: z.string(),
})

export const createFontDefaultValues = {
  file: null,
  name: '',
  engName: '',
  example: '',
  phoneNumber: '',
}
