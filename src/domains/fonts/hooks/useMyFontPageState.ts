import { useSearchParams } from 'react-router-dom'

import { useCompletedFontList } from '../services/useFontQuery'

export const useMyFontPageState = () => {
  const [searchParams] = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1', 10)

  const {
    data: { listView, paginationView },
  } = useCompletedFontList(currentPage)

  return { listView, paginationView }
}
