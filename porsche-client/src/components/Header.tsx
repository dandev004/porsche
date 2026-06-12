import { RiMenuLine } from "react-icons/ri";
import { GrLanguage } from "react-icons/gr";
import { Link } from "react-router-dom";
import { GoPerson } from "react-icons/go";


const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 ">
        <RiMenuLine size={18} color="white" />
        <Link to="/">
          <img src="/logo.png" alt="logo" width={30} height={30} />
        </Link>
        <div className="flex gap-4">
          <GrLanguage size={18} color="white"/>
          <GoPerson size={18} color="white" />
        </div>
      </div>
    </header>
  )
}
export default Header
