import { useState } from 'react'
import type { MouseEvent } from 'react'
import { toast } from 'react-toastify'

import { useFontDownloadQuery } from '../services/useFontQuery'
import { downloadFontFile, executeFileDownload } from '../utils/downloadFont'

/** 폰트 파일을 다운로드하고 상태를 관리 */
export const useFontDownload = (fontId: number, fontName: string) => {
  const { refetch } = useFontDownloadQuery(fontId)
  const [isDownloading, setIsDownloading] = useState(false)

  /** 다운로드 URL 조회 */
  const fetchDownloadUrl = async (): Promise<string> => {
    const { data } = await refetch()
    if (!data?.ttf) {
      throw new Error('다운로드 URL을 찾을 수 없습니다.')
    }
    return data.ttf
  }

  /** 폰트 다운로드 핸들러 */
  const handleDownload = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()

    if (isDownloading) return

    setIsDownloading(true)

    try {
      const downloadUrl = await fetchDownloadUrl()
      const blob = await downloadFontFile(downloadUrl)
      executeFileDownload(blob, fontName)
      toast.success(`폰트가 다운로드되었습니다.`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '폰트 다운로드에 실패했습니다.'
      toast.error(errorMessage)
      console.error('폰트 다운로드 실패:', err)
    } finally {
      setIsDownloading(false)
    }
  }

  return {
    isDownloading,
    handleDownload,
  }
}
