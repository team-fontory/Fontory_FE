import { ErrorBoundary } from 'react-error-boundary'

import { useBookmarkFontListViewModel } from '@/service/fonts/view-models/useBookmarkFontListViewModel'

import { FontListSection } from '../_components/font/FontListSection'
import { FontSearchBar } from '../_components/font/FontSearchBar'
import { PageErrorFallback } from '../_components/shared/PageErrorFallback'
import { PageLoader } from '../_components/shared/PageLoader'
import { Pagination } from '../_components/shared/Pagination'

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
    <ErrorBoundary FallbackComponent={PageErrorFallback}>
      <BookmarkContainer />
    </ErrorBoundary>
  )
}

export default BookmarkPage
