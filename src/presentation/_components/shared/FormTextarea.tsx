import type { TextareaHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/shared/utils/cn'

type Props = {
  name: string
  label: string
  onInput?: (e: React.FormEvent<HTMLTextAreaElement>) => void
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export const FormTextarea = ({ name, label, className, onInput, ...props }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]
  const errorMessage = error?.message?.toString()

  return (
    <div className='flex-column gap-2'>
      <div className='flex-align-center gap-4'>
        <label htmlFor={name} className='text-description text-sm leading-5 font-medium'>
          {label}
        </label>

        {errorMessage && (
          <p className='flex-align-center text-error gap-1 text-sm'>{errorMessage}</p>
        )}
      </div>
      <textarea
        id={name}
        rows={3}
        className={cn(
          'placeholder:text-footer-description w-full resize-none rounded-lg border bg-white p-3 text-base font-normal',
          error ? 'border-error focus:border-error' : 'border-secondary-point',
          className,
        )}
        {...register(name)}
        {...(onInput && { onInput })}
        {...props}
      />
    </div>
  )
}
