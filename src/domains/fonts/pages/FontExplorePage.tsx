import { useState } from 'react'

import { Footer } from '@/shared/components/Footer'
import { Gnb } from '@/shared/components/Gnb'

import { FONT_FILTER_OPTIONS } from '../constants/fontFilterOptions'
import { FontExploreList } from '../containers/FontExploreList'
import { FontFilter } from '../containers/FontFilter'
import { FontSearchBar } from '../containers/FontSearchBar'
import { PopularFontSection } from '../containers/PopularFontSection'
import type { FontFilterType } from '../types/font.type'

const FontExplorePage = () => {
  const [activeFilter, setActiveFilter] = useState<FontFilterType>(FONT_FILTER_OPTIONS[0].key)
  const [searchQuery, setSearchQuery] = useState('')

  const handleClickFilter = (key: FontFilterType) => {
    setActiveFilter(key)
  }

  return (
    <div className='bg-background min-h-svh'>
      <Gnb />
      <main className='mx-auto my-10 max-w-7xl px-4'>
        <h1 className='font-jalnan p-4 text-3xl leading-9 font-bold'>폰트 둘러보기</h1>
        <PopularFontSection />

        <section className='mt-12' aria-labelledby='all-fonts-title'>
          <h2 id='all-fonts-title' className='px-4 py-5 text-2xl leading-8 font-bold'>
            전체 폰트
          </h2>

          <FontFilter activeFilter={activeFilter} onClickFilter={handleClickFilter} />

          <div className='mx-4 mt-6'>
            <FontSearchBar searchQuery={searchQuery} onSearch={setSearchQuery} />
          </div>

          <FontExploreList activeFilter={activeFilter} />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default FontExplorePage
