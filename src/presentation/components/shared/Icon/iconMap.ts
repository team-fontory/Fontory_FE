import type { ComponentType, SVGProps } from 'react'

import iconsChat from '@/assets/icons/chat.svg?react'
import iconsClap from '@/assets/icons/clap.svg?react'
import iconsDownload from '@/assets/icons/download.svg?react'
import iconsFullStar from '@/assets/icons/full-star.svg?react'
import iconsHeart from '@/assets/icons/heart.svg?react'
import iconsLogo from '@/assets/icons/logo.svg?react'
import iconsSearch from '@/assets/icons/search.svg?react'
import iconsThunder from '@/assets/icons/thunder.svg?react'
import iconsUnfilledStar from '@/assets/icons/unfilled-star.svg?react'
import iconsWarehouse from '@/assets/icons/warehouse.svg?react'

export const iconMap = {
  logo: iconsLogo,
  chat: iconsChat,
  clap: iconsClap,
  thunder: iconsThunder,
  warehouse: iconsWarehouse,
  search: iconsSearch,
  heart: iconsHeart,
  download: iconsDownload,
  'full-star': iconsFullStar,
  'unfilled-star': iconsUnfilledStar,
}

export type IconName = keyof typeof iconMap
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>
