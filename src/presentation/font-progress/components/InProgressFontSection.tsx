import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { toast } from 'react-toastify'

import { EmptyFontListMessage } from '@/presentation/components/font/EmptyFontListMessage'
import { PageLoader } from '@/presentation/components/shared/PageLoader'
import { useProgressFontListViewModel } from '@/service/fonts/view-models/useProgressFontListViewModel'

/** 에러 바운더리 내 에러 발생 시 호출되는 대체 UI 컴포넌트 */
const InProgressFontErrorBoundary = ({ error }: FallbackProps) => {
  toast.error(error.message)
  return null
}

export const InProgressFontTable = () => {
  const { isLoading, fontList } = useProgressFontListViewModel()

  if (isLoading) return <PageLoader />
  if (!fontList.length)
    return <EmptyFontListMessage message='제작한 폰트가 없습니다' />

  return (
    <div className='border-secondary rounded-lg border bg-white'>
      <table className='w-full'>
        <thead className='border-b border-gray-200'>
          <tr>
            <th className='py-6 text-center'>제작 중인 폰트 이름</th>
            <th className='py-6 text-center'>제작 요청 시간</th>
          </tr>
        </thead>

        <tbody>
          {fontList.map((font) => (
            <tr key={font.id} className='font-progress-value'>
              <td className='py-6 text-center'>{font.name}</td>
              <td className='py-6 text-center'>{font.formattedCreatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const InProgressFontContainer = () => {
  return (
    <section className='flex-column gap-4'>
      <h3 className='text-accent-light text-2xl leading-8 font-bold'>
        제작중인 폰트
      </h3>
      <InProgressFontTable />
    </section>
  )
}

export const InProgressFontSection = () => {
  return (
    <ErrorBoundary FallbackComponent={InProgressFontErrorBoundary}>
      <InProgressFontContainer />
    </ErrorBoundary>
  )
}
