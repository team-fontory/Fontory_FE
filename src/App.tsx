import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { routes } from './app/router/routes'
import { PageError } from './presentation/components/shared/PageError'
import { PageLoader } from './presentation/components/shared/PageLoader'

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={PageError}
      onReset={() => window.location.reload()}
    >
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={createBrowserRouter(routes)} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
