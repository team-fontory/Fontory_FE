import { Icon } from '@/presentation/components/shared/Icon/Icon'
import {
  TESTIMONIALS,
  type TestimonialType,
} from '@/shared/constants/landing.constant'

type StarRatingProps = {
  rating: number
  userName: string
}

/** 사용자 이름과 평점을 받아 5점 만점 중 별점을 시각적으로 표현 */
const StarRating = ({ rating, userName }: StarRatingProps) => {
  return (
    <div
      className='flex-align-center gap-0.5'
      role='img'
      aria-label={`${userName}님의 평점: 5점 만점에 ${rating}점`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Icon
          key={index}
          name={index < rating ? 'full-star' : 'unfilled-star'}
          size={16}
        />
      ))}
    </div>
  )
}

/** 사용자 이름, 평점, 후기 내용을 카드 형태로 표시하는 컴포넌트 */
const TestimonialCard = ({ name, rate, description }: TestimonialType) => (
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

/** 실제 사용자 후기 섹션 컴포넌트 */
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
