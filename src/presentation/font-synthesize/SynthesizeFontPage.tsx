import { BookmarkFontListSection } from './components/BookmarkFontListSection'
import { SelectedFontListSection } from './components/SelectedFontListSection'

const SynthesizeFontPage = () => {
  return (
    <main className='mx-auto my-10 max-w-5xl px-4'>
      <header className='flex-column mb-8 items-center gap-4'>
        <h1 className='font-jalnan text-accent-light text-4xl'>폰트 합성</h1>
        <p className='text-description text-center text-lg leading-7 font-normal'>
          북마크한 폰트 중에서 두 개를 선택하여 새로운 폰트를 만들어보세요.
        </p>
      </header>

      <SelectedFontListSection />
      <BookmarkFontListSection />
    </main>
  )
}

export default SynthesizeFontPage
