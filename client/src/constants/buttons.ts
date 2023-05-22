import { ButtonProps } from '../components/Button'
interface Button extends ButtonProps {
  id: number
}
export const buttons: Button[] = [
  {
    id: 0,
    label: 'Save',

    onClick: e => {
      console.log(e)
    },
  },
  {
    id: 1,
    label: 'Cancel',
    onClick: e => {
      console.log(e)
    },
  },
  {
    id: 2,
    label: 'Submit',
    onClick: e => {
      console.log(e)
    },
  },
]
