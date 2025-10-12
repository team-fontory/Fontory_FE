import { useEffect } from 'react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { Link, type To } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ExploreFontSection } from './components/ExploreFontSection'
import { PopularFontSection } from './components/PopularFontSection'

/** 에러 바운더리 내 에러 발생 시 호출되는 대체 UI 컴포넌트 */
const FontDetailErrorBoundary = ({ error }: FallbackProps) => {
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

const FontExplorePage = () => {
  return (
    <ErrorBoundary FallbackComponent={FontDetailErrorBoundary}>
      <main className='mx-auto my-10 max-w-5xl px-4'>
        <h1 className='font-jalnan py-4 text-3xl leading-9 font-bold'>
          폰트 둘러보기
        </h1>
        <PopularFontSection />
        <ExploreFontSection />
      </main>
    </ErrorBoundary>
  )
}

export default FontExplorePage
