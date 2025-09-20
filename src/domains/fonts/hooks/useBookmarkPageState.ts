import { useState } from 'react'

import { useBookmarkFontList } from '../services/useFontQuery'

/** 북마크 페이지의 상태와 이벤트 핸들링을 관리하는 훅 */
export const useBookmarkPageState = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: { listView, paginationView },
    refetch,
  } = useBookmarkFontList({
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

  return {
    searchQuery,
    currentPage,
    listView,
    paginationView,

    handlePageChange,
    handleSearchChange,
    handleResetFilters,
  }
}
