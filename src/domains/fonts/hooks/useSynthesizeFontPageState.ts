import { useSearchParams } from 'react-router-dom'

import { useBookmarkFontList } from '../services/useFontQuery'

/** 폰트 합성 페이지의 상태를 URL 쿼리스트링으로 관리하는 훅 */
export const useSynthesizeFontPageState = () => {
  const [searchParams] = useSearchParams()

  const searchQuery = searchParams.get('search') || ''
  const currentPage = Math.max(1, parseInt(searchParams.get('page') || '1', 10))

  const {
    data: { listView, paginationView },
  } = useBookmarkFontList({
    page: currentPage,
    keyword: searchQuery.trim() || null,
  })

  return {
    currentPage,
    listView,
    paginationView,
  }
}
