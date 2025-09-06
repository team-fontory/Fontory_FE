import type { FontListViewModel } from '../models/fontListViewModel'

import { FontPreviewItem } from './FontPreviewItem'

type Props = {
  writerName: string
  recommendFonts: FontListViewModel
}

/** 제작자의 다른 폰트 추천 섹션 컴포넌트 */
export const RecommendedFontSection = ({ writerName, recommendFonts }: Props) => {
  if (recommendFonts.isEmpty) {
    return null
  }

  return (
    <section className='mt-20'>
      <h4 className='text-accent-light text-2xl leading-8 font-bold'>
        {writerName}님이 제작한 다른 폰트
      </h4>
      <div className='flex-column py-4'>
        {recommendFonts.fontList.slice(0, 4).map((font) => (
          <FontPreviewItem key={font.fontId} {...font.toData()} />
        ))}
      </div>
    </section>
  )
}
