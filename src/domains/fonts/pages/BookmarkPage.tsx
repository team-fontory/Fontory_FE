import { useState } from 'react'

import { Pagination } from '@/shared/components/Pagination'

import { FONT_FILTER_OPTIONS } from '../constants/fontFilterOptions'
import { FontFilter } from '../containers/FontFilter'
import { FontListSection } from '../containers/FontListSection'
import { FontSearchBar } from '../containers/FontSearchBar'
import { useBookmarkFontList } from '../services/useFontQuery'
import type { FontFilterType } from '../types/font.type'
import { getFilterSortBy } from '../utils/getFilterSortBy'

const BookmarkPage = () => {
  const [activeFilter, setActiveFilter] = useState<FontFilterType>(FONT_FILTER_OPTIONS[0].key)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const { data: fontList } = useBookmarkFontList({
    page: currentPage,
    sortBy: getFilterSortBy(activeFilter),
    keyword: searchQuery.trim() || null,
  })

  const handleClickFilter = (key: FontFilterType) => {
    setActiveFilter(key)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  return (
    <>
      <main className='mx-auto my-10 max-w-5xl px-4'>
        <h1 className='font-jalnan p-4 text-3xl leading-9 font-bold'>북마크한 폰트</h1>

        <section className='mt-12' aria-labelledby='all-fonts-title'>
          <FontFilter activeFilter={activeFilter} onClickFilter={handleClickFilter} />

          <div className='mx-4 mt-6'>
            <FontSearchBar searchQuery={searchQuery} onSearch={handleSearchChange} />
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
