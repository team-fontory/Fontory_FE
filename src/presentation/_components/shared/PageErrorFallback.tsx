import { useEffect } from 'react'
import type { FallbackProps } from 'react-error-boundary'
import { Link, type To } from 'react-router-dom'
import { toast } from 'react-toastify'

/** 에러 바운더리 내 에러 발생 시 호출되는 대체 UI 컴포넌트 */
export const PageErrorFallback = ({ error }: FallbackProps) => {
  toast.error(error.message)
  useEffect(() => window.scrollTo(0, 0), [])

  return (
    <div className='flex-center my-20 h-full flex-col p-4'>
      <h2 className='text-red mb-4 text-2xl font-bold'>문제가 발생했습니다</h2>
      <p className='mb-4 text-gray-600'>{error.message}</p>
      <Link
        to={-1 as To}
        className='bg-primary hover:bg-primary-dark rounded px-4 py-2 text-white'
        replace
      >
        뒤로가기
      </Link>
    </div>
  )
}
