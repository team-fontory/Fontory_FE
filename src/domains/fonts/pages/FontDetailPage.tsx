import { useParams } from 'react-router-dom'

import { DynamicFontText } from '../components/DynamicFontText'
import { DynamicFontTextarea } from '../components/DynamicFontTextarea'
import { FontPreviewItem } from '../components/FontPreviewItem'
import { BookmarkButton } from '../containers/BookmarkButton'
import { DownloadButton } from '../containers/DownloadButton'
import { useFontDetail, useRecommendFontList } from '../services/useFontQuery'
import type { FontItemView, FontListView } from '../types'

type FontItemViewProps = {
  fontItemView: FontItemView
}

/** 폰트 상세 페이지 헤더 컴포넌트 */
const FontDetailHeader = ({ fontItemView }: FontItemViewProps) => {
  return (
    <header className='flex-between-center'>
      <div>
        <DynamicFontText
          fontName={fontItemView.fontName}
          fontUrl={fontItemView.fontAddr}
          className='text-accent text-5xl leading-12 font-bold'
          skeletonClassName='bg-secondary h-12 w-80 animate-pulse rounded'
        >
          {fontItemView.fontName}
        </DynamicFontText>
        <h3 className='text-description mt-2 text-lg leading-7 font-normal'>
          By {fontItemView.writerName}
        </h3>
      </div>

      <div className='flex gap-4'>
        <BookmarkButton
          fontId={fontItemView.fontId}
          fontName={fontItemView.fontName}
          isBookmarked={fontItemView.isBookmarked}
        />
        <DownloadButton fontName={fontItemView.fontName} fontId={fontItemView.fontId} />
      </div>
    </header>
  )
}

/** 폰트 상세 정보 사이드바 컴포넌트 */
const FontDetailSidebar = ({ fontItemView }: FontItemViewProps) => {
  return (
    <aside className='border-secondary h-fit w-[250px] rounded-lg border bg-white p-6'>
      <h4 className='text-xl leading-7 font-bold'>폰트 세부 정보</h4>
      <div className='flex-column mt-4 gap-4'>
        <div className='flex-between-center flex-wrap gap-x-4'>
          <p className='text-description text-sm leading-5 font-normal'>다운로드 수</p>
          <p className='text-sm leading-5 font-medium'>{fontItemView.downloadCount}</p>
        </div>
        <div className='flex-between-center flex-wrap gap-x-4'>
          <p className='text-description text-sm leading-5 font-normal'>북마크 수</p>
          <p className='text-sm leading-5 font-medium'>{fontItemView.bookmarkCount}</p>
        </div>
      </div>
    </aside>
  )
}

/** 폰트 미리보기 섹션 컴포넌트 */
const FontPreviewSection = ({ fontItemView }: FontItemViewProps) => {
  return (
    <section className='mt-20'>
      <h4 className='text-accent-light text-2xl leading-8 font-bold'>미리보기</h4>

      <div className='border-secondary mt-4 rounded-lg border bg-white p-6'>
        <DynamicFontTextarea
          fontName={fontItemView.fontName}
          fontUrl={fontItemView.fontAddr}
          rows={3}
          className='text-accent w-full resize-none text-3xl leading-10 font-normal'
          placeholder={fontItemView.example}
        />
        <p className='text-description text-lg font-normal'>
          원하는 글자를 입력해 보며 글꼴을 테스트해 보세요.
        </p>
      </div>
    </section>
  )
}

type RecommendedFontSectionProps = {
  writerName: string
  recommendFontListView: FontListView
}

/** 제작자의 다른 폰트 추천 섹션 컴포넌트 */
const RecommendedFontSection = ({
  writerName,
  recommendFontListView,
}: RecommendedFontSectionProps) => {
  if (recommendFontListView.isEmpty) return null

  return (
    <section className='mt-20'>
      <h4 className='text-accent-light text-2xl leading-8 font-bold'>
        {writerName}님이 제작한 다른 폰트
      </h4>
      <div className='flex-column py-4'>
        {recommendFontListView.list.slice(0, 4).map((font) => (
          <FontPreviewItem key={font.fontId} {...font} />
        ))}
      </div>
    </section>
  )
}

/** 폰트 상세 페이지 컴포넌트 */
const FontDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const fontId = Number(id)

  const { data: fontItemView } = useFontDetail(fontId)
  const { data: recommendFontListView } = useRecommendFontList(fontId)

  return (
    <div className='mx-auto my-8 flex max-w-7xl justify-center gap-12 px-5'>
      <main className='w-[837.33px]'>
        <FontDetailHeader fontItemView={fontItemView} />
        <FontPreviewSection fontItemView={fontItemView} />
        <RecommendedFontSection
          writerName={fontItemView.writerName}
          recommendFontListView={recommendFontListView}
        />
      </main>
      <FontDetailSidebar fontItemView={fontItemView} />
    </div>
  )
}

export default FontDetailPage
