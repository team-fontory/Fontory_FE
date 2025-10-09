import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import { Layout } from '@/presentation/components/shared/Layout'

import { ROUTES } from './routes.constant'

// 페이지 컴포넌트 Lazy Loading
const LandingPage = lazy(() => import('@/presentation/landing/LandingPage'))
const FontExplorePage = lazy(
  () => import('@/presentation/font-explore/FontExplorePage'),
)
const FontDetailPage = lazy(
  () => import('@/presentation/font-detail/FontDetailPage'),
)
const CreateFontPage = lazy(
  () => import('@/presentation/font-create/CreateFontPage'),
)
const SynthesizeFontPage = lazy(
  () => import('@/presentation/font-synthesize/SynthesizeFontPage'),
)
const FontProgressPage = lazy(
  () => import('@/presentation/font-progress/FontProgressPage'),
)
const LoginPage = lazy(() => import('@/presentation/auth-login/LoginPage'))
const SignupPage = lazy(() => import('@/presentation/auth-signup/SignupPage'))
const BookmarkPage = lazy(
  () => import('@/presentation/font-bookmark/BookmarkPage'),
)
const EditProfilePage = lazy(
  () => import('@/presentation/auth-edit/EditProfilePage'),
)

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
        path: ROUTES.FONT.SYNTHESIZE,
        element: <SynthesizeFontPage />,
      },
      {
        path: ROUTES.MYPAGE.MY_FONT,
        element: <FontProgressPage />,
      },
      {
        path: ROUTES.AUTH.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.AUTH.SIGN_UP,
        element: <SignupPage />,
      },
      {
        path: ROUTES.MYPAGE.ACCOUNT,
        element: <EditProfilePage />,
      },
      {
        path: ROUTES.MYPAGE.BOOKMARK,
        element: <BookmarkPage />,
      },
    ],
  },
]
