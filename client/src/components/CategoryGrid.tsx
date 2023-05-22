import { categories } from '../constants/categories'
import { CategoryCard } from './CategoryCard'

export const CategoryGrid = () => {
  const listItems = categories.map(c => (
    <li>
      <CategoryCard
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
      <div className="flex justify-center items-center mx-[140px] py-[100px]">
        <ul className="grid grid-cols-3 gap-y-10 gap-x-24">{listItems}</ul>
      </div>
    </>
  )
}
