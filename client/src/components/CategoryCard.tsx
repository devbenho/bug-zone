import { Button } from './Button'

export const CategoryCard: React.FC<{
  name?: string
  problems?: number
  solutions?: number
  contributors?: number
}> = ({ problems = 0, solutions = 0, contributors = 0, name = 'Category Test' }) => {
  return (
    <>
      {/* Main Container */}
      <div className="w-[300px] h-[400px] rounded-md flex flex-col bg-brand-800 justify-center items-center transition-all ease-in-out duration-150 hover:bg-zinc-800 hover:cursor-pointer">
        <div className="flex flex-col gap-6 w-[260px] h-[340px] justify-between">
          <div className="title h-[90px]">
            <h1 className="font-bold text-zinc-100 text-[22px]">{name}</h1>
          </div>
          <div className="stats flex flex-col gap-3">
            <h3 className="text-zinc-200">PROBLEMS 👉 {problems}</h3>
            <h3 className="text-zinc-200">SOLUTIONS 👉 {solutions}</h3>
            <h3 className="text-zinc-200">CONTRIBUTORS 👉 {contributors}</h3>
          </div>
          <Button label="Explore" size="lg" />
        </div>
      </div>
    </>
  )
}
