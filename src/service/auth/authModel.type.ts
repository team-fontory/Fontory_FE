/** 성별 타입 */
export type GenderModel = 'MALE' | 'FEMALE'

/** 사용자 프로필 타입 */
export type UserProfileModel = {
  nickname: string
  birth: string
  gender: GenderModel
}
