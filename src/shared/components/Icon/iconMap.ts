import type { ComponentType, SVGProps } from 'react'

import iconsChat from '@/assets/icons/chat.svg?react'
import iconsClap from '@/assets/icons/clap.svg?react'
import iconsLogo from '@/assets/icons/logo.svg?react'
import iconsThunder from '@/assets/icons/thunder.svg?react'
import iconsWarehouse from '@/assets/icons/warehouse.svg?react'

export const iconMap = {
  logo: iconsLogo,
  chat: iconsChat,
  clap: iconsClap,
  thunder: iconsThunder,
  warehouse: iconsWarehouse,
}

export type IconName = keyof typeof iconMap
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>
