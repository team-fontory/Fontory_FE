import { Icon } from '@/presentation/components/shared/Icon/Icon'
import { PrimaryButton } from '@/presentation/components/shared/PrimaryButton'

import { CreateFontStepSection } from './CreateFontStepSection'

export const TemplateDownloadSection = () => {
  return (
    <CreateFontStepSection
      step={1}
      title='다운로드 및 작성'
      description='템플릿에 따라 글자를 작성하고, 완료되면 PNG 또는 JPG로 저장하세요.'
    >
      <a
        href='/template/font_template.png'
        download='폰트 제작 템플릿.png'
        className='mt-4 self-center'
      >
        <PrimaryButton
          size='md'
          secondary
          className='flex-align-center mt-4 gap-2 self-center'
        >
          <Icon name={'download'} size={16} />
          <span>템플릿 다운로드</span>
        </PrimaryButton>
      </a>
    </CreateFontStepSection>
  )
}
