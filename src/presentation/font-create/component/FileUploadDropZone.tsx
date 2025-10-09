import type { DragEvent } from 'react'
import { useFormContext } from 'react-hook-form'

import { Icon } from '@/presentation/components/shared/Icon/Icon'
import { PrimaryButton } from '@/presentation/components/shared/PrimaryButton'
import { FONT_FIELDS } from '@/service/fonts/configs/font.config'
import { cn } from '@/shared/utils/cn'

const FileUploadHintMessage = () => {
  const { watch } = useFormContext()
  const currentFile = watch(FONT_FIELDS.file.name)

  if (currentFile) {
    return (
      <div className='flex-column items-center gap-2'>
        <span className='text-success text-lg leading-7 font-bold'>
          파일 업로드 완료
        </span>
        <span className='text-description text-sm'>
          {currentFile.name} ({Math.round(currentFile.size / 1024)}KB)
        </span>
      </div>
    )
  }

  return (
    <>
      <span className='text-accent-light text-lg leading-7 font-bold'>
        파일을 드래그 & 드랍
      </span>
      <span className='text-footer-description text-sm leading-6 font-normal'>
        or
      </span>
    </>
  )
}

type FileUploadDropZoneProps = {
  isDragOver: boolean
  onDrop: (e: DragEvent<HTMLDivElement>) => void
  onDragOver: (e: DragEvent<HTMLDivElement>) => void
  onDragLeave: (e: DragEvent<HTMLDivElement>) => void
  openFileDialog: () => void
}

const FILE_UPLOAD_STYLES = {
  isDragOver: {
    container: 'border-primary bg-primary/5',
    icon: 'text-primary',
  },
  hasCurrentFile: {
    container: 'border-success bg-success/5',
    icon: 'text-success',
  },
  isError: { container: 'border-error', icon: 'text-error' },
}

export const FileUploadDropZone = ({
  isDragOver,
  onDrop,
  onDragOver,
  onDragLeave,
  openFileDialog,
}: FileUploadDropZoneProps) => {
  const { watch, formState } = useFormContext()
  const fieldName = FONT_FIELDS.file.name
  const currentFile = watch(fieldName)
  const error = formState.errors[fieldName]?.message?.toString()

  return (
    <div
      className={cn(
        'flex-column border-secondary-point items-center gap-4 rounded-lg border-2 border-dashed px-6 pt-12 pb-10 transition-colors',
        isDragOver && FILE_UPLOAD_STYLES.isDragOver.container,
        error && FILE_UPLOAD_STYLES.isError.container,
        currentFile && FILE_UPLOAD_STYLES.hasCurrentFile.container,
      )}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <Icon
        name='download'
        size={48}
        className={cn(
          'text-secondary-point',
          isDragOver && FILE_UPLOAD_STYLES.isDragOver.icon,
          error && FILE_UPLOAD_STYLES.isError.icon,
          currentFile && FILE_UPLOAD_STYLES.hasCurrentFile.icon,
        )}
      />
      <FileUploadHintMessage />

      <PrimaryButton
        type='button'
        size='sm'
        className='h-9'
        onClick={openFileDialog}
      >
        {currentFile ? '파일 재업로드' : '파일 열기'}
      </PrimaryButton>

      <span className='text-footer-description text-xs leading-4 font-normal'>
        PNG, JPG 형식만 가능합니다.
      </span>
    </div>
  )
}
