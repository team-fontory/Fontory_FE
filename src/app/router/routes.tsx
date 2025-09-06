import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import { Layout } from '@/shared/components/Layout'

import { ROUTES } from './routes.constant'

// 페이지 컴포넌트 Lazy Loading
const LandingPage = lazy(() => import('@/landing/LandingPage'))
const FontExplorePage = lazy(() => import('@/domains/fonts/pages/FontExplorePage'))
const FontDetailPage = lazy(() => import('@/domains/fonts/pages/FontDetailPage'))
const CreateFontPage = lazy(() => import('@/domains/fonts/pages/CreateFontPage'))
const MyFontPage = lazy(() => import('@/domains/fonts/pages/MyFontPage'))
const LoginPage = lazy(() => import('@/domains/auth/pages/LoginPage'))

/** 애플리케이션 라우트 설정 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: ROUTES.HOME,
        element: <LandingPage />,
      },
      {
        path: ROUTES.FONT.EXPLORE,
        element: <FontExplorePage />,
      },
      {
        path: ROUTES.FONT.DETAIL,
        element: <FontDetailPage />,
      },
      {
        path: ROUTES.FONT.CREATE,
        element: <CreateFontPage />,
      },
      {
        path: ROUTES.MYPAGE.MY_FONT,
        element: <MyFontPage />,
      },
      {
        path: ROUTES.AUTH.LOGIN,
        element: <LoginPage />,
      },
    ],
  },
]
