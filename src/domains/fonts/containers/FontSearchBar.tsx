import { Icon } from '@/shared/components/Icon/Icon'

import { useSearchQuery } from '../hooks/useSearchQuery'

type SearchClearButtonProps = {
  hasValue: boolean
  onClear: () => void
}

/** 검색어 지우는 X 표시 버튼 */
const SearchClearButton = ({ hasValue, onClear }: SearchClearButtonProps) => {
  if (!hasValue) return null

  return (
    <button
      type='button'
      onClick={onClear}
      className='flex-align-center text-description hover:text-accent transition-colors disabled:opacity-50'
      aria-label='검색어 지우기'
    >
      <span className='text-base'>✕</span>
    </button>
  )
}

/** 폰트 검색 바 컴포넌트 */
export const FontSearchBar = () => {
  const { register, handleSubmit, currentValue, isSubmitDisabled, handleClear } = useSearchQuery()

  return (
    <form
      onSubmit={handleSubmit}
      className='border-disabled flex-align-center focus-within:border-primary gap-2 rounded-md border px-4 py-3 transition-colors'
      role='search'
    >
      <button
        type='submit'
        disabled={isSubmitDisabled}
        className='flex-align-center text-description hover:text-primary transition-colors disabled:cursor-not-allowed disabled:opacity-50'
        aria-label='검색 실행'
      >
        <Icon name='search' size={20} />
      </button>

      <input
        {...register('search')}
        type='search'
        placeholder='폰트 이름을 입력하고 검색하세요.'
        className='placeholder:text-footer-description text-accent grow bg-transparent text-base font-normal focus:outline-none disabled:opacity-50'
        aria-label='폰트 검색'
        autoComplete='off'
        spellCheck={false}
      />

      <SearchClearButton hasValue={!!currentValue} onClear={handleClear} />
    </form>
  )
}
