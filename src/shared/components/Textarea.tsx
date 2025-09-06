import type { TextareaHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import { cn } from '../utils/cn'

type Props = {
  section: string
  label: string
  hint?: string
  className?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = ({ section, label, hint, className, ...rest }: Props) => {
  const { formState, register } = useFormContext()
  const errorMessage = formState.errors[section]?.message?.toString()
  const message = errorMessage || hint
  const hasError = !!errorMessage

  const textAreaClassName = cn(
    'border-secondary-point w-full rounded-lg border bg-white p-3 text-base font-normal resize-none placeholder:text-footer-description',
    hasError && 'border-error focus:border-error',
    className,
  )

  const getMessageStyle = () => {
    if (errorMessage) return 'text-error text-sm'
    return 'text-footer-description text-sm'
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
            className={cn('flex-align-center gap-1', getMessageStyle())}
            role={errorMessage ? 'alert' : undefined}
            aria-live={errorMessage ? 'assertive' : 'polite'}
          >
            {message}
          </p>
        )}{' '}
      </div>
      <textarea
        id={section}
        rows={3}
        className={textAreaClassName}
        aria-invalid={hasError}
        aria-describedby={message ? `${section}-message` : undefined}
        aria-required={rest.required}
        {...register(section)}
        {...rest}
      />
    </div>
  )
}
