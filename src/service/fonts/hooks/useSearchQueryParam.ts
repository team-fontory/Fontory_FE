import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

/** 새로 만든 파라미터 객체를 반환 */
const updateSearchParam = (
  prev: URLSearchParams,
  searchValue: string = '',
): URLSearchParams => {
  const newParams = new URLSearchParams(prev)
  const trimmed = searchValue.trim()

  if (trimmed) newParams.set('search', trimmed)
  else newParams.delete('search')

  newParams.delete('page')
  return newParams
}

type SearchFormData = {
  search: string
}

/** 검색 쿼리 상태와 URL 동기화를 관리하는 훅 */
export const useSearchQueryParam = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentSearchQuery = searchParams.get('search') || ''

  const { register, handleSubmit, watch, setValue } = useForm<SearchFormData>({
    defaultValues: { search: currentSearchQuery },
    mode: 'onChange',
  })

  const currentValue = watch('search')
  const isSubmitDisabled = !currentValue?.trim()

  useEffect(() => {
    setValue('search', currentSearchQuery)
  }, [currentSearchQuery, setValue])

  const onSubmit = (data: SearchFormData) => {
    setSearchParams((prev) => updateSearchParam(prev, data.search))
  }

  const handleClear = () => {
    setValue('search', '')
    setSearchParams((prev) => updateSearchParam(prev))
  }

  return {
    currentValue,
    isSubmitDisabled,
    searchQuery: currentSearchQuery,

    register,
    handleSubmit: handleSubmit(onSubmit),
    handleClear,
  }
}
