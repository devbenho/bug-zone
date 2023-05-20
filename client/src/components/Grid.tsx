import { categories } from '../constants/categories'
import { Category } from './Category'

export const Grid = () => {
  const listItems = categories.map(c => (
    <li>
      <Category
        key={c.id}
        name={c.name.toUpperCase()}
        problems={c.problems}
        solutions={c.solutions}
        contributors={c.contributors}
      />
    </li>
  ))
  return (
    <>
      <div className="flex justify-center items-center mx-[140px] py-[160px]">
        <ul className="grid grid-cols-3 gap-y-10 gap-x-20">{listItems}</ul>
      </div>
    </>
  )
}
