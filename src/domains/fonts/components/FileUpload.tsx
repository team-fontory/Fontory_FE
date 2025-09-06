import { Icon } from '@/shared/components/Icon/Icon'
import { PrimaryButton } from '@/shared/components/PrimaryButton'
import { cn } from '@/shared/utils/cn'

import { useFileUpload } from '../hooks/useFileUpload'

type Props = {
  section: string
  accept?: string
}

/** 드래그&드롭 파일 업로드 컴포넌트 */
export const FileUpload = ({ section, accept = 'image/*' }: Props) => {
  const {
    isDragOver,
    currentFile,
    error,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileSelect,
    openFileDialog,
  } = useFileUpload({ section })

  return (
    <div className='flex-column gap-2'>
      <div
        className={cn(
          'flex-column border-secondary-point items-center gap-4 rounded-lg border-2 border-dashed px-6 pt-12 pb-10 transition-colors',
          isDragOver && 'border-primary bg-primary/5',
          error && 'border-error',
          currentFile && 'border-success bg-success/5',
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Icon
          name='download'
          size={48}
          className={cn(
            'text-secondary-point',
            isDragOver && 'text-primary',
            error && 'text-error',
            currentFile && 'text-success',
          )}
        />

        {currentFile ? (
          <div className='flex-column items-center gap-2'>
            <span className='text-success text-lg leading-7 font-bold'>파일 업로드 완료</span>
            <span className='text-description text-sm'>
              {currentFile.name} ({Math.round(currentFile.size / 1024)}KB)
            </span>
          </div>
        ) : (
          <>
            <span className='text-accent-light text-lg leading-7 font-bold'>
              파일을 드래그 & 드랍
            </span>
            <span className='text-footer-description text-sm leading-6 font-normal'>or</span>
          </>
        )}

        <PrimaryButton type='button' size='sm' className='h-9' onClick={openFileDialog}>
          {currentFile ? '파일 재업로드' : '파일 열기'}
        </PrimaryButton>

        <span className='text-footer-description text-xs leading-4 font-normal'>
          PNG, JPG 형식만 가능합니다.
        </span>
      </div>

      {error && (
        <p className='text-error text-sm' role='alert'>
          {error}
        </p>
      )}

      <input
        id={`${section}-file-input`}
        type='file'
        accept={accept}
        onChange={handleFileSelect}
        className='hidden'
      />
    </div>
  )
}
