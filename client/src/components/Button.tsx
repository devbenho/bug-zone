import React, { MouseEventHandler } from 'react'
// Just a button with label
export interface ButtonProps {
  id?: number
  label: string
  variant?: 'solid' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const btnConf = {
  solid: `bg-brand-700 hover:bg-brand-800 text-zinc-50 text-center p-2 rounded-md text-sm`,
  ghost: `hover:bg-brand-800 text-zinc-50 text-center p-2 rounded-md text-sm`,
}

const btnSizes = {
  sm: `w-[100px] h-[40px]`,
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
  const className = `${btnConf[variant]} ${btnSizes[size]} transition-all duration-500 ease-in-out flex justify-center items-center gap-3`

  return (
    <>
      <button className={className} onClick={onClick}>
        {label}
      </button>
    </>
  )
}
