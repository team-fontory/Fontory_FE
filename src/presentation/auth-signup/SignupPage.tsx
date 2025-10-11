import { Icon } from '../components/shared/Icon/Icon'

import { SignupForm } from './components/SignupForm'

const SignupPage = () => {
  return (
    <div className='flex-center h-full'>
      <div className='flex-column border-secondary my-20 w-fit min-w-2xl rounded-lg border bg-white p-8 py-16'>
        <header className='flex-column mr-2 mb-8 items-center'>
          <div className='flex-align-center gap-3'>
            <Icon name='logo' size={32} className='text-primary' />
            <h3 className='font-jalnan text-accent text-3xl leading-9 font-bold'>
              Fontory
            </h3>
          </div>

          <h4 className='text-accent-light mt-4 text-xl leading-9 font-bold'>
            Fontory에 오신 것을 환영합니다.
          </h4>
          <p className='text-footer-description mt-2 text-sm leading-5'>
            나만의 손글씨 폰트를 만들고 다양한 폰트도 둘러보세요.
          </p>
        </header>

        <SignupForm />
      </div>
    </div>
  )
}

export default SignupPage
