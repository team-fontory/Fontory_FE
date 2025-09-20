import { Pagination } from '@/shared/components/Pagination'

import { FontListSection } from '../containers/FontListSection'
import { FontSearchBar } from '../containers/FontSearchBar'
import { useBookmarkPageState } from '../hooks/useBookmarkPageState'

type BookmarkFilterProps = {
  searchQuery: string
  onSearch: (query: string) => void
  onResetFilters: () => void
}

/** 검색창과 검색어 초기화 버튼을 포함하는 컴포넌트 */
const BookmarkFilter = ({ searchQuery, onSearch, onResetFilters }: BookmarkFilterProps) => {
  return (
    <div className='mx-4'>
      <FontSearchBar searchQuery={searchQuery} onSearch={onSearch} />
      <button
        type='button'
        className='text-footer-description mt-2 mr-1 ml-auto block'
        onClick={onResetFilters}
      >
        검색어 초기화
      </button>
    </div>
  )
}

type BookmarkPaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

/** 페이지네이션 UI 컴포넌트 */
const BookmarkPagination = ({ currentPage, totalPages, onPageChange }: BookmarkPaginationProps) => {
  return (
    <div className='pb-8'>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        className='mt-8'
      />
    </div>
  )
}

/** 북마크 페이지 컴포넌트 */
const BookmarkPage = () => {
  const {
    searchQuery,
    currentPage,
    listView,
    paginationView,
    handlePageChange,
    handleSearchChange,
    handleResetFilters,
  } = useBookmarkPageState()

  return (
    <>
      <main className='mx-auto my-10 max-w-5xl px-4'>
        <h1 className='font-jalnan p-4 text-3xl leading-9 font-bold'>북마크한 폰트</h1>

        <section className='mt-12' aria-labelledby='all-fonts-title'>
          <BookmarkFilter
            searchQuery={searchQuery}
            onSearch={handleSearchChange}
            onResetFilters={handleResetFilters}
          />

          <FontListSection listView={listView} />
          <BookmarkPagination
            currentPage={currentPage}
            totalPages={paginationView.totalPages}
            onPageChange={handlePageChange}
          />
        </section>
      </main>
    </>
  )
}

export default BookmarkPage
