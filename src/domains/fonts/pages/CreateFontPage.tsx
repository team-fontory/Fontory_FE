import { FormProvider } from 'react-hook-form'

import { Icon } from '@/shared/components/Icon/Icon'
import { Input } from '@/shared/components/Input'
import { PrimaryButton } from '@/shared/components/PrimaryButton'
import { useCustomForm } from '@/shared/hooks/useCustomForm'

import { CreateFontStepSection } from '../components/CreateFontStepSection'
import { FileUpload } from '../components/FileUpload'
import { FontInfoForm } from '../components/FontInfoForm'
import {
  createFontAttribute,
  createFontDefaultValues,
  createFontSchema,
} from '../constants/createFontConfig'

const CreateFontPage = () => {
  const formmethod = useCustomForm(createFontSchema, { defaultValues: createFontDefaultValues })

  return (
    <FormProvider {...formmethod}>
      <div className='mx-auto my-12 max-w-[960px]'>
        <header className='flex-column items-center gap-4'>
          <h2 className='font-jalnan text-accent-light text-4xl'>나만의 손글씨 폰트 제작</h2>
          <p className='text-description text-lg leading-7 font-normal'>
            아래 단계를 따라 진행하면 단 10분이면 완성됩니다.
          </p>
        </header>

        <main className='flex-column mt-12 gap-10'>
          <CreateFontStepSection
            step={1}
            title='다운로드 및 작성'
            description='템플릿에 따라 글자를 작성하고, 완료되면 PNG 또는 JPG로 저장하세요.'
          >
            <PrimaryButton size='md' secondary className='flex-align-center mt-4 gap-2 self-center'>
              <Icon name={'download'} size={16} />
              <span>템플릿 다운로드</span>
            </PrimaryButton>
          </CreateFontStepSection>

          <CreateFontStepSection
            step={2}
            title='작성한 템플릿 업로드'
            description='작성한 템플릿 이미지 파일을 업로드하세요.'
          >
            <FileUpload section={createFontAttribute.file.section} />
          </CreateFontStepSection>

          <CreateFontStepSection
            step={3}
            title='글꼴 정보 입력'
            description='폰트의 기본 정보를 입력해주세요.'
          >
            <FontInfoForm />
          </CreateFontStepSection>

          <CreateFontStepSection
            step={4}
            title='연락처 정보 입력 (선택)'
            description='폰트 제작이 완료되면 문자 알림을 전송해드려요.'
            isActive={false}
          >
            <Input
              section={createFontAttribute.phoneNumber.section}
              label={createFontAttribute.phoneNumber.label}
              placeholder={createFontAttribute.phoneNumber.placeholder}
              onInput={createFontAttribute.phoneNumber.onInput}
            />
          </CreateFontStepSection>

          <PrimaryButton size='md' className='mt-12 self-end'>
            폰트 생성하기
          </PrimaryButton>
        </main>
      </div>
    </FormProvider>
  )
}

export default CreateFontPage
