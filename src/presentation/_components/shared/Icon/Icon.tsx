import { type IconComponent, iconMap, type IconName } from './iconMap'

type Props = {
  name: IconName
  size?: number | string
  className?: string
  'aria-label'?: string
} & Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'>

/** `iconMap`에서 `name`에 해당하는 SVG 컴포넌트를 렌더링 */
export const Icon = ({ name, size, className, 'aria-label': ariaLabel, ...props }: Props) => {
  const SvgIcon: IconComponent | undefined = iconMap[name]

  if (!SvgIcon) {
    if (import.meta.env.DEV) {
      console.error(`Icon "${name}"은 등록되어있지 않습니다.`)
    }
    return null
  }

  return (
    <SvgIcon
      width={size}
      height={size}
      className={className ?? undefined}
      aria-label={ariaLabel ?? name}
      role='img'
      {...props}
    />
  )
}
