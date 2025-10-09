import type { FontItemModel } from '@/service/fonts/types/fontModel.type'

type FontDetailSidebarProps = Pick<
  FontItemModel,
  'downloadCount' | 'bookmarkCount'
>

/** 폰트 상세 정보 사이드바 컴포넌트 */
export const FontDetailSidebar = ({
  downloadCount,
  bookmarkCount,
}: FontDetailSidebarProps) => {
  return (
    <aside className='border-secondary h-fit w-[250px] rounded-lg border bg-white p-6'>
      <h4 className='text-xl leading-7 font-bold'>폰트 세부 정보</h4>
      <div className='flex-column mt-4 gap-4'>
        <div className='flex-between-center flex-wrap gap-x-4'>
          <p className='text-description text-sm leading-5 font-normal'>
            다운로드 수
          </p>
          <p className='text-sm leading-5 font-medium'>{downloadCount}</p>
        </div>
        <div className='flex-between-center flex-wrap gap-x-4'>
          <p className='text-description text-sm leading-5 font-normal'>
            북마크 수
          </p>
          <p className='text-sm leading-5 font-medium'>{bookmarkCount}</p>
        </div>
      </div>
    </aside>
  )
}
