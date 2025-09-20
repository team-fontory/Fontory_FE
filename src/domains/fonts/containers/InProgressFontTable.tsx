import { useProgressFontList } from '../services/useFontQuery'

export const InProgressFontTable = () => {
  const { data: inProgressFonts } = useProgressFontList()

  if (inProgressFonts.isEmpty)
    return <p className='text-description py-20 text-center text-lg'>제작한 폰트가 없습니다</p>

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
          {inProgressFonts.items.map((font) => (
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
