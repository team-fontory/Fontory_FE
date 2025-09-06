import type z from 'zod'

import type { signupSchema } from '../constants/userConfig'

export type Gender = 'MALE' | 'FEMALE'
export type SignupFormType = z.infer<typeof signupSchema>
export type SignupRequest = {
  nickname: string
  birth: string
  gender: Gender
}
