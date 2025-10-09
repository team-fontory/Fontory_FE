import { type ChangeEvent, type DragEvent, useCallback, useState } from 'react'

type UseDragAndDropUploadProps = {
  onFileSelect: (file: File) => void
  inputId: string
}

/** 드래그 앤 드롭 파일 업로드를 위한 커스텀 훅 */
export const useDragAndDropUpload = ({
  onFileSelect,
  inputId,
}: UseDragAndDropUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)

      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile) onFileSelect(droppedFile)
    },
    [onFileSelect],
  )

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleFileSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0]
      if (selectedFile) onFileSelect(selectedFile)
    },
    [onFileSelect],
  )

  const openFileDialog = useCallback(() => {
    const input = document.getElementById(inputId) as HTMLInputElement
    input?.click()
  }, [inputId])

  return {
    isDragOver,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileSelect,
    openFileDialog,
  }
}
