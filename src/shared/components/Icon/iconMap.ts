import type { ComponentType, SVGProps } from 'react'

import iconsLogo from '@/assets/icons/logo.svg?react'

export const iconMap = {
  logo: iconsLogo,
}

export type IconName = keyof typeof iconMap
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>
