import { FaThumbsUp, FaArrowUp, FaShareAlt } from 'react-icons/fa'
import { IconButtonProps } from '../components/IconButton'
export const iconButtons: IconButtonProps[] = [
  {
    id: 1,
    variant: 'primary',
    Icon: FaThumbsUp,
    label: 'Like',
    size: 'sm',
  },
  {
    id: 2,
    variant: 'primary',
    Icon: FaArrowUp,
    label: 'Solutions',
    size: 'sm',
  },
  {
    id: 3,
    variant: 'primary',
    Icon: FaShareAlt,
    label: 'Share',
    size: 'sm',
  },
]
