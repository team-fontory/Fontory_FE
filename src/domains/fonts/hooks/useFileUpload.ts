import { type ChangeEvent, type DragEvent, useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'

type UseFileUploadProps = {
  section: string
}

export const useFileUpload = ({ section }: UseFileUploadProps) => {
  const { setValue, formState, watch } = useFormContext()
  const [isDragOver, setIsDragOver] = useState(false)

  const currentFile = watch(section)
  const error = formState.errors[section]?.message?.toString()

  const handleFile = useCallback(
    (file: File | null) => {
      if (!file) return
      setValue(section, file, { shouldValidate: true })
    },
    [section, setValue],
  )

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = e.dataTransfer.files
      if (files.length > 0) {
        handleFile(files[0])
      }
    },
    [handleFile],
  )

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        handleFile(files[0])
      }
    },
    [handleFile],
  )

  const openFileDialog = useCallback(() => {
    document.getElementById(`${section}-file-input`)?.click()
  }, [section])

  return {
    isDragOver,
    currentFile,
    error,

    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileSelect,
    openFileDialog,
  }
}
