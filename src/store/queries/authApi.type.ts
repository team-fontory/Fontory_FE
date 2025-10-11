/** 닉네임 중복 검사 요청 */
export type NicknameDuplicateRequest = {
  nickname: string
}

/** 닉네임 중복 검사 응답 */
export type NicknameDuplicateResponse = boolean

/** 프로필 조회 응답 */
export type UserProfileResponse = {
  nickname: string
  birth: string
  gender: string
}
