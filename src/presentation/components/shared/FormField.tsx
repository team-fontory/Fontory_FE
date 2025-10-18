import type { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/shared/utils/cn'

type FormFieldProps = {
  name: string
  label: string
} & InputHTMLAttributes<HTMLInputElement>

export const FormField = ({
  name,
  label,
  className,
  ...props
}: FormFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]
  const errorMessage = error?.message?.toString()

  return (
    <div className='flex-column gap-2'>
      <div className='flex-align-center gap-4'>
        <label
          htmlFor={name}
          className='text-description text-sm leading-5 font-medium'
        >
          {label}
        </label>

        {errorMessage && (
          <p className='flex-align-center text-error gap-1 text-sm'>
            {errorMessage}
          </p>
        )}
      </div>
      <input
        id={name}
        className={cn(
          'placeholder:text-footer-description disabled:bg-secondary w-full rounded-lg border bg-white p-3 text-base font-normal',
          error ? 'border-error focus:border-error' : 'border-secondary-point',
          className,
        )}
        {...register(name)}
        {...props}
      />
    </div>
  )
}
