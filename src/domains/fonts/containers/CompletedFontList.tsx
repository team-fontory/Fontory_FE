import { Pagination } from '@/shared/components/Pagination'

import { FontPreviewItem } from '../components/FontPreviewItem'
import { useMyFontPageState } from '../hooks/useMyFontPageState'

export const CompletedFontList = () => {
  const { listView, paginationView } = useMyFontPageState()

  if (listView.isEmpty)
    return (
      <div className='border-secondary flex-center rounded-lg border bg-white py-20'>
        <p className='text-description text-lg'>완료된 폰트가 없습니다</p>
      </div>
    )

  return (
    <>
      <div className='flex-column gap-1'>
        {listView.list.map((font) => (
          <FontPreviewItem key={font.fontId} {...font} />
        ))}
      </div>
      <Pagination totalPages={paginationView.totalPages} showPages={5} className='mt-6' />
    </>
  )
}
