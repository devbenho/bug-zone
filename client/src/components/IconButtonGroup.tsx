import { IconType } from 'react-icons'
import { IconButton } from './IconButton'

export const IconButtonGroup = (
  buttons: [
    {
      id: number
      label: string
      size: 'sm' | 'md' | 'lg'
      icon: IconType
      variant: 'primary' | 'ghost'
    }
  ],
  dir: 'row' | 'col',
  gap: number
) => {
  const listItems = buttons.map(b => (
    <li>
      <IconButton key={b.id} label={b.label} Icon={b.icon} size={b.size} variant={b.variant} />
    </li>
  ))
  const className = `${gap ?? `gap-1`} ${dir ?? 'row'}`
  return (
    <>
      <div className={className}>{listItems}</div>
    </>
  )
}
