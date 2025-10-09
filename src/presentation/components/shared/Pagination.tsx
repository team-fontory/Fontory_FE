import type { MouseEvent } from 'react'

import { usePagination } from '@/shared/hooks/usePagination'
import { cn } from '@/shared/utils/cn'

type NavigationDirection = 'prev' | 'next'

type NavigationButtonProps = {
  direction: NavigationDirection
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  disabled: boolean
}

const navigationConfig = {
  prev: { symbol: '‹', label: '이전 페이지 그룹' },
  next: { symbol: '›', label: '다음 페이지 그룹' },
} as const

/** 이전/다음 버튼 컴포넌트 */
const NavigationButton = ({
  direction,
  onClick,
  disabled,
}: NavigationButtonProps) => {
  const config = navigationConfig[direction]

  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className='flex-center h-10 w-10 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
      aria-label={config.label}
    >
      {config.symbol}
    </button>
  )
}

type PageNumberButtonProps = {
  page: number
  isActive: boolean
  disabled: boolean
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

/** 페이지 번호 버튼 컴포넌트 */
const PageNumberButton = ({
  page,
  isActive,
  disabled,
  onClick,
}: PageNumberButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
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
}

type PaginationProps = {
  totalPages: number
  showPages?: number
  disabled?: boolean
  className?: string
}

/** 공용 페이지네이션 컴포넌트 */
export const Pagination = ({
  totalPages,
  showPages = 5,
  disabled = false,
  className = '',
}: PaginationProps) => {
  const {
    currentPage,
    pageRange,
    shouldShow,
    canGoPrevGroup,
    canGoNextGroup,
    handlePageChange,
    handlePrevGroup,
    handleNextGroup,
  } = usePagination({
    totalPages,
    showPages,
    disabled,
  })

  if (!shouldShow) return null

  return (
    <nav
      role='navigation'
      aria-label='페이지네이션'
      className={`flex items-center justify-center gap-1 ${className}`}
    >
      <NavigationButton
        direction='prev'
        onClick={handlePrevGroup}
        disabled={disabled || !canGoPrevGroup}
      />
      {pageRange.map((page) => (
        <PageNumberButton
          key={page}
          page={page}
          isActive={page === currentPage}
          disabled={disabled}
          onClick={handlePageChange(page)}
        />
      ))}
      <NavigationButton
        direction='next'
        onClick={handleNextGroup}
        disabled={disabled || !canGoNextGroup}
      />
    </nav>
  )
}
