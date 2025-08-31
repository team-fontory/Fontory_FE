import { useState } from 'react'

import { Icon } from '@/shared/components/Icon/Icon'

type Props = {
  searchQuery: string
  onSearch: (query: string) => void
  placeholder?: string
  isLoading?: boolean
}

/**
 * 폰트 검색 바 컴포넌트
 *
 * - 사용자가 검색 버튼 클릭이나 엔터 키를 누르면 API 호출을 통해 검색
 */
export const FontSearchBar = ({
  searchQuery,
  onSearch,
  placeholder = '폰트 이름을 입력하고 검색하세요.',
  isLoading = false,
}: Props) => {
  const [inputValue, setInputValue] = useState(searchQuery || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedValue = inputValue.trim()

    // 현재 검색어와 다를 때만 검색 실행
    if (trimmedValue !== searchQuery) {
      onSearch(trimmedValue)
    }
  }

  const handleClear = () => {
    setInputValue('')
    onSearch('')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='border-disabled flex-align-center focus-within:border-primary gap-2 rounded-md border px-4 py-3 transition-colors'
      role='search'
    >
      <button
        type='submit'
        disabled={isLoading || !inputValue.trim()}
        className='flex-align-center text-description hover:text-primary transition-colors disabled:cursor-not-allowed disabled:opacity-50'
        aria-label='검색 실행'
      >
        {isLoading ? (
          <div className='border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent' />
        ) : (
          <Icon name='search' size={20} />
        )}
      </button>

      <input
        type='search'
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className='placeholder:text-footer-description text-accent grow bg-transparent text-base font-normal focus:outline-none disabled:opacity-50'
        aria-label='폰트 검색'
        autoComplete='off'
        spellCheck={false}
        disabled={isLoading}
      />

      {inputValue && (
        <button
          type='button'
          onClick={handleClear}
          disabled={isLoading}
          className='flex-align-center text-description hover:text-accent transition-colors disabled:opacity-50'
          aria-label='검색어 지우기'
        >
          <span className='text-base'>✕</span>
        </button>
      )}
    </form>
  )
}
