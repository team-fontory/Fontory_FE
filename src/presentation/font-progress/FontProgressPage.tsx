import { CompletedFontSection } from './components/CompletedFontSection'
import { InProgressFontSection } from './components/InProgressFontSection'

const FontProgressPage = () => {
  return (
    <div className='mx-auto my-10 max-w-5xl px-4'>
      <h1 className='font-jalnan p-4 text-3xl leading-9 font-bold'>
        내가 제작한 폰트
      </h1>
      <main className='flex-column mt-8 gap-12'>
        <InProgressFontSection />
        <CompletedFontSection />
      </main>
    </div>
  )
}

export default FontProgressPage
