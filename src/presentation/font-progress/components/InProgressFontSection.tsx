import { EmptyFontListMessage } from '@/presentation/components/font/EmptyFontListMessage'
import { useProgressFontListViewModel } from '@/service/fonts/view-models/useProgressFontListViewModel'

export const InProgressFontTable = () => {
  const { fontList } = useProgressFontListViewModel()

  if (!fontList.length) {
    return <EmptyFontListMessage message='제작한 폰트가 없습니다' />
  }

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

export const InProgressFontSection = () => {
  return (
    <section className='flex-column gap-4'>
      <h3 className='text-accent-light text-2xl leading-8 font-bold'>
        제작중인 폰트
      </h3>
      <InProgressFontTable />
    </section>
  )
}
