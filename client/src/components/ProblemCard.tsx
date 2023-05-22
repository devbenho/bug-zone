import { Link } from 'react-router-dom'
import { iconButtons } from '../constants/iconButtons'
import { Button } from './Button'
import { IconButtonGroup } from './IconButtonGroup'

export interface ProblemCardProbs {
  id: number
  username?: string
  title: string
  discription: string
}
export const ProblemCard: React.FC<ProblemCardProbs> = ({ username, title, discription }) => {
  return (
    <>
      <div className="bg-cyan-900 p-6 rounded-sm mx-[140px] flex flex-col gap-8 hover:bg-zinc-800 transition-all ease-in-out duration-300 cursor-pointer">
        <div className="flex gap-8">
          <div className="flex flex-col gap-2 ">
            <Link to={`/profile/${username}`}>
              <h3 className="text-zinc-300 hover:text-cyan-800 transition-all ease-in-out duration-200">
                @{username}
              </h3>
            </Link>
            <h2 className="text-[22px] text-zinc-200">{title}</h2>
            <p className="text-zinc-300 text-ellipsis line-clamp-2">{discription}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Button label="Show Discussion" size="lg" />
          <IconButtonGroup buttons={iconButtons} />
        </div>
      </div>
    </>
  )
}
