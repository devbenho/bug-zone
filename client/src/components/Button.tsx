import React, { MouseEventHandler } from 'react'

interface ButtonProps {
  label: string
  variant?: 'solid' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  onClick?: MouseEventHandler<HTMLButtonElement>
}
const btnConf = {
  solid: `bg-cyan-600 hover:bg-cyan-700 text-zinc-50 text-center p-2 rounded-md text-sm`,
  ghost: `hover:bg-cyan-800 text-zinc-50 text-center p-2 rounded-md text-sm`,
}
const btnSizes = {
  sm: `w-[120px] h-[40px]`,
  md: `w-[180px] h-[40px]`,
  lg: `w-[240px] h-[40px]`,
  xl: `w-[300px] h-[40px]`,
}
export const Button: React.FC<ButtonProps> = ({
  label = 'Button',
  variant = 'solid',
  size = 'lg',
  onClick = () => {
    console.log('Clicked')
  },
}) => {
  // const widthStyle = `w-[${width}px]`
  // const heightStyle = `h-[${height}px]`
  const className = `${btnConf[variant]} ${btnSizes[size]} transition-all duration-500 ease-in-out`

  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  )
}
