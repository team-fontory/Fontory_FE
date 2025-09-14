import { useState } from 'react'

import { Pagination } from '@/shared/components/Pagination'

import { FONT_FILTER_OPTIONS } from '../constants/fontFilterOptions'
import { FontFilter } from '../containers/FontFilter'
import { FontListSection } from '../containers/FontListSection'
import { FontSearchBar } from '../containers/FontSearchBar'
import { PopularFontSection } from '../containers/PopularFontSection'
import { useExploreFontList } from '../services/useFontQuery'
import type { FontFilterType } from '../types/font.type'
import { getFilterSortBy } from '../utils/getFilterSortBy'

const FontExplorePage = () => {
  const [activeFilter, setActiveFilter] = useState<FontFilterType>(FONT_FILTER_OPTIONS[0].key)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: { listView, paginationView },
    refetch,
  } = useExploreFontList({
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

  const handleResetFilters = () => {
    setSearchQuery('')
    setCurrentPage(1)
    refetch()
  }

  return (
    <>
      <main className='mx-auto my-10 max-w-5xl px-4'>
        <h1 className='font-jalnan p-4 text-3xl leading-9 font-bold'>폰트 둘러보기</h1>
        <PopularFontSection />

        <section className='mt-12' aria-labelledby='all-fonts-title'>
          <h2 id='all-fonts-title' className='px-4 py-5 text-2xl leading-8 font-bold'>
            전체 폰트
          </h2>

          <FontFilter activeFilter={activeFilter} onClickFilter={handleClickFilter} />

          <div className='mx-4 mt-6'>
            <FontSearchBar searchQuery={searchQuery} onSearch={handleSearchChange} />
            <button
              type='button'
              className='text-footer-description mt-2 mr-1 ml-auto block'
              onClick={handleResetFilters}
            >
              검색어 초기화
            </button>
          </div>

          <FontListSection listView={listView} />

          {!paginationView.isOnlyOnePage && (
            <div className='pb-8'>
              <Pagination
                currentPage={currentPage}
                totalPages={paginationView.totalPages}
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

export default FontExplorePage
