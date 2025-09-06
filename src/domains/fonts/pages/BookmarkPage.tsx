import { useState } from 'react'

import { Pagination } from '@/shared/components/Pagination'

import { FontListSection } from '../containers/FontListSection'
import { FontSearchBar } from '../containers/FontSearchBar'
import { useBookmarkFontList } from '../services/useFontQuery'

const BookmarkPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const { data: fontList, refetch } = useBookmarkFontList({
    page: currentPage,
    keyword: searchQuery.trim() || null,
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    setCurrentPage(1)
    refetch()
  }

  return (
    <>
      <main className='mx-auto my-10 max-w-5xl px-4'>
        <h1 className='font-jalnan p-4 text-3xl leading-9 font-bold'>북마크한 폰트</h1>

        <section className='mt-12' aria-labelledby='all-fonts-title'>
          <div className='mx-4'>
            <FontSearchBar searchQuery={searchQuery} onSearch={handleSearchChange} />
            <button
              type='button'
              className='text-footer-description mt-2 mr-1 ml-auto block'
              onClick={handleResetFilters}
            >
              검색어 초기화
            </button>
          </div>

          <FontListSection fontList={fontList} />

          {!fontList.isEmpty && (
            <div className='pb-8'>
              <Pagination
                currentPage={fontList.currentPage}
                totalPages={fontList.totalPages}
                onPageChange={handlePageChange}
                className='mt-8'
              />
            </div>
          )}
        </section>
      </main>
    </>
  )
}

export default BookmarkPage
