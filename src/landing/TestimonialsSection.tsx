import { Icon } from '@/presentation/components/shared/Icon/Icon'

type Testimonial = {
  name: string
  rate: number
  description: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: '고로켕',
    rate: 5,
    description:
      '"Great platform for font creation. The interface is user-friendly, but I wish there were more advanced customization options."',
  },
  {
    name: '고로냐',
    rate: 3,
    description:
      '"I\'ve always wanted to create my own font, and this platform made it incredibly easy. The tools are intuitive, and the results are stunning!"',
  },
  {
    name: '구렇다',
    rate: 4,
    description:
      '"Absolutely love this font creation tool! It\'s perfect for both beginners and experienced designers. Highly recommend!"',
  },
] as const

const StarRating = ({
  rating,
  userName,
}: {
  rating: number
  userName: string
}) => (
  <div
    className='flex-align-center gap-0.5'
    role='img'
    aria-label={`${userName}님의 평점: 5점 만점에 ${rating}점`}
  >
    {Array.from({ length: rating }).map((_, index) => (
      <Icon key={`filled-${index}`} name='full-star' size={16} />
    ))}
    {Array.from({ length: 5 - rating }).map((_, index) => (
      <Icon key={`empty-${index}`} name='unfilled-star' size={16} />
    ))}
  </div>
)

const TestimonialCard = ({ name, rate, description }: Testimonial) => (
  <article className='flex-column border-secondary-point gap-4 rounded-lg border p-6'>
    <div className='flex-align-center text-accent gap-4 font-semibold'>
      <div
        className='bg-secondary h-12 w-12 rounded-full'
        role='img'
        aria-label={`${name}님의 프로필 이미지`}
      />
      <div className='flex-column'>
        <p className='text-base leading-6'>{name}</p>
        <StarRating rating={rate} userName={name} />
      </div>
    </div>
    <blockquote className='text-description text-base leading-[26px]'>
      {description}
    </blockquote>
  </article>
)

export const TestimonialsSection = () => {
  return (
    <section className='py-16' aria-labelledby='testimonials-title'>
      <h2
        id='testimonials-title'
        className='mb-10 text-center text-[30px] leading-[37.5px] font-bold'
      >
        실제 사용자 후기
      </h2>
      <div className='grid grid-cols-3 gap-8'>
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard key={testimonial.name} {...testimonial} />
        ))}
      </div>
    </section>
  )
}
