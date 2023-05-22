// import { Category } from '../components/Category'
import { CategoryGrid } from '../components/CategoryGrid'
import { NavBar } from '../components/NavBar'

export const Home = () => {
  return (
    <>
      {/* Main container */}
      <div className="bg-[#042631] h-full w-full">
        <div className="">
          {/* NavBar */}
          <NavBar />
          <CategoryGrid />
        </div>
      </div>
    </>
  )
}
