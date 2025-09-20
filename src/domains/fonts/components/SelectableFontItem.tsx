import { Link } from 'react-router-dom'

import { createRoute } from '@/app/router/routes.constant'
import { PrimaryButton } from '@/shared/components/PrimaryButton'

import { useSelectedFontsActions, useSelectedFontsStore } from '../stores/useSelectedFontsStore'
import type { FontItemView } from '../types'

import { DynamicFontText } from './DynamicFontText'

export const SelectableFontItem = (fontData: FontItemView) => {
  const { fontId, fontName, example, writerName, fontAddr } = fontData

  const { isFontSelected, canAddFont } = useSelectedFontsStore()
  const isSelected = isFontSelected(fontId)
  const isSelectable = canAddFont(fontId)
  const { addFont } = useSelectedFontsActions()

  const handleSelect = () => {
    if (isSelectable) {
      addFont(fontData)
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
          {(isSelectable || isSelected) && (
            <PrimaryButton
              size='sm'
              onClick={handleSelect}
              disabled={isSelected || !isSelectable}
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
