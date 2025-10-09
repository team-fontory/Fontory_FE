import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { FONT_FIELDS } from '@/service/fonts/configs/font.config'
import { useDragAndDropUpload } from '@/service/fonts/hooks/useDragAndDropUpload'

import { CreateFontStepSection } from './CreateFontStepSection'
import { FileUploadDropZone } from './FileUploadDropZone'

const FileUploadErrorMessage = () => {
  const { formState } = useFormContext()
  const fieldName = FONT_FIELDS.file.name
  const error = formState.errors[fieldName]?.message?.toString()

  if (!error) {
    return null
  }

  return <p className='text-error text-sm'>{error}</p>
}

export const FileUploadSection = () => {
  const fieldName = FONT_FIELDS.file.name
  const { setValue } = useFormContext()

  const INPUT_ID = 'upload-file-input'

  const onFileSelect = useCallback(
    (file: File) => setValue(fieldName, file, { shouldValidate: true }),
    [fieldName, setValue],
  )

  const {
    isDragOver,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileSelect,
    openFileDialog,
  } = useDragAndDropUpload({ onFileSelect, inputId: INPUT_ID })

  return (
    <CreateFontStepSection
      step={2}
      title='작성한 템플릿 업로드'
      description='작성한 템플릿 이미지 파일을 업로드하세요.'
    >
      <div className='flex-column gap-2'>
        <FileUploadDropZone
          isDragOver={isDragOver}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          openFileDialog={openFileDialog}
        />
        <FileUploadErrorMessage />
        <input
          id={INPUT_ID}
          type='file'
          accept='image/*'
          onChange={handleFileSelect}
          className='hidden'
        />
      </div>
    </CreateFontStepSection>
  )
}
