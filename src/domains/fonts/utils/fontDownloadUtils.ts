/** 폰트 파일 다운로드 */
export const downloadFontFile = async (url: string): Promise<Blob> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`다운로드 실패: ${response.status}`)
  }
  return response.blob()
}

/** 파일 다운로드 실행 */
export const executeFileDownload = (blob: Blob, fileName: string): void => {
  const downloadLink = document.createElement('a')
  const downloadUrl = URL.createObjectURL(blob)

  downloadLink.href = downloadUrl
  downloadLink.download = `${fileName}.ttf`
  downloadLink.style.display = 'none'

  document.body.appendChild(downloadLink)
  downloadLink.click()

  // 정리
  document.body.removeChild(downloadLink)
  URL.revokeObjectURL(downloadUrl)
}
