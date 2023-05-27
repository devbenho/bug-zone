import { Link } from 'react-router-dom'
import { Button } from './Button'

export const NavBar = () => {
  return (
    <>
      <nav className="flex justify-between items-center px-4 py-2 mx-[140px]">
        {/* Logo */}
        <Link to={'/'}>
          <h1 className="text-blue-100 font-extrabold">BUGZONE</h1>
        </Link>
        {/* NavLinks */}
        <ul className="flex justify-between items-center gap-6">
          <li className="text-cyan-100 hover:bg-brand-800 py-2 px-4 hover:rounded-md hover:text-cyan-600 transition-all ease-in-out duration-150">
            <Link to={'/'}>Home</Link>
          </li>
          <li className="text-cyan-100 hover:bg-brand-800 py-2 px-4 hover:rounded-md hover:text-cyan-600 transition-all ease-in-out duration-150">
            <Link to={'/'}>About</Link>
          </li>
          <li className="text-cyan-100 hover:bg-zinc-800 py-2 px-4 hover:rounded-md hover:text-cyan-600 transition-all ease-in-out duration-150">
            <Link to={'/'}>Support</Link>
          </li>
          <li className="text-cyan-100 hover:bg-zinc-800 py-2 px-4 hover:rounded-md hover:text-cyan-600 transition-all ease-in-out duration-150">
            <Link to={'/'}>Contact</Link>
          </li>
        </ul>
        {/* NavButtons */}
        <div className="flex gap-3">
          <Button label="Login" variant="ghost" size="sm" />
          <Button label="Register" size="sm" />
        </div>
      </nav>
    </>
  )
}
