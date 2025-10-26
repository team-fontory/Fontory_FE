import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

import { PageLoader } from '@/presentation/_components/shared/PageLoader'
import { useAuthStatusQuery } from '@/store/queries/auth.query'

import { ROUTES } from './routes.constant'

/** 로그인된 사용자가 접근할 수 없는 라우트를 보호하는 컴포넌트 */
export const PublicOnlyRoute = ({ children }: PropsWithChildren) => {
  const { data: user, isLoading } = useAuthStatusQuery()

  if (isLoading) return <PageLoader />
  if (user) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  return <>{children}</>
}