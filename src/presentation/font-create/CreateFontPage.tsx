import { CreateFontForm } from './component/CreateFontForm'

const CreateFontPage = () => {
  return (
    <div className='mx-auto my-12 max-w-[960px]'>
      <header className='flex-column items-center gap-4'>
        <h2 className='font-jalnan text-accent-light text-4xl'>나만의 손글씨 폰트 제작</h2>
        <p className='text-description text-lg leading-7 font-normal'>
          아래 단계를 따라 진행하면 단 10분이면 완성됩니다.
        </p>
      </header>

      <CreateFontForm />
    </div>
  )
}

export default CreateFontPage
