import { FormProvider, useFormContext } from 'react-hook-form'

import { FormField } from '@/presentation/components/shared/FormField'
import { FormRadioGroup } from '@/presentation/components/shared/FormRadioGroup'
import { PrimaryButton } from '@/presentation/components/shared/PrimaryButton'
import { useNicknameValidation } from '@/service/auth/hooks/useNicknameValidation'
import { useSignup } from '@/service/auth/hooks/useSignup'
import {
  signupDefaultValues,
  type SignupFormData,
  SignupFormSchema,
  USER_FIELDS,
} from '@/service/auth/user.config'
import { useCustomForm } from '@/shared/hooks/useCustomForm'
import { formatDateInput } from '@/shared/utils/inputHelper'

import { SignupPolicy } from './SignupPolicy'

export const SignupFormContent = () => {
  const { handleSubmitForm } = useSignup()
  const { handleNicknameCheck, canCheck, isVerified } = useNicknameValidation()

  const { handleSubmit, formState } = useFormContext<SignupFormData>()
  const isFormValid = formState.isValid && !formState.isSubmitting && isVerified

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className='mx-auto w-full max-w-md'
    >
      <SignupPolicy />

      <div className='flex-column mb-6 gap-4'>
        {/* 닉네임 필드 */}
        <div className='flex items-end gap-2'>
          <div className='flex-1'>
            <FormField
              required
              name={USER_FIELDS.nickname.name}
              label={USER_FIELDS.nickname.label}
              placeholder={USER_FIELDS.nickname.placeholder}
            />
          </div>
          <PrimaryButton
            type='button'
            size='md'
            onClick={handleNicknameCheck}
            disabled={!canCheck}
            className='h-[50px]'
          >
            중복체크
          </PrimaryButton>
        </div>

        {/* 생년월일 필드 */}
        <FormField
          name={USER_FIELDS.birth.name}
          label={USER_FIELDS.birth.label}
          placeholder={USER_FIELDS.birth.placeholder}
          onInput={(e) => {
            const input = e.currentTarget
            input.value = formatDateInput(input.value)
          }}
        />

        {/* 성별 라디오 */}
        <FormRadioGroup
          name={USER_FIELDS.gender.name}
          label={USER_FIELDS.gender.label}
          options={USER_FIELDS.gender.options}
        />
      </div>

      <PrimaryButton
        type='submit'
        size='md'
        disabled={!isFormValid}
        className='w-full'
      >
        가입하기
      </PrimaryButton>
    </form>
  )
}

export const SignupForm = () => {
  const formMethods = useCustomForm<SignupFormData>(SignupFormSchema, {
    defaultValues: signupDefaultValues,
  })

  return (
    <FormProvider {...formMethods}>
      <SignupFormContent />
    </FormProvider>
  )
}
