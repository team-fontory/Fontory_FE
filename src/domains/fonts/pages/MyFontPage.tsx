import { CompletedFontList } from '../containers/CompletedFontList'
import { InProgressFontTable } from '../containers/InProgressFontTable'

const MyFontPage = () => {
  return (
    <div className='mx-auto my-10 max-w-5xl px-4'>
      <h1 className='font-jalnan p-4 text-3xl leading-9 font-bold'>내가 제작한 폰트</h1>

      <main className='flex-column mt-8 gap-12'>
        <section className='flex-column gap-4'>
          <h3 className='text-accent-light text-2xl leading-8 font-bold'>제작중인 폰트</h3>
          <InProgressFontTable />
        </section>

        <section className='flex-column gap-4'>
          <h3 className='text-accent-light text-2xl leading-8 font-bold'>제작 완료된 폰트</h3>
          <CompletedFontList />
        </section>
      </main>
    </div>
  )
}

export default MyFontPage
