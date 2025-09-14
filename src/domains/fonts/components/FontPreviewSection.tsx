import type { FontItemView } from '../types/font.type'

import { DynamicFontTextarea } from './DynamicFontTextarea'

type Props = {
  fontItemView: FontItemView
}

/** 폰트 미리보기 섹션 컴포넌트 */
export const FontPreviewSection = ({ fontItemView }: Props) => {
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
