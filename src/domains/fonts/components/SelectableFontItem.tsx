import { Link } from 'react-router-dom'

import { createRoute } from '@/app/router/routes.constant'
import { PrimaryButton } from '@/shared/components/PrimaryButton'

import type { FontItemView } from '../types'

import { DynamicFontText } from './DynamicFontText'

type Props = FontItemView & {
  onSelect?: (font: FontItemView) => void
  isSelected?: boolean
  isSelectable?: boolean
}

export const SelectableFontItem = ({
  onSelect,
  isSelected = false,
  isSelectable = true,
  ...rest
}: Props) => {
  const fontData = { ...rest }
  const { fontId, fontName, example, writerName, fontAddr } = rest

  const handleSelect = () => {
    if (onSelect && isSelectable) {
      onSelect(fontData)
    }
  }

  return (
    <article
      className={`group rounded-lg border-b border-gray-100 bg-white px-4 py-6 transition-colors hover:bg-gray-50 ${isSelected ? 'border-blue-200 bg-blue-50' : ''}`}
    >
      <div className='flex-between-center gap-6'>
        <Link
          to={createRoute.fontDetail(fontId)}
          className='flex-column group-hover:text-primary grow gap-3 transition-colors'
          aria-label={`${fontName} 폰트 상세보기`}
        >
          <div className='flex-column gap-2'>
            <DynamicFontText
              fontName={fontName}
              fontUrl={fontAddr}
              className='text-accent line-clamp-2 text-2xl leading-relaxed font-medium'
              skeletonClassName='bg-secondary h-6 w-full animate-pulse rounded'
            >
              {example}
            </DynamicFontText>
            <div className='flex-align-center gap-2 text-sm'>
              <span className='text-accent font-semibold'>{fontName}</span>
              <span className='text-description'>by {writerName}</span>
            </div>
          </div>
        </Link>

        <div className='flex flex-shrink-0 gap-2' onClick={(e) => e.stopPropagation()}>
          {isSelectable && (
            <PrimaryButton
              size='sm'
              onClick={handleSelect}
              disabled={isSelected}
              secondary={!isSelected}
              className='px-3 py-1'
            >
              {isSelected ? '선택됨' : '선택'}
            </PrimaryButton>
          )}
        </div>
      </div>
    </article>
  )
}
