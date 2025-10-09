import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'

import { PrimaryButton } from '@/presentation/components/shared/PrimaryButton'
import { useCustomForm } from '@/shared/hooks/useCustomForm'

import { editProfileSchema } from '../constants/userConfig'
import { GenderField } from '../containers/GenderField'
import { NicknameField } from '../containers/NicknameField'
import { useEditProfileMutation } from '../services/useAuthMutation'
import { useUserProfile } from '../services/useAuthQuery'
import { useIsNickNameChecked, useNicknameStore } from '../stores/nicknameStore'
import type { EditProfileType, UserProfile } from '../types/auth.type'

const EditProfilePage = () => {
  const { data: userProfile, isPending } = useUserProfile()
  const isNicknameChecked = useIsNickNameChecked()
  const { setNicknameCheck } = useNicknameStore()
  const { mutate: editProfile } = useEditProfileMutation()

  const formMethods = useCustomForm<EditProfileType>(editProfileSchema, {
    defaultValues: userProfile,
  })

  const {
    handleSubmit,
    formState: { isValid, isDirty },
  } = formMethods
  const isFormValid = isValid && isNicknameChecked && isDirty

  useEffect(() => {
    setNicknameCheck(formMethods.getValues('nickname'), true)
  }, [formMethods, setNicknameCheck])

  const handleEditProfile = (formData: UserProfile) => {
    editProfile(formData)
  }

  if (isPending)
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='border-primary h-32 w-32 animate-spin rounded-full border-b-2'></div>
      </div>
    )

  return (
    <div className='flex-center h-full'>
      <div className='flex-column border-secondary my-20 w-fit min-w-2xl gap-9 rounded-lg border bg-white p-8 py-16'>
        <h3 className='font-jalnan text-accent text-center text-3xl leading-9 font-bold'>
          프로필 수정
        </h3>

        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(handleEditProfile)}
            className='mx-auto w-full max-w-md'
          >
            <div className='flex-column mb-6 gap-4'>
              <NicknameField />
              <GenderField disabled />
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
        </FormProvider>
      </div>
    </div>
  )
}

export default EditProfilePage
