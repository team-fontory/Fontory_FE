import { ErrorBoundary } from 'react-error-boundary'

import { PageErrorFallback } from '../_components/shared/PageErrorFallback'

import { ExploreFontSection } from './components/ExploreFontSection'
import { PopularFontSection } from './components/PopularFontSection'

const FontExplorePage = () => {
  return (
    <ErrorBoundary FallbackComponent={PageErrorFallback}>
      <main className='mx-auto my-10 max-w-5xl px-4'>
        <h1 className='font-jalnan py-4 text-3xl leading-9 font-bold'>
          폰트 둘러보기
        </h1>
        <PopularFontSection />
        <ExploreFontSection />
      </main>
    </ErrorBoundary>
  )
}

export default FontExplorePage
