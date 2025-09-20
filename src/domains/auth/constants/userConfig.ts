import type { FormEvent } from 'react'
import { z } from 'zod'

import { formatDateInput } from '@/domains/fonts/utils/textInputUtils'

import type { Gender } from '../types/auth.type'

export const signupAttribute = {
  nickname: {
    section: 'nickname',
    label: '닉네임',
    placeholder: '2-10글자, 한글/영문/숫자 사용 가능',
    minLength: 2,
    maxLength: 10,
  },
  birth: {
    section: 'birth',
    label: '생년월일',
    onInput: (e: FormEvent<HTMLInputElement>) => {
      const input = e.currentTarget
      input.value = formatDateInput(input.value)
    },
  },
  gender: {
    section: 'gender',
    label: '성별',
    options: [
      { value: 'MALE', label: '남성' },
      { value: 'FEMALE', label: '여성' },
    ],
  },
  termsOfService: {
    section: 'termsOfService',
  },
}

export const signupSchema = z.object({
  nickname: z
    .string()
    .min(2, '닉네임은 2자 이상이어야 합니다')
    .max(10, '닉네임은 10자 이하여야 합니다')
    .regex(/^[가-힣a-zA-Z0-9_-]+$/, '닉네임은 한글, 영문, 숫자만 사용 가능합니다'),
  birth: z.string().min(1, '생년월일을 입력해주세요'),
  gender: z.enum(['MALE', 'FEMALE'], {
    errorMap: () => ({ message: '성별을 선택해주세요' }),
  }),
  serviceTerms: z.boolean().refine((val) => val, '서비스 이용약관에 동의해주세요'),
  privacyTerms: z.boolean().refine((val) => val, '개인정보처리방침에 동의해주세요'),
  fontTerms: z.boolean().refine((val) => val, '폰트 공유약관에 동의해주세요'),
})

export const signupDefaultValues = {
  nickname: '',
  birth: '',
  gender: undefined as unknown as Gender,
  serviceTerms: false,
  privacyTerms: false,
  fontTerms: false,
}

export const editProfileAttribute = {
  nickname: {
    section: 'nickname',
    label: '닉네임',
    placeholder: '2-10글자, 한글/영문/숫자 사용 가능',
    minLength: 2,
    maxLength: 10,
  },
  birth: {
    section: 'birth',
    label: '생년월일',
    onInput: (e: FormEvent<HTMLInputElement>) => {
      const input = e.currentTarget
      input.value = formatDateInput(input.value)
    },
  },
  gender: {
    section: 'gender',
    label: '성별',
    options: [
      { value: 'MALE', label: '남성' },
      { value: 'FEMALE', label: '여성' },
    ],
  },
}

export const editProfileSchema = z.object({
  nickname: z
    .string()
    .min(2, '닉네임은 2자 이상이어야 합니다')
    .max(10, '닉네임은 10자 이하여야 합니다')
    .regex(/^[가-힣a-zA-Z0-9_-]+$/, '닉네임은 한글, 영문, 숫자만 사용 가능합니다'),
  birth: z.string().min(1, '생년월일을 입력해주세요'),
  gender: z.enum(['MALE', 'FEMALE'], {
    errorMap: () => ({ message: '성별을 선택해주세요' }),
  }),
})
