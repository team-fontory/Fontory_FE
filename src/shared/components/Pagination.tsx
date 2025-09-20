import type { MouseEvent } from 'react'

import { cn } from '../utils/cn'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showPages?: number
  disabled?: boolean
  className?: string
}

/** 표시할 페이지 번호 범위 계산 */
const getPageRange = (showPages: number, currentPage: number, totalPages: number): number[] => {
  const half = Math.floor(showPages / 2)
  let start = Math.max(1, currentPage - half)
  const end = Math.min(totalPages, start + showPages - 1)

  // 끝쪽에서 범위 조정
  if (end - start + 1 < showPages) {
    start = Math.max(1, end - showPages + 1)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

/** 공용 페이지네이션 컴포넌트 */
export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showPages = 5,
  disabled = false,
  className = '',
}: PaginationProps) => {
  if (totalPages <= 1) return null

  /** 페이지 변경 핸들러 */
  const handlePageChange = (page: number) => (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (disabled || page === currentPage || page < 1 || page > totalPages) return
    onPageChange(page)
  }

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages
  const pageRange = getPageRange(showPages, currentPage, totalPages)

  if (totalPages <= 1) return null

  return (
    <nav
      role='navigation'
      aria-label='페이지네이션'
      className={`flex items-center justify-center gap-1 ${className}`}
    >
      {/* 이전 페이지 */}
      <button
        type='button'
        onClick={handlePageChange(currentPage - 1)}
        disabled={disabled || isFirstPage}
        className='flex-center h-10 w-10 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
        aria-label='이전 페이지'
      >
        ‹
      </button>

      {/* 페이지 번호들 */}
      {pageRange.map((page) => {
        const isActive = page === currentPage

        return (
          <button
            key={page}
            type='button'
            onClick={handlePageChange(page)}
            disabled={disabled}
            className={cn(
              'flex-center h-10 w-10 rounded-md border text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
              isActive
                ? 'border-primary bg-primary text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
            )}
            aria-label={`페이지 ${page}${isActive ? ' (현재 페이지)' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {page}
          </button>
        )
      })}

      {/* 다음 페이지 */}
      <button
        type='button'
        onClick={handlePageChange(currentPage + 1)}
        disabled={disabled || isLastPage}
        className='flex-center h-10 w-10 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
        aria-label='다음 페이지'
      >
        ›
      </button>

      {/* 페이지 정보 (스크린 리더용) */}
      <span className='sr-only'>
        {totalPages}페이지 중 {currentPage}페이지
      </span>
    </nav>
  )
}
