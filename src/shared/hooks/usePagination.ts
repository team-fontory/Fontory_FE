import type { MouseEvent } from 'react'
import { useSearchParams } from 'react-router-dom'

/** 표시할 페이지 번호 범위 계산 */
const getPageRange = (
  showPages: number,
  currentPage: number,
  totalPages: number,
): number[] => {
  const half = Math.floor(showPages / 2)
  let start = Math.max(1, currentPage - half)
  const end = Math.min(totalPages, start + showPages - 1)

  if (end - start + 1 < showPages) start = Math.max(1, end - showPages + 1)

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

/** 페이지 파라미터 업데이트 */
const updateSearchParam = (
  prev: URLSearchParams,
  page: number = 1,
): URLSearchParams => {
  const newParams = new URLSearchParams(prev)
  if (page === 1) newParams.delete('page')
  else newParams.set('page', page.toString())
  return newParams
}

type UsePaginationProps = {
  totalPages: number
  showPages?: number
  disabled?: boolean
}

/** 페이지네이션 상태와 URL 동기화를 관리하는 훅 */
export const usePagination = ({
  totalPages,
  showPages = 5,
  disabled = false,
}: UsePaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1', 10)

  /** 페이지 변경 핸들러 */
  const handlePageChange =
    (page: number) => (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      if (disabled || page === currentPage || page < 1 || page > totalPages)
        return

      setSearchParams((prev) => updateSearchParam(prev, page))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

  const pageRange = getPageRange(showPages, currentPage, totalPages)
  const firstPageInRange = pageRange[0]
  const lastPageInRange = pageRange[pageRange.length - 1]

  // 그룹 이동 관련
  const canGoPrevGroup = firstPageInRange > 1
  const canGoNextGroup = lastPageInRange < totalPages

  const prevGroupPage = Math.max(1, firstPageInRange - showPages)
  const nextGroupPage = Math.min(totalPages, lastPageInRange + 1)

  // 그룹 이동 핸들러
  const handlePrevGroup = handlePageChange(prevGroupPage)
  const handleNextGroup = handlePageChange(nextGroupPage)

  const shouldShow = totalPages > 1

  return {
    currentPage,
    pageRange,
    shouldShow,
    canGoPrevGroup,
    canGoNextGroup,
    handlePageChange,
    handlePrevGroup,
    handleNextGroup,
  }
}
