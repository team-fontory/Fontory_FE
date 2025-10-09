import { useEffect } from 'react'
import { FormProvider, useFormContext } from 'react-hook-form'

import { FormField } from '@/presentation/components/shared/FormField'
import { FormRadioGroup } from '@/presentation/components/shared/FormRadioGroup'
import { PrimaryButton } from '@/presentation/components/shared/PrimaryButton'
import {
  editProfileDefaultValues,
  type EditProfileFormData,
  EditProfileFormSchema,
  USER_FIELDS,
} from '@/service/auth/configs/user.config'
import { useEditProfile } from '@/service/auth/hooks/useEditProfile'
import { useNicknameValidation } from '@/service/auth/hooks/useNicknameValidation'
import { useCustomForm } from '@/shared/hooks/useCustomForm'
import { formatDateInput } from '@/shared/utils/inputHelper'
import { useUserProfile } from '@/store/queries/auth.query'

const EditProfileFormContent = () => {
  const { handleSubmitForm } = useEditProfile()
  const { handleNicknameCheck, canCheck } = useNicknameValidation()
  const { handleSubmit, formState } = useFormContext<EditProfileFormData>()
  const isFormValid = formState.isValid && formState.isDirty

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className='mx-auto w-full max-w-md'
    >
      <div className='flex-column mb-6 gap-4'>
        {/* 닉네임 필드 */}
        <div className='flex items-end gap-2'>
          <div className='flex-1'>
            <FormField
              required
              name={USER_FIELDS.nickname.name}
              label={USER_FIELDS.nickname.label}
              placeholder={USER_FIELDS.nickname.placeholder}
              minLength={USER_FIELDS.nickname.minLength}
              maxLength={USER_FIELDS.nickname.maxLength}
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
        프로필 수정
      </PrimaryButton>
    </form>
  )
}

export const EditProfileForm = () => {
  const { data: userProfile } = useUserProfile()
  const defaultValues = {
    ...editProfileDefaultValues,
    ...userProfile,
  } as EditProfileFormData
  const formMethods = useCustomForm<EditProfileFormData>(
    EditProfileFormSchema,
    { defaultValues },
  )

  useEffect(() => {
    if (userProfile && userProfile.nickname) {
      formMethods.setValue('nicknameVerified', true)
    }
  }, [userProfile, formMethods])

  return (
    <FormProvider {...formMethods}>
      <EditProfileFormContent />
    </FormProvider>
  )
}
