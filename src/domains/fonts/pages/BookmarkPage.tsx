import { Pagination } from '@/shared/components/Pagination'

import { FontListSection } from '../containers/FontListSection'
import { FontSearchBar } from '../containers/FontSearchBar'
import { useBookmarkPageState } from '../hooks/useBookmarkPageState'

/** 북마크 페이지 컴포넌트 */
const BookmarkPage = () => {
  const { currentPage, listView, paginationView } = useBookmarkPageState()

  return (
    <>
      <main className='mx-auto my-10 max-w-5xl px-4'>
        <h1 className='font-jalnan p-4 text-3xl leading-9 font-bold'>북마크한 폰트</h1>

        <section className='mt-12' aria-labelledby='all-fonts-title'>
          <div className='mx-4'>
            <FontSearchBar />
          </div>

          <FontListSection listView={listView} />

          <div className='pb-8'>
            <Pagination
              currentPage={currentPage}
              totalPages={paginationView.totalPages}
              className='mt-8'
            />
          </div>
        </section>
      </main>
    </>
  )
}

export default BookmarkPage
