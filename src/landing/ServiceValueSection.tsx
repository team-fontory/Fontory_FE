import { Icon } from '@/presentation/components/shared/Icon/Icon'

type ServiceValue = {
  title: string
  description: string
  icon: 'thunder' | 'chat' | 'clap' | 'warehouse'
}

const SERVICE_VALUES: ServiceValue[] = [
  {
    title: 'AI 기반 빠른 속도',
    description:
      'AI 기술을 통해 짧은 시간 안에 완성되어\r\n창의성에 집중할 수 있게 해줍니다.',
    icon: 'thunder',
  },
  {
    title: 'SMS 알림',
    description: '글꼴 제작이 완료되는 즉시\r\n문자 메시지를 보내드립니다.',
    icon: 'chat',
  },
  {
    title: '간단함 & 간편함',
    description:
      '복잡한 프로세스나 디자인 기술이 필요하지 않습니다.\r\n누구나 쉽게 맞춤형 글꼴을 만들 수 있습니다.',
    icon: 'clap',
  },
  {
    title: '자동화된 문자 생성',
    description:
      '48자만 입력하면\r\nAI가 나머지 글꼴을 자동으로 생성해 드립니다.',
    icon: 'warehouse',
  },
] as const

const ServiceValueCard = ({ title, description, icon }: ServiceValue) => (
  <article className='bg-secondary flex-column items-center gap-4 rounded-lg p-8'>
    <div
      className='bg-patterns flex-center h-12 w-12 rounded-full'
      role='img'
      aria-label={`${title} 아이콘`}
    >
      <Icon name={icon} size={24} className='text-primary' />
    </div>
    <h3 className='text-accent text-center text-xl leading-7 font-bold'>
      {title}
    </h3>
    <p className='text-description text-center text-base leading-6 whitespace-pre-line'>
      {description}
    </p>
  </article>
)

export const ServiceValueSection = () => {
  return (
    <section className='py-16' aria-labelledby='service-values-title'>
      <div className='sr-only'>
        <h2 id='service-values-title'>Fontory 서비스의 핵심 가치</h2>
      </div>
      <div className='grid grid-cols-2 grid-rows-2 gap-x-16 gap-y-[88px]'>
        {SERVICE_VALUES.map((serviceValue) => (
          <ServiceValueCard key={serviceValue.title} {...serviceValue} />
        ))}
      </div>
    </section>
  )
}
