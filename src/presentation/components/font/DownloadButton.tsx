import { useFontFileDownloader } from '@/service/fonts/hooks/useFontFileDownloader'
import { Icon } from '@/shared/components/Icon/Icon'

type DownloadButtonProps = {
  fontName: string
  fontId: number
}

/** 폰트 다운로드 버튼 컴포넌트 */
export const DownloadButton = ({ fontName, fontId }: DownloadButtonProps) => {
  const { isDownloading, handleDownload } = useFontFileDownloader(
    fontId,
    fontName,
  )

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
