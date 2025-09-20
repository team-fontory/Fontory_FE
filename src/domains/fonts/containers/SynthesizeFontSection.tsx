import { PrimaryButton } from '@/shared/components/PrimaryButton'

import { SelectedFontCard } from '../components/SelectedFontCard'
import {
  useSelectedFontsActions,
  useSelectedFontsList,
  useSelectedFontsStore,
} from '../stores/useSelectedFontsStore'

const SelectedFontContainer = () => {
  const selectedFonts = useSelectedFontsList()
  const { removeFont } = useSelectedFontsActions()

  if (!selectedFonts.length)
    return (
      <div className='border-secondary-point relative grid h-[168px] grid-cols-2 gap-4 rounded-lg border-2 border-dashed p-5'>
        <p className='text-footer-description text-md absolute top-1/2 left-1/2 w-fit -translate-1/2 text-center font-normal'>
          아래에서 폰트를 선택해주세요.
        </p>
      </div>
    )

  return (
    <div className='border-secondary-point relative grid h-[168px] grid-cols-2 gap-4 rounded-lg border-2 border-dashed p-5'>
      {selectedFonts.map((font) => (
        <SelectedFontCard key={font.fontId} font={font} onRemove={() => removeFont(font.fontId)} />
      ))}
    </div>
  )
}

export const SynthesizeFontSection = () => {
  const { selectedFonts } = useSelectedFontsStore()

  const handleSynthesize = async () => {
    if (selectedFonts.length !== 2) return
    // TODO: 실제 합성 API 호출
  }

  return (
    <section className='mb-8'>
      <h2 className='text-accent mb-4 text-2xl font-bold'>
        선택된 폰트 ({selectedFonts.length}/2)
      </h2>
      <SelectedFontContainer />

      <PrimaryButton
        onClick={handleSynthesize}
        size='md'
        className='mt-4 ml-auto'
        disabled={selectedFonts.length !== 2}
      >
        폰트 합성하기
      </PrimaryButton>
    </section>
  )
}
