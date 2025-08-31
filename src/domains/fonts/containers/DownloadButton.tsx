import { useState } from 'react'

import { Icon } from '@/shared/components/Icon/Icon'

type Props = {
  fontName: string
  fontId: number
  fontAddr?: string
}

/** 폰트 다운로드 버튼 컴포넌트 */
export const DownloadButton = ({ fontName, fontId, fontAddr }: Props) => {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault() // Link 클릭 방지
    e.stopPropagation()

    if (isDownloading) return

    setIsDownloading(true)

    try {
      // API 호출
    } catch (error) {
      console.error('다운로드 오류:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className='flex-align-center bg-secondary text-accent hover:bg-secondary-point gap-1 rounded-md px-3 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50'
      aria-label={`${fontName} 다운로드`}
    >
      <Icon name='download' size={16} />
      다운로드
    </button>
  )
}
