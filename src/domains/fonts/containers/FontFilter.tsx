import { FONT_FILTER_OPTIONS } from '../constants/fontFilterOptions'
import { type FontFilterType } from '../types/font.type'

type Props = {
  activeFilter: FontFilterType
  onClickFilter: (key: FontFilterType) => void
}

/** 폰트 필터 컴포넌트 */
export const FontFilter = ({ activeFilter, onClickFilter }: Props) => {
  return (
    <nav
      className='border-b-secondary-point overflow-x-auto border-b px-4'
      role='tablist'
      aria-label='폰트 필터 옵션'
    >
      <div className='flex min-w-max gap-2'>
        {FONT_FILTER_OPTIONS.map(({ key, label, description }) => {
          const isActive = activeFilter === key

          return (
            <button
              key={key}
              role='tab'
              aria-selected={isActive}
              aria-controls='font-list'
              aria-describedby={`filter-${key}-desc`}
              className={`flex-align-center h-14 gap-2 border-b-2 px-4 text-sm whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'border-primary text-primary bg-primary/5 font-semibold'
                  : 'text-description hover:text-accent border-transparent hover:bg-gray-50'
              }`}
              onClick={() => onClickFilter(key)}
              title={description}
            >
              <span>{label}</span>
            </button>
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
