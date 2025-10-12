import { DynamicFont } from '@/presentation/components/font/DynamicFont'
import { useFontItem } from '@/store/states/fontItem.store'

/** 폰트 미리보기 섹션 컴포넌트 */
export const FontPreviewSection = () => {
  const fontItem = useFontItem()
  if (!fontItem) return null

  return (
    <section className='mt-20'>
      <h4 className='text-accent-light text-2xl leading-8 font-bold'>
        미리보기
      </h4>

      <div className='border-secondary mt-4 rounded-lg border bg-white p-6'>
        <DynamicFont fontName={fontItem.fontName} fontUrl={fontItem.fontAddr}>
          <DynamicFont.Skeleton className='mb-16 h-8 w-full' />
          <DynamicFont.Textarea rows={3} placeholder={fontItem.example} />
        </DynamicFont>
        <p className='text-description text-lg font-normal'>
          원하는 글자를 입력해 보며 글꼴을 테스트해 보세요.
        </p>
      </div>
    </section>
  )
}
