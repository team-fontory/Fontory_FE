import { type InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import { signupAttribute } from '../constants/userConfig'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'>

export const GenderField = ({ ...inputProps }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className='flex-between-center'>
      <label className='mb-2 block text-sm font-medium text-gray-700'>
        {signupAttribute.gender.label}
      </label>
      <div className='flex gap-4'>
        {signupAttribute.gender.options.map((option) => (
          <label key={option.value} className='flex-align-center cursor-pointer gap-2'>
            <input
              type='radio'
              value={option.value}
              {...register(signupAttribute.gender.section)}
              {...inputProps}
              className='accent-primary'
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {errors.gender && (
        <p className='mt-1 text-xs text-red-500'>{errors.gender.message?.toString()}</p>
      )}
    </div>
  )
}
