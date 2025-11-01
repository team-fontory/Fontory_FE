/** toastify에 보여질 메시지 객체로 관리 */
export const TOAST_MESSAGES = {
  editProfile: {
    success: '프로필 변경에 성공했습니다.',
    error: '프로필 변경에 실패하였습니다.',
  },
  validateNickname: {
    success: '사용 가능한 닉네임입니다.',
    duplicated: '이미 사용 중인 닉네임입니다.',
    length: '닉네임을 두글자 이상 입력해주세요.',
    error: '닉네임 중복 검사에 실패했습니다. 다시 시도해주세요.',
  },
  validateFontName: {
    success: '사용 가능한 폰트 이름입니다.',
    duplicated: '이미 사용 중인 폰트 이름입니다.',
    length: '폰트 이름을 입력해주세요.',
    error: '폰트 이름 중복 검사에 실패했습니다. 다시 시도해주세요.',
  },
  signup: {
    success: '회원가입에 성공했습니다.',
    error: '회원가입에 실패하였습니다.',
  },
  logout: {
    success: '로그아웃에 성공했습니다.',
    error: '로그아웃에 실패하였습니다.',
  },
  deleteUser: {
    success: '회원 탈퇴에 성공했습니다.',
    error: '회원 탈퇴에 실패하였습니다.',
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
  removeFont: {
    success: '폰트가 삭제되었습니다.',
    error: '폰트 삭제에 실패했습니다.',
  },
  error: {
    network: '네트워크 연결을 확인해주세요.',
    badRequest: '요청 형식이 잘못되었습니다.',
    authentication: '로그인이 필요합니다.',
    authorization: '접근 권한이 없습니다.',
    server: '서버에 오류가 발생했습니다.',
    default: '알 수 없는 오류가 발생했습니다.',
  },
} as const
