import { RiMenuLine } from "react-icons/ri";
import { GrLanguage } from "react-icons/gr";
import { Link } from "react-router-dom";
import { GoPerson } from "react-icons/go";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      
      <div className="relative flex items-center justify-between px-4 sm:px-8 py-6">

        <RiMenuLine size={18} color="white" />
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <img src="/logo-desktop.png" alt="logo"className="hidden md:block w-[260px]"/>
          <img src="/logo-mobile.png" alt="logo" className="md:hidden w-7.5"
          />
        </Link>

        <div className="flex gap-4">
          <GrLanguage size={18} color="white" />
          <GoPerson size={18} color="white" />
        </div>

      </div>
    </header>
  );
};
export default Header
