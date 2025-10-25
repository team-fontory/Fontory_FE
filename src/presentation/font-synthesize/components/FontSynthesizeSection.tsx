import { useEffect } from 'react'
import { FormProvider, useFormContext } from 'react-hook-form'

import { PrimaryButton } from '@/presentation/_components/shared/PrimaryButton'
import {
  createFontDefaultValues,
  type CreateFontFormData,
  CreateFontSchema,
} from '@/service/fonts/font.config'
import { useCreateFont } from '@/service/fonts/hooks/useCreateFont'
import { useFontNameValidation } from '@/service/fonts/hooks/useFontNameValidation'
import { useCustomForm } from '@/shared/hooks/useCustomForm'
import { useSelectedFontList } from '@/store/states/selectedFontList.store'

import { FontInfoSection } from './FontInfoSection'
import { PhoneNumberSection } from './PhoneNumberSection'

export const FontSynthesizeForm = () => {
  const { handleSubmitForm } = useCreateFont()
  const selectedFontList = useSelectedFontList()
  const { handleFontNameCheck, canCheck, isVerified } = useFontNameValidation()

  const { handleSubmit, formState } = useFormContext<CreateFontFormData>()
  const isFormValid = formState.isValid && !formState.isSubmitting && isVerified

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className='flex-column gap-4'
    >
      <FontInfoSection
        onFontNameCheck={handleFontNameCheck}
        canCheck={canCheck}
      />
      <PhoneNumberSection />

      <PrimaryButton
        type='submit'
        size='md'
        className='mt-4 ml-auto'
        disabled={selectedFontList.length !== 2 || !isFormValid}
      >
        폰트 합성하기
      </PrimaryButton>
    </form>
  )
}

export const FontSynthesizeSection = () => {
  const formMethods = useCustomForm(CreateFontSchema, {
    defaultValues: createFontDefaultValues,
    mode: 'onChange',
  })

  useEffect(() => {
    const loadDefaultFile = async () => {
      try {
        const response = await fetch('/images/example_font.png')
        const blob = await response.blob()
        const file = new File([blob], 'example_font.png', { type: blob.type })
        formMethods.setValue('file', file)
      } catch (error) {
        console.error('Failed to load default font file:', error)
      }
    }

    loadDefaultFile()
  }, [formMethods])

  return (
    <FormProvider {...formMethods}>
      <FontSynthesizeForm />
    </FormProvider>
  )
}
