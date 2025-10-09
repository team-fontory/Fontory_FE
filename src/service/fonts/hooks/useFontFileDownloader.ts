import { useState } from 'react'
import type { MouseEvent } from 'react'
import { toast } from 'react-toastify'

import { TOAST_MESSAGES } from '@/shared/constants/toast.constant'
import { useFontDownloadQuery } from '@/store/queries/font.query'

import { FontDownloadError } from '../errors/font.error'

/** 폰트 파일 다운로드 */
const fetchFontBlobFromUrl = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new FontDownloadError()
  }

  return response.blob()
}

/** 파일 다운로드 실행 */
const triggerFileDownload = (blob: Blob, fileName: string) => {
  const link = document.createElement('a')
  const downloadUrl = URL.createObjectURL(blob)

  link.href = downloadUrl
  link.download = `${fileName}.ttf`
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  URL.revokeObjectURL(downloadUrl)
}

/** 다운로드 URL 값 얻는 훅 */
const useFontDownloadUrl = (fontId: number, fontName: string) => {
  const params = { fontId }
  const { refetch } = useFontDownloadQuery(params)

  const fetchDownloadUrl = async () => {
    const { data, isError } = await refetch()
    if (isError || !data?.ttf) throw new FontDownloadError(fontName)

    return data.ttf
  }

  return { fetchDownloadUrl }
}

/** 폰트 파일을 다운로드하고 상태를 관리 */
export const useFontFileDownloader = (fontId: number, fontName: string) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const { fetchDownloadUrl } = useFontDownloadUrl(fontId, fontName)

  const handleDownload = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()

    if (isDownloading) return
    setIsDownloading(true)

    fetchDownloadUrl()
      .then(fetchFontBlobFromUrl)
      .then((blob) => triggerFileDownload(blob, fontName))
      .then(() => toast.success(TOAST_MESSAGES.downloadFont.success))
      .catch(() => toast.error(TOAST_MESSAGES.downloadFont.error))
      .finally(() => setIsDownloading(false))
  }

  return { isDownloading, handleDownload }
}
