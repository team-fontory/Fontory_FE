import { FormField } from '@/presentation/components/shared/FormField'
import { FormTextarea } from '@/presentation/components/shared/FormTextarea'
import { PrimaryButton } from '@/presentation/components/shared/PrimaryButton'
import { CreateFontStepSection } from '@/presentation/font-create/component/CreateFontStepSection'
import { FONT_FIELDS } from '@/service/fonts/font.config'

type FontInfoSectionProps = {
  onFontNameCheck: () => void
  canCheck: boolean
}

/** 폰트 정보 입력 폼 컴포넌트 */
export const FontInfoSection = ({
  onFontNameCheck,
  canCheck,
}: FontInfoSectionProps) => {
  return (
    <CreateFontStepSection
      step={1}
      title='글꼴 정보 입력'
      description='폰트의 기본 정보를 입력해주세요.'
    >
      <div className='flex-column gap-6'>
        <div className='grid grid-cols-2 gap-6'>
          {/* 폰트 이름 필드 */}
          <div className='flex items-end gap-2'>
            <div className='flex-1'>
              <FormField
                name={FONT_FIELDS.name.name}
                label={FONT_FIELDS.name.label}
                placeholder={FONT_FIELDS.name.placeholder}
                minLength={FONT_FIELDS.name.minLength}
                maxLength={FONT_FIELDS.name.maxLength}
                required
              />
            </div>
            <PrimaryButton
              type='button'
              size='md'
              onClick={onFontNameCheck}
              disabled={!canCheck}
              className='h-[50px]'
            >
              중복체크
            </PrimaryButton>
          </div>

          {/* 폰트 영어 이름 필드 */}
          <FormField
            name={FONT_FIELDS.engName.name}
            label={FONT_FIELDS.engName.label}
            placeholder={FONT_FIELDS.engName.placeholder}
            maxLength={12}
            onInput={(e) => {
              const input = e.currentTarget
              input.value = input.value.match(/[a-zA-Z]/g)?.join('') || ''
            }}
            required
          />
        </div>
        <FormTextarea
          name={FONT_FIELDS.example.name}
          label={FONT_FIELDS.example.label}
          placeholder={FONT_FIELDS.example.placeholder}
          minLength={FONT_FIELDS.example.minLength}
          maxLength={FONT_FIELDS.example.maxLength}
          required
        />
      </div>
    </CreateFontStepSection>
  )
}
