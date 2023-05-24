import { IconButton, IconButtonProps } from './IconButton'
export interface IconButtonGroupProps {
  buttons: IconButtonProps[]
  gap?: number
  dir?: 'flex' | 'flex col'
}
export const IconButtonGroup: React.FC<IconButtonGroupProps> = ({
  buttons,
  gap = 1,
  dir = 'flex',
}) => {
  const listItems = buttons.map(b => (
    <li className="list-none flex justify-center">
      <IconButton key={b.id} label={b.label} Icon={b.Icon} size={b.size} variant={b.variant} />
    </li>
  ))
  const className = `${dir ?? 'flex'} ${gap ?? 'gap-4'}  w-fit bg-cyan-700 rounded-lg p-1`
  return (
    <>
      <div className={className}>{listItems}</div>
    </>
  )
}
