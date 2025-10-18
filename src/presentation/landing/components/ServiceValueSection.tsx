import { Icon } from '@/presentation/components/shared/Icon/Icon'
import {
  SERVICE_VALUES,
  type ServiceValueType,
} from '@/shared/constants/landing.constant'

/** 서비스 핵심 가치 카드 컴포넌트 */
const ServiceValueCard = ({ title, description, icon }: ServiceValueType) => (
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

/** 서비스 핵심 가치 섹션 컴포넌트 */
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
