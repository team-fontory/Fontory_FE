import type { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { PageLoader } from '@/presentation/_components/shared/PageLoader'
import { useUserProfile } from '@/store/queries/auth.query'

import { ROUTES } from './routes.constant'

/** 로그인이 필요한 라우트를 보호하는 컴포넌트 */
export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const location = useLocation()
  const { data: user, isLoading, isError } = useUserProfile()

  if (isLoading) return <PageLoader />
  if (isError || !user) {
    return (
      <Navigate to={ROUTES.AUTH.LOGIN} state={{ from: location }} replace />
    )
  }

  return <>{children}</>
}
