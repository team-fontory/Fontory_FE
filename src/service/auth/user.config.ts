import { z } from 'zod'

import type { GenderModel } from './authModel.type'

/**  폼 필드 설정 */
export const USER_FIELDS = {
  nickname: {
    name: 'nickname',
    label: '닉네임',
    placeholder: '2-10글자, 한글/영문/숫자 사용 가능',
    minLength: 2,
    maxLength: 10,
  },
  birth: {
    name: 'birth',
    label: '생년v월일',
    placeholder: 'YYYY-MM-DD',
  },
  gender: {
    name: 'gender',
    label: '성별',
    options: [
      { value: 'MALE' as const, label: '남성' },
      { value: 'FEMALE' as const, label: '여성' },
    ],
  },
} as const

/** 기본 사용자 정보 스키마 */
const BaseUserSchema = z.object({
  nickname: z
    .string()
    .min(2, '닉네임은 2자 이상이어야 합니다')
    .max(10, '닉네임은 10자 이하여야 합니다')
    .regex(
      /^[가-힣a-zA-Z0-9_-]+$/,
      '닉네임은 한글, 영문, 숫자만 사용 가능합니다',
    ),
  nicknameVerified: z
    .boolean()
    .refine((val) => val, '닉네임 중복 확인을 해주세요'),
  birth: z.string().min(1, '생년월일을 입력해주세요'),
  gender: z.enum(['MALE', 'FEMALE'], {
    errorMap: () => ({ message: '성별을 선택해주세요' }),
  }),
})

/** 회원가입 폼 스키마 */
export const SignupFormSchema = BaseUserSchema.extend({
  serviceTerms: z
    .boolean()
    .refine((val) => val, '서비스 이용약관에 동의해주세요'),
  privacyTerms: z
    .boolean()
    .refine((val) => val, '개인정보처리방침에 동의해주세요'),
  fontTerms: z.boolean().refine((val) => val, '폰트 공유약관에 동의해주세요'),
})

/** 회원가입 기본값  */
export const signupDefaultValues: SignupFormData = {
  nickname: '',
  nicknameVerified: false,
  birth: '',
  gender: undefined as unknown as GenderModel,
  serviceTerms: false,
  privacyTerms: false,
  fontTerms: false,
}

export type SignupFormData = z.infer<typeof SignupFormSchema>
export type SignupRequest = Pick<
  SignupFormData,
  'nickname' | 'birth' | 'gender'
>

/** 프로필 수정 폼 스키마  */
export const EditProfileFormSchema = BaseUserSchema

/** 프로필 수정 기본값  */
export const editProfileDefaultValues: EditProfileFormData = {
  nickname: '',
  nicknameVerified: false,
  birth: '',
  gender: undefined as unknown as GenderModel,
}

export type EditProfileFormData = z.infer<typeof EditProfileFormSchema>
export type EditProfileRequest = Pick<EditProfileFormData, 'nickname'>
