import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { routes } from './routes'

// 로딩 컴포넌트
const PageLoader = () => (
  <div className='flex min-h-screen items-center justify-center'>
    <div className='border-primary h-32 w-32 animate-spin rounded-full border-b-2'></div>
  </div>
)

// 에러 폴백 컴포넌트
const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error
  resetErrorBoundary: () => void
}) => (
  <div className='flex min-h-screen flex-col items-center justify-center p-4'>
    <h2 className='text-red mb-4 text-2xl font-bold'>문제가 발생했습니다</h2>
    <p className='mb-4 text-gray-600'>{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className='bg-primary hover:bg-primary-dark rounded px-4 py-2 text-white'
    >
      다시 시도
    </button>
  </div>
)

/**
 * 애플리케이션 메인 라우터 컴포넌트
 * - React Router v6의 createBrowserRouter 사용
 * - Lazy Loading을 위한 Suspense 적용
 * - 전역 에러 바운더리 적용
 */
export const AppRouter = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={createBrowserRouter(routes)} />
      </Suspense>
    </ErrorBoundary>
  )
}
