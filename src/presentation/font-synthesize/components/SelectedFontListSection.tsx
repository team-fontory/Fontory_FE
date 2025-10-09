import { EmptyFontListMessage } from '@/presentation/components/font/EmptyFontListMessage'
import { PrimaryButton } from '@/presentation/components/shared/PrimaryButton'
import { cn } from '@/shared/utils/cn'
import {
  useSelectedFontList,
  useSelectedFontListActions,
} from '@/store/states/selectedFontList.store'

import { SelectedFontCard } from './SelectedFontCard'

const SelectedFontList = () => {
  const selectedFonts = useSelectedFontList()
  const { removeFont } = useSelectedFontListActions()
  const containerStyle =
    'border-secondary-point min-h-[168px] border-2 border-dashed rounded-lg'

  if (!selectedFonts.length)
    return (
      <EmptyFontListMessage
        message='아래에서 폰트를 선택해주세요.'
        className={containerStyle}
      />
    )

  return (
    <div className={cn('relative grid grid-cols-2 gap-4 p-5', containerStyle)}>
      {selectedFonts.map((font) => (
        <SelectedFontCard
          key={font.fontId}
          font={font}
          onRemove={() => removeFont(font.fontId)}
        />
      ))}
    </div>
  )
}

export const SelectedFontListSection = () => {
  const selectedFontList = useSelectedFontList()

  const handleSynthesize = async () => {
    if (selectedFontList.length !== 2) return
    // TODO: 실제 합성 API 호출
  }

  return (
    <section className='mb-8'>
      <h2 className='text-accent mb-4 text-2xl font-bold'>
        선택된 폰트 ({selectedFontList.length}/2)
      </h2>
      <SelectedFontList />
      <PrimaryButton
        onClick={handleSynthesize}
        size='md'
        className='mt-4 ml-auto'
        disabled={selectedFontList.length !== 2}
      >
        폰트 합성하기
      </PrimaryButton>
    </section>
  )
}
