/** 히어로 섹션에 사용될 고정 컨텐츠 */
export const HERO_CONTENT = {
  title: '나만의 손글씨 폰트',
  description: {
    line1:
      '자신만의 개성과 감성을 담은 개인 맞춤형 손글씨 폰트를 디자인해보세요.',
    line2:
      '디자이너부터 취미로 즐기는 분들까지, 누구에게나 완벽한 맞춤형 글씨체 경험을 제공합니다.',
  },
  buttonText: '제작 시작하기',
} as const

/** 서비스 핵심 가치 데이터 배열 */
export const SERVICE_VALUES = [
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

export type ServiceValueType = (typeof SERVICE_VALUES)[number]

/** 사용자 후기 데이터 목록 */
export const TESTIMONIALS = [
  {
    name: '생각하는 라이언',
    rate: 5,
    description:
      '"디자이너가 아니라도 내 손글씨 폰트를 만들 수 있다는 점이 좋았어요. 작업 시간도 짧고 결과물 퀄리티가 만족스럽네요."',
  },
  {
    name: '애교뿜뿜 어피치',
    rate: 5,
    description:
      '“가족들과 함께 각자만의 폰트를 만들어봤어요. 아버지와 어머니의 폰트를 합성해보면서 즐거운 시간을 보낼 수 있었습니다.”',
  },
  {
    name: '신난 무지',
    rate: 4,
    description:
      '"생각보다 잘 나와서 신기했어요. 발표 자료에서 강조하고 싶은 부분에 활용하면 좋을 것 같아요."',
  },
] as const

export type TestimonialType = (typeof TESTIMONIALS)[number]

/** 최종 CTA 섹션에 사용될 고정 컨텐츠 */
export const CTA_CONTENT = {
  title: '나만의 폰트를 만들어볼 준비 되셨나요?',
  buttonText: '지금 바로 제작하기',
} as const
