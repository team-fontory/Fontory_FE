import { useEffect, useState } from 'react'

const fontCache = new Map<string, boolean>()
const loadingFonts = new Map<string, Promise<void>>()

/** 폰트가 이미 로드되었는지 확인 */
const isFontLoaded = (fontName: string) => {
  return fontCache.get(fontName) ?? false
}

/** 폰트를 로드하고 캐시에 저장 */
const loadFont = (fontName: string, fontUrl: string) => {
  if (loadingFonts.has(fontName)) return loadingFonts.get(fontName)!

  const loadingPromise = new FontFace(fontName, `url(${fontUrl})`, {
    style: 'normal',
    weight: '400',
  })
    .load()
    .then((loadedFace) => {
      document.fonts.add(loadedFace)
      fontCache.set(fontName, true)
    })
    .catch((error) => {
      console.error(`폰트 다운로드 실패: ${fontName}`, error)
      fontCache.set(fontName, false)
    })
    .finally(() => loadingFonts.delete(fontName))

  loadingFonts.set(fontName, loadingPromise)
  return loadingPromise
}

/** 주어진 웹폰트 URL로 동적으로 @font-face를 등록하고, 적용할 font-family 이름을 반환 */
export const useDynamicFont = (fontName: string, fontUrl: string) => {
  const [isLoaded, setIsLoaded] = useState(() => isFontLoaded(fontName))

  useEffect(() => {
    if (isFontLoaded(fontName)) {
      setIsLoaded(true)
      return
    }

    loadFont(fontName, fontUrl).finally(() => {
      setIsLoaded(isFontLoaded(fontName))
    })
  }, [fontName, fontUrl])

  return { fontFamily: fontName, isLoaded }
}
