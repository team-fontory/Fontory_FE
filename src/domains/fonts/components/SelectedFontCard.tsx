import type { FontItemView } from '../types/font.type'

import { DynamicFontText } from './DynamicFontText'

type Props = {
  font: FontItemView
  onRemove: () => void
}

export const SelectedFontCard = ({ font, onRemove }: Props) => {
  const { fontName, example, writerName, fontAddr } = font

  return (
    <div className='relative min-w-0 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md'>
      <button
        onClick={onRemove}
        className='flex-center bg-primary hover:bg-primary-point absolute top-2 right-2 size-5 rounded-full p-1 text-[10px] font-bold text-white transition-colors'
        aria-label={`${fontName} 폰트 선택 해제`}
      >
        X
      </button>

      <div className='flex-column gap-3 pr-8'>
        <DynamicFontText
          fontName={fontName}
          fontUrl={fontAddr}
          className='text-accent line-clamp-2 text-xl leading-relaxed font-medium'
          skeletonClassName='bg-secondary h-5 w-full animate-pulse rounded'
        >
          {example}
        </DynamicFontText>

        <div className='flex-column gap-1'>
          <span className='text-accent text-sm font-semibold'>{fontName}</span>
          <span className='text-description text-xs'>by {writerName}</span>
        </div>
      </div>
    </div>
  )
}
