import { useEffect, useState } from 'react'

type Props = {
  fontName: string
  fontUrl: string
}

/**
 * 주어진 웹폰트 URL로 동적으로 @font-face를 등록하고, 적용할 font-family 이름을 반환
 */

export const useDynamicFont = ({ fontName, fontUrl }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const fontFace = new FontFace(fontName, `url(${fontUrl})`, {
      style: 'normal',
      weight: '400',
    })

    fontFace
      .load()
      .then((loadedFace) => {
        document.fonts.add(loadedFace)
        setIsLoaded(true)
      })
      .catch((err) => {
        console.error(`폰트 로드 실패 (${fontName}):`, err)
      })
  }, [fontUrl, fontName])

  return { fontFamily: fontName, isLoaded }
}
