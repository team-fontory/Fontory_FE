import { useState } from 'react'
import { FormProvider } from 'react-hook-form'

import { Icon } from '@/shared/components/Icon/Icon'
import { Input } from '@/shared/components/Input'
import { PrimaryButton } from '@/shared/components/PrimaryButton'
import { useCustomForm } from '@/shared/hooks/useCustomForm'

import { SignupPolicy } from '../components/SignupPolicy'
import { signupAttribute, signupSchema } from '../constants/userConfig'
import { GenderField } from '../containers/GenderField'
import { NicknameField } from '../containers/NicknameField'
import { useSignupForm } from '../hooks/useSignupForm'
import type { SignupFormType } from '../types/auth.type'

const SignupPage = () => {
  const [nicknameChecked, setNicknameChecked] = useState(false)

  const { handleSubmitForm: onSubmit, defaultValues } = useSignupForm()

  const methods = useCustomForm<SignupFormType>(signupSchema, {
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isValid },
  } = methods
  const isFormValid = isValid && nicknameChecked

  return (
    <div className='flex-center h-full'>
      <div className='flex-column border-secondary my-20 w-fit min-w-2xl rounded-lg border bg-white p-8 py-16'>
        <header className='flex-column mr-2 mb-8 items-center'>
          <div className='flex-align-center gap-3'>
            <Icon name='logo' size={32} className='text-primary' />
            <h3 className='font-jalnan text-accent text-3xl leading-9 font-bold'>Fontory</h3>
          </div>

          <h4 className='text-accent-light mt-4 text-xl leading-9 font-bold'>
            Fontory에 오신 것을 환영합니다.
          </h4>
          <p className='text-footer-description mt-2 text-sm leading-5'>
            나만의 손글씨 폰트를 만들고 다양한 폰트도 둘러보세요.
          </p>
        </header>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className='mx-auto w-full max-w-md'>
            <SignupPolicy />

            <div className='flex-column mb-6 gap-4'>
              <NicknameField />
              <Input
                section={signupAttribute.birth.section}
                label={signupAttribute.birth.label}
                onInput={signupAttribute.birth.onInput}
              />
              <GenderField />
            </div>

            <PrimaryButton type='submit' size='md' disabled={!isFormValid} className='w-full'>
              가입하기
            </PrimaryButton>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default SignupPage
