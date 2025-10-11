import { useParams } from 'react-router-dom'

import { useFontDetailViewModel } from '@/service/fonts/view-models/useFontDetailViewModel'

import { FontDetailHeader } from './components/FontDetailHeader'
import { FontDetailSidebar } from './components/FontDetailSidebar'
import { FontPreviewSection } from './components/FontPreviewSection'
import { RecommendFontSection } from './components/RecommendFontSection'

/** 폰트 상세 페이지 컴포넌트 */
const FontDetailPage = () => {
  const { fontId } = useParams<{ fontId: string }>()
  const fontItem = useFontDetailViewModel(Number(fontId))

  const {
    fontName,
    fontAddr,
    example,
    writerName,
    downloadCount,
    bookmarkCount,
  } = fontItem

  return (
    <div className='mx-auto my-8 flex max-w-7xl justify-center gap-12 px-5'>
      <main className='w-[837.33px]'>
        <FontDetailHeader {...fontItem} />
        <FontPreviewSection
          fontName={fontName}
          fontAddr={fontAddr}
          example={example}
        />
        <RecommendFontSection writerName={writerName} />
      </main>
      <FontDetailSidebar
        downloadCount={downloadCount}
        bookmarkCount={bookmarkCount}
      />
    </div>
  )
}

export default FontDetailPage
