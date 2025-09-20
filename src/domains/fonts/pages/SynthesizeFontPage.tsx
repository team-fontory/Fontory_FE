import { Pagination } from '@/shared/components/Pagination'

import { SynthesizeFontList } from '../components/SynthesizeFontList'
import { FontSearchBar } from '../containers/FontSearchBar'
import { SynthesizeFontSection } from '../containers/SynthesizeFontSection'
import { useSynthesizeFontPageState } from '../hooks/useSynthesizeFontPageState'

const SynthesizeFontPage = () => {
  const { listView, paginationView } = useSynthesizeFontPageState()

  return (
    <main className='mx-auto my-10 max-w-5xl px-4'>
      <header className='flex-column mb-8 items-center gap-4'>
        <h1 className='font-jalnan text-accent-light text-4xl'>폰트 합성</h1>
        <p className='text-description text-center text-lg leading-7 font-normal'>
          북마크한 폰트 중에서 두 개를 선택하여 새로운 폰트를 만들어보세요.
        </p>
      </header>
      <SynthesizeFontSection />

      <section className='mt-12' aria-labelledby='bookmark-fonts-title'>
        <h2 className='text-accent py-5 text-2xl leading-8 font-bold'>북마크한 폰트</h2>
        <FontSearchBar />
        <SynthesizeFontList listView={listView} />

        <div className='pb-8'>
          <Pagination totalPages={paginationView.totalPages} className='mt-8' />
        </div>
      </section>
    </main>
  )
}

export default SynthesizeFontPage
