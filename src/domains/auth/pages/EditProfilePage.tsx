import { useEffect, useState } from 'react'
import { FormProvider } from 'react-hook-form'

import { Input } from '@/shared/components/Input'
import { PrimaryButton } from '@/shared/components/PrimaryButton'
import { useCustomForm } from '@/shared/hooks/useCustomForm'

import { editProfileAttribute, editProfileSchema } from '../constants/userConfig'
import { GenderField } from '../containers/GenderField'
import { NicknameField } from '../containers/NicknameField'
import { useUserProfile } from '../services/useAuthQuery'
import type { EditProfileType } from '../types/auth.type'

const EditProfilePage = () => {
  const { data: userProfile, isPending } = useUserProfile()
  const [nicknameChecked, setNicknameChecked] = useState(true)

  const formMethods = useCustomForm<EditProfileType>(editProfileSchema)

  useEffect(() => {
    if (userProfile) formMethods.reset(userProfile)
  }, [userProfile, formMethods])

  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods
  const isFormValid = isValid && nicknameChecked

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
          <form onSubmit={handleSubmit(() => {})} className='mx-auto w-full max-w-md'>
            <div className='flex-column mb-6 gap-4'>
              <NicknameField onNicknameCheckChange={setNicknameChecked} />
              <Input
                section={editProfileAttribute.birth.section}
                label={editProfileAttribute.birth.label}
                onInput={editProfileAttribute.birth.onInput}
              />
              <GenderField />
            </div>

            <PrimaryButton type='submit' size='md' disabled={!isFormValid} className='w-full'>
              프로필 수정
            </PrimaryButton>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default EditProfilePage
