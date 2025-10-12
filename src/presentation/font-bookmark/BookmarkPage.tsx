import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { Link, type To } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useBookmarkFontListViewModel } from '@/service/fonts/view-models/useBookmarkFontListViewModel'

import { FontListSection } from '../components/font/FontListSection'
import { FontSearchBar } from '../components/font/FontSearchBar'
import { PageLoader } from '../components/shared/PageLoader'
import { Pagination } from '../components/shared/Pagination'

/** 에러 바운더리 내 에러 발생 시 호출되는 대체 UI 컴포넌트 */
const BookmarkErrorBoundary = ({ error }: FallbackProps) => {
  toast.error(error.message)

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

/** 북마크 페이지 컴포넌트 */
const BookmarkContainer = () => {
  const { isLoading, fontList, totalPages } = useBookmarkFontListViewModel()
  if (isLoading) return <PageLoader />

  return (
    <main className='mx-auto my-10 max-w-5xl px-4'>
      <h1 className='font-jalnan py-4 text-3xl leading-9 font-bold'>
        북마크한 폰트
      </h1>
      <section className='mt-12' aria-labelledby='all-fonts-title'>
        <FontSearchBar />
        <FontListSection
          fontList={fontList}
          emptyMessage='북마크한 폰트가 존재하지 않습니다.'
        />
        <Pagination totalPages={totalPages} className='my-8' />
      </section>
    </main>
  )
}

const BookmarkPage = () => {
  return (
    <ErrorBoundary FallbackComponent={BookmarkErrorBoundary}>
      <BookmarkContainer />
    </ErrorBoundary>
  )
}

export default BookmarkPage
