import { FormProvider, useFormContext } from 'react-hook-form'

import { PrimaryButton } from '@/presentation/components/shared/PrimaryButton'
import {
  createFontDefaultValues,
  type CreateFontFormData,
  CreateFontSchema,
} from '@/service/fonts/font.config'
import { useCreateFont } from '@/service/fonts/hooks/useCreateFont'
import { useFontNameValidation } from '@/service/fonts/hooks/useFontNameValidation'
import { useCustomForm } from '@/shared/hooks/useCustomForm'

import { FileUploadSection } from './FileUploadSection'
import { FontInfoSection } from './FontInfoSection'
import { PhoneNumberSection } from './PhoneNumberSection'
import { TemplateDownloadSection } from './TemplateDownloadSection'

export const CreateFontFormContent = () => {
  const { handleSubmitForm } = useCreateFont()
  const { handleFontNameCheck, canCheck, isVerified } = useFontNameValidation()

  const { handleSubmit, formState } = useFormContext<CreateFontFormData>()
  const isFormValid = formState.isValid && !formState.isSubmitting && isVerified

  return (
    <form
      className='flex-column mt-12 gap-10'
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <TemplateDownloadSection />
      <FileUploadSection />
      <FontInfoSection
        onFontNameCheck={handleFontNameCheck}
        canCheck={canCheck}
      />
      <PhoneNumberSection />

      <PrimaryButton
        type='submit'
        size='md'
        disabled={!isFormValid}
        className='mt-12 self-end'
      >
        폰트 생성하기
      </PrimaryButton>
    </form>
  )
}

export const CreateFontForm = () => {
  const formMethods = useCustomForm(CreateFontSchema, {
    defaultValues: createFontDefaultValues,
  })

  return (
    <FormProvider {...formMethods}>
      <CreateFontFormContent />
    </FormProvider>
  )
}
