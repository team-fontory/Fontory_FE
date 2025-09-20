import { useSearchParams } from 'react-router-dom'

import { FONT_FILTER_OPTIONS } from '../constants/fontFilterOptions'
import { type FontFilterType } from '../types'
import { getValidFontFilterKey } from '../utils/fontFilterUtils.ts'

/** 새로 만든 파라미터 객체를 반환 */
const updateFilterParam = (prev: URLSearchParams, filter: FontFilterType): URLSearchParams => {
  const newParams = new URLSearchParams(prev)
  if (filter === FONT_FILTER_OPTIONS[0].key) newParams.delete('filter')
  else newParams.set('filter', filter)
  newParams.delete('page')

  return newParams
}

type FilterButtonProps = {
  isActive: boolean
  key: FontFilterType
  description: string
  label: (typeof FONT_FILTER_OPTIONS)[number]['label']
  onClick: () => void
}

const FilterButton = ({ isActive, key, description, label, onClick }: FilterButtonProps) => {
  return (
    <button
      role='tab'
      aria-selected={isActive}
      aria-controls='font-list'
      aria-describedby={`filter-${key}-description`}
      className={`flex-align-center h-14 gap-2 border-b-2 px-4 text-sm whitespace-nowrap transition-all duration-200 ${
        isActive
          ? 'border-primary text-primary bg-primary/5 font-semibold'
          : 'text-description hover:text-accent border-transparent hover:bg-gray-50'
      }`}
      onClick={onClick}
      title={description}
    >
      <span>{label}</span>
    </button>
  )
}

/** 폰트 필터 컴포넌트 */
export const FontFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeFilter = getValidFontFilterKey(searchParams.get('filter'))

  const handleFilterChange = (filter: FontFilterType) => {
    setSearchParams((prev) => updateFilterParam(prev, filter))
  }

  return (
    <nav
      className='border-b-secondary-point overflow-x-auto border-b px-4'
      role='tablist'
      aria-label='폰트 필터 옵션'
    >
      <div className='flex min-w-max gap-2'>
        {FONT_FILTER_OPTIONS.map(({ key, label, description }) => {
          const isActive = activeFilter === key
          const onClickButton = () => handleFilterChange(key)

          return (
            <FilterButton
              key={key}
              isActive={isActive}
              label={label}
              description={description}
              onClick={onClickButton}
            />
          )
        })}
      </div>

      {/* 스크린 리더용 숨김 설명 */}
      <div className='sr-only'>
        {FONT_FILTER_OPTIONS.map(({ key, description }) => (
          <div key={key} id={`filter-${key}-desc`}>
            {description}
          </div>
        ))}
      </div>
    </nav>
  )
}
