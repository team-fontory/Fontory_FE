/** 애플리케이션 라우트 경로 상수 */
export const ROUTES = {
  // 기본 경로
  HOME: '/',
  NOT_FOUND: '/404',

  // 인증 관련
  AUTH: {
    LOGIN: '/login',
    SIGN_UP: '/signup',
  },

  // 폰트 관련
  FONT: {
    EXPLORE: '/explore',
    CREATE: '/create-font',
    DETAIL: '/fonts/:id',
    EDIT: '/fonts/:id/edit',
  },

  // 마이페이지
  MYPAGE: {
    ROOT: '/mypage',
    ACCOUNT: '/mypage/account-info/edit',
    MY_FONT: '/mypage/my-font',
    BOOKMARK: '/mypage/bookmark',
  },
} as const

/** 동적 라우트 생성 헬퍼 함수들 */
export const createRoute = {
  fontDetail: (id: string | number) => `/fonts/${id}`,
  fontEdit: (id: string | number) => `/fonts/${id}/edit`,
} as const

/** 라우트 타입 정의 */
export type RouteKeys = keyof typeof ROUTES
export type AuthRouteKeys = keyof typeof ROUTES.AUTH
export type FontRouteKeys = keyof typeof ROUTES.FONT
export type MypageRouteKeys = keyof typeof ROUTES.MYPAGE
