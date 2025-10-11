type PageErrorProps = {
  error: Error
  resetErrorBoundary: () => void
}

export const PageError = ({ error, resetErrorBoundary }: PageErrorProps) => (
  <div className='flex min-h-screen flex-col items-center justify-center p-4'>
    <h2 className='text-red mb-4 text-2xl font-bold'>문제가 발생했습니다</h2>
    <p className='mb-4 text-gray-600'>{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className='bg-primary hover:bg-primary-dark rounded px-4 py-2 text-white'
    >
      다시 시도
    </button>
  </div>
)
