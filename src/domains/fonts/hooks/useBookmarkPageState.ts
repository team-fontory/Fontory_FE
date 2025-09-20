import { useSearchParams } from 'react-router-dom'

import { useBookmarkFontList } from '../services/useFontQuery'

/** 페이지 파라미터를 업데이트한 새 객체를 반환 */
const updatePageParam = (prev: URLSearchParams, page: number): URLSearchParams => {
  const newParams = new URLSearchParams(prev)
  if (page === 1) newParams.delete('page')
  else newParams.set('page', page.toString())
  return newParams
}

/** 북마크 페이지의 상태와 이벤트 핸들링을 URL 쿼리스트링으로 관리하는 훅 */
export const useBookmarkPageState = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const searchQuery = searchParams.get('search') || ''
  const currentPage = Math.max(1, parseInt(searchParams.get('page') || '1', 10))

  const {
    data: { listView, paginationView },
  } = useBookmarkFontList({
    page: currentPage,
    keyword: searchQuery.trim() || null,
  })

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => updatePageParam(prev, page))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return {
    currentPage,
    listView,
    paginationView,
    handlePageChange,
  }
}
