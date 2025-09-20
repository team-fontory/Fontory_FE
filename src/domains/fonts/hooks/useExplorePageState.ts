import { useSearchParams } from 'react-router-dom'

import { useExploreFontList } from '../services/useFontQuery'
import { getFilterSortBy, getValidFontFilterKey } from '../utils/fontFilterUtils.ts'

export const useExplorePageState = () => {
  const [searchParams] = useSearchParams()

  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const activeFilter = getValidFontFilterKey(searchParams.get('filter'))
  const searchQuery = searchParams.get('search') || ''

  const {
    data: { listView, paginationView },
  } = useExploreFontList({
    page: currentPage,
    sortBy: getFilterSortBy(activeFilter),
    keyword: searchQuery.trim() || null,
  })

  return { listView, paginationView }
}
