import { DynamicFont } from '@/presentation/_components/font/DynamicFont'
import type { FontItemModel } from '@/service/fonts/fontModel.type'

type SelectedFontCardProps = {
  font: FontItemModel
  onRemove: () => void
}

export const SelectedFontCard = ({ font, onRemove }: SelectedFontCardProps) => {
  const { fontName, example, writerName, fontAddr } = font

  return (
    <div className='relative min-w-0 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md'>
      <button
        onClick={onRemove}
        className='flex-center bg-primary hover:bg-primary-point absolute top-2 right-2 size-5 rounded-full text-white transition-colors'
        aria-label={`${fontName} 폰트 선택 해제`}
      >
        <span className='mb-0.5 ml-[1px]'>&times;</span>
      </button>

      <div className='flex-column gap-3 pr-8'>
        <DynamicFont fontName={fontName} fontUrl={fontAddr}>
          <DynamicFont.Skeleton className='h-5 w-full' />
          <DynamicFont.Text className='line-clamp-2 text-xl leading-relaxed'>
            {example}
          </DynamicFont.Text>
        </DynamicFont>

        <div className='flex-column gap-1'>
          <span className='text-accent text-sm font-semibold'>{fontName}</span>
          <span className='text-description text-xs'>by {writerName}</span>
        </div>
      </div>
    </div>
  )
}
