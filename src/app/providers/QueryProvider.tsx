import { useRef } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AxiosError } from 'axios'
import type { PropsWithChildren } from 'react'

/** React Query 설정 상수 */
const QUERY_CONFIG = {
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
  maxRetries: 2,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
} as const

/** 에러 상태 코드별 처리 로직 */
const shouldRetry = (failureCount: number, error: unknown): boolean => {
  const axiosError = error as AxiosError
  const status = axiosError?.response?.status

  // 클라이언트 에러
  if (status && status >= 400 && status < 500) {
    return false
  }

  // 서버 에러 (5xx)나 네트워크 에러
  return failureCount < QUERY_CONFIG.maxRetries
}

/** React Query 클라이언트 생성 함수 */
const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
        staleTime: QUERY_CONFIG.staleTime,
        gcTime: QUERY_CONFIG.gcTime,
        retry: shouldRetry,
        retryDelay: QUERY_CONFIG.retryDelay,
      },
      mutations: {
        retry: false,
        onError: (error) => {
          console.error('Mutation error:', error)
        },
      },
    },
  })
}

/** React Query Provider 컴포넌트 */
export const QueryProvider = ({ children }: PropsWithChildren) => {
  // 리렌더링 시에도 동일한 인스턴스 유지
  const queryClientRef = useRef<QueryClient | null>(null)

  if (!queryClientRef.current) {
    queryClientRef.current = createQueryClient()
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      {children}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}

/** QueryClient 인스턴스에 접근하기 위한 타입 헬퍼 */
export type { QueryClient } from '@tanstack/react-query'
