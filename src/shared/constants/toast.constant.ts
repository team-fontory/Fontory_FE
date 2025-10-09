/** toastify에 보여질 메시지 객체로 관리 */
export const TOAST_MESSAGES = {
  editProfile: {
    success: '프로필 변경에 성공했습니다.',
    error: '프로필 변경에 실패하였습니다.',
  },
  validateNickname: {
    success: '사용 가능한 닉네임입니다.',
    duplicated: '이미 사용 중인 닉네임입니다.',
    error: '닉네임 중복 검사에 실패했습니다. 다시 시도해주세요.',
  },
  validateFontName: {
    success: '사용 가능한 폰트 이름입니다.',
    duplicated: '이미 사용 중인 폰트 이름입니다.',
    error: '폰트 이름 중복 검사에 실패했습니다. 다시 시도해주세요.',
  },
  signup: {
    success: '회원가입에 성공했습니다.',
    error: '회원가입에 실패하였습니다.',
  },
  downloadFont: {
    success: '폰트가 다운로드되었습니다.',
    error: '폰트 다운로드에 실패했습니다.',
  },
  addBookmark: {
    success: '북마크에 추가되었습니다.',
    error: '북마크 추가에 실패했습니다.',
  },
  removeBookmark: {
    success: '북마크에서 삭제되었습니다.',
    error: '북마크 삭제에 실패했습니다.',
  },
  createFont: {
    success: '폰트 생성 요청에 성공했습니다.',
    error: '폰트 생성 요청에 실패하였습니다.',
  },
} as const
