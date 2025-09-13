import type { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import { cn } from '../utils/cn'

type Props = {
  section: string
  label: string
  hint?: string
  successMessage?: string
  className?: string
  disabled?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export const Input = ({
  section,
  label,
  hint,
  successMessage,
  className,
  disabled = false,
  ...rest
}: Props) => {
  const { formState, register } = useFormContext()
  const errorMessage = formState.errors[section]?.message?.toString()
  const message = errorMessage || successMessage || hint
  const hasError = !!errorMessage

  const inputClassName = cn(
    'border-secondary-point w-full rounded-lg border bg-white p-3 text-base font-normal placeholder:text-footer-description',
    hasError && 'border-error focus:border-error',
    disabled && '!bg-secondary',
    className,
  )

  const getMessageStyle = () => {
    if (errorMessage) return 'text-error'
    if (successMessage) return 'text-success'
    return 'text-footer-description'
  }

  return (
    <div className={cn('flex-column gap-2', className)}>
      <div className='flex-align-center gap-4'>
        <label htmlFor={section} className='text-description text-sm leading-5 font-medium'>
          {label}
        </label>

        {message && (
          <p
            id={`${section}-message`}
            className={cn('flex-align-center gap-1 text-sm', getMessageStyle())}
            role={errorMessage ? 'alert' : undefined}
            aria-live={errorMessage ? 'assertive' : 'polite'}
          >
            {message}
          </p>
        )}
      </div>
      <input
        id={section}
        className={inputClassName}
        aria-invalid={hasError}
        aria-describedby={message ? `${section}-message` : undefined}
        aria-required={rest.required}
        disabled={disabled}
        {...register(section)}
        {...rest}
      />
    </div>
  )
}
