import { useParams } from 'react-router-dom'

import { FontDetailHeader } from '../components/FontDetailHeader'
import { FontDetailSidebar } from '../components/FontDetailSidebar'
import { FontPreviewSection } from '../components/FontPreviewSection'
import { RecommendedFontSection } from '../components/RecommendedFontSection'
import { useFontDetail, useRecommendFontList } from '../services/useFontQuery'

const FontDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const fontId = Number(id)

  const { data: fontDetail } = useFontDetail(fontId)
  const { data: recommendFonts } = useRecommendFontList(fontId)

  return (
    <div className='mx-auto my-8 flex max-w-7xl justify-center gap-12 px-5'>
      <main className='w-[837.33px]'>
        <FontDetailHeader fontDetail={fontDetail} />
        <FontPreviewSection fontDetail={fontDetail} />
        <RecommendedFontSection
          writerName={fontDetail.writerName}
          recommendFonts={recommendFonts}
        />
      </main>
      <FontDetailSidebar fontDetail={fontDetail} />
    </div>
  )
}

export default FontDetailPage
