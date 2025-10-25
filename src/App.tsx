import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { routes } from './app/router/routes'
import { PageErrorFallback } from './presentation/_components/shared/PageErrorFallback'
import { PageLoader } from './presentation/_components/shared/PageLoader'

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={PageErrorFallback}
      onReset={() => window.location.reload()}
    >
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={createBrowserRouter(routes)} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
