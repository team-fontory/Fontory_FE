import type z from 'zod'

import type { editProfileSchema, signupSchema } from '../constants/userConfig'

export type Gender = 'MALE' | 'FEMALE'

export type UserProfile = {
  nickname: string
  birth: string
  gender: Gender
}

export type SignupFormType = z.infer<typeof signupSchema>
export type SignupRequest = UserProfile

export type EditProfileType = z.infer<typeof editProfileSchema>
