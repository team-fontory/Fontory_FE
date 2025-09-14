import { useState } from 'react'

import { Pagination } from '@/shared/components/Pagination'

import { FontPreviewItem } from '../components/FontPreviewItem'
import { useCompletedFontList, useProgressFontList } from '../services/useFontQuery'

const EMPTY_MESSAGE = {
  noFont: '제작한 폰트가 없습니다',
}

const InProgressTableBody = () => {
  const tableCommonStyle = 'py-6 text-center'
  const { data: inProgressFonts } = useProgressFontList()

  if (inProgressFonts.isEmpty) {
    return (
      <tbody>
        <tr>
          <td colSpan={2} className='text-description py-20 text-center text-lg'>
            {EMPTY_MESSAGE.noFont}
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody>
      {inProgressFonts.fontList.map((font) => (
        <tr key={font.id} className='font-progress-value'>
          <td className={tableCommonStyle}>{font.name}</td>
          <td className={tableCommonStyle}>{font.formattedCreatedAt}</td>
        </tr>
      ))}
    </tbody>
  )
}

const MyFontPage = () => {
  const tableCommonStyle = 'py-6 text-center'
  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: { listView, paginationView },
  } = useCompletedFontList(currentPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className='mx-auto my-8 max-w-5xl px-5'>
      <h2 className='text-accent text-4xl leading-10 font-bold'>내가 제작한 폰트</h2>

      <main className='flex-column mt-8 gap-12'>
        <section className='flex-column gap-4'>
          <h3 className='text-accent-light text-2xl leading-8 font-bold'>제작중인 폰트</h3>
          <div className='border-secondary rounded-lg border bg-white'>
            <table className='w-full'>
              <thead className='border-b border-gray-200'>
                <tr>
                  <th className={tableCommonStyle}>제작 중인 폰트 이름</th>
                  <th className={tableCommonStyle}>제작 요청 시간</th>
                </tr>
              </thead>
              <InProgressTableBody />
            </table>
          </div>
        </section>

        <section className='flex-column gap-4'>
          <h3 className='text-accent-light text-2xl leading-8 font-bold'>제작 완료된 폰트</h3>

          {listView.isEmpty ? (
            <div className='border-secondary flex-center rounded-lg border bg-white py-20'>
              <p className='text-description text-lg'>완료된 폰트가 없습니다</p>
            </div>
          ) : (
            <>
              <div className='flex-column gap-1'>
                {listView.list.map((font) => (
                  <FontPreviewItem key={font.fontId} {...font} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={paginationView.totalPages}
                onPageChange={handlePageChange}
                showPages={5}
                className='mt-6'
              />
            </>
          )}
        </section>
      </main>
    </div>
  )
}

export default MyFontPage
