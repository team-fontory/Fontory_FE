import { useFormContext } from 'react-hook-form'

import { cn } from '@/shared/utils/cn'

type RadioOption<T extends string> = {
  value: T
  label: string
}

type FormRadioGroupProps<T extends string> = {
  name: string
  label: string
  options: readonly RadioOption<T>[]
  className?: string
  disabled?: boolean
}

export const FormRadioGroup = <T extends string>({
  name,
  label,
  options,
  className,
  disabled = false,
}: FormRadioGroupProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]
  const errorMessage = error?.message?.toString()

  return (
    <div className={cn('flex-column gap-2', className)}>
      <div className='flex-between-center'>
        <label className='text-description text-sm leading-5 font-medium'>{label}</label>
        <div className='flex gap-4'>
          {options.map((option) => (
            <label key={option.value} className='flex-align-center cursor-pointer gap-2'>
              <input
                type='radio'
                value={option.value}
                {...register(name)}
                className='accent-primary'
                disabled={disabled}
              />
              <span className='text-sm'>{option.label}</span>
            </label>
          ))}
        </div>
      </div>
      {errorMessage && <p className='text-error text-xs'>{errorMessage}</p>}
    </div>
  )
}
