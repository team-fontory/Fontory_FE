import { Link } from 'react-router-dom'

import { Icon } from '@/shared/components/Icon/Icon'

import { LoginPolicy } from '../components/LoginPolicy'

const LoginPage = () => {
  return (
    <div className='flex-center h-full'>
      <div className='flex-column border-secondary my-20 w-fit min-w-2xl items-center rounded-lg border bg-white p-8 py-16'>
        <header className='flex-column items-center'>
          <div className='flex-align-center gap-3'>
            <Icon name='logo' size={32} className='text-primary' />
            <h3 className='font-jalnan text-accent text-3xl leading-9 font-bold'>Fontory</h3>
          </div>

          <h4 className='text-accent-light mt-4 text-xl leading-9 font-bold'>
            계정에 로그인하세요
          </h4>
          <p className='text-footer-description mt-2 text-sm leading-5'>
            나만의 손글씨 폰트를 만들고 다양한 폰트도 둘러보세요.
          </p>
        </header>

        <main className='flex-align-center mt-8 gap-6'>
          <Link to={`${import.meta.env.VITE_PUBLIC_SERVER_DOMAIN}/oauth2/authorization/naver`}>
            <img src='/images/naver.png' className='h-16 w-16' />
          </Link>
          <Link to={`${import.meta.env.VITE_PUBLIC_SERVER_DOMAIN}/oauth2/authorization/google`}>
            <img src='/images/google.svg' className='h-16 w-16' />
          </Link>
        </main>

        <LoginPolicy />
      </div>
    </div>
  )
}

export default LoginPage
