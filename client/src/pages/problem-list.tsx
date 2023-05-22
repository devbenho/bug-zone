import { NavBar } from '../components/NavBar'
import { ProblemCard, ProblemCardProbs } from '../components/ProblemCard'
export interface ProblemListProps {
  problems: ProblemCardProbs[]
  category: string
}
export const ProblemList: React.FC<ProblemListProps> = ({ problems, category }) => {
  const listItems = problems.map(p => (
    <li>
      <ProblemCard id={p.id} title={p.title} discription={p.discription} username={p.username} />
    </li>
  ))
  return (
    <>
      {/* Main container */}
      <div className="bg-[#042631] h-full w-full">
        <div className="">
          <NavBar />
          <h1 className="font-extrabold text-zinc-200 text-[32px] mx-[140px] my-[20px]">
            {category}
          </h1>
          <div className="flex gap-3 flex-col list-none">
            {/* Problems List */}
            {listItems}
          </div>
        </div>
      </div>
    </>
  )
}
