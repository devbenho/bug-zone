import React from 'react'
import { IconType } from 'react-icons'
export interface IconButtonProps {
  id?: number
  label: string
  Icon: IconType
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'ghost'
}
const variants = {
  primary: 'text-zinc-100 ',
  ghost:
    'hover:bg-cyan-600 transition all ease-in-out duration-200 text-cyan-800 hover:text-zinc-100',
}
const sizes = {
  sm: 'h-[24px] px-2',
  md: 'h-[32px] px-3',
  lg: 'h-[40px] px-4',
}

export const IconButton: React.FC<IconButtonProps> = ({
  label,
  Icon,
  size = 'sm',
  variant = 'ghost',
}) => {
  const styles = `${variants[variant]} text-[12px] ${sizes[size]} flex gap-1 items-center justify-center hover:text-cyan-400 hover:bg-cyan-800 rounded-sm transition all ease-in-out duration-300`
  const className = `${styles}`
  const iconStyle = `text-[12px]`
  return (
    <button type="button" className={className}>
      {<Icon className={iconStyle} />}
      {label}
    </button>
  )
}
