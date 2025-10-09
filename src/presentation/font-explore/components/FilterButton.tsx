import type {
  FONT_FILTER_OPTIONS,
  FontFilterKeyType,
} from '@/shared/constants/filter.constant'

type FilterButtonProps = {
  isActive: boolean
  filterKey: FontFilterKeyType
  key: FontFilterKeyType
  description: string
  label: (typeof FONT_FILTER_OPTIONS)[number]['label']
  onClick: () => void
}

export const FilterButton = ({
  isActive,
  filterKey,
  description,
  label,
  onClick,
}: FilterButtonProps) => {
  return (
    <button
      role='tab'
      aria-selected={isActive}
      aria-controls='font-list'
      aria-describedby={`filter-${filterKey}-description`}
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
