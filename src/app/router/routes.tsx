import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

import { ROUTES } from './routes.constant'

// 페이지 컴포넌트 Lazy Loading
const LandingPage = lazy(() => import('@/landing/LandingPage'))

/** 애플리케이션 라우트 설정 */
export const routes: RouteObject[] = [
  // 홈
  {
    path: ROUTES.HOME,
    element: <LandingPage />,
  },
]
