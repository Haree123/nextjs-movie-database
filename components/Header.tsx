import Link from "next/link";
import HeaderNavigationMenu from "./Header-Menu";

const Header = () => {
  return (
    <header>
      <div className="flex items-center justify-between h-12 mx-3 lg:mx-24">
        <div className="flex items-center space-x-1.5">
          <Link
            href="/"
            className="font-bold text-sm md:text-xl tracking-wider"
          >
            Film Box
          </Link>
        </div>

        <div className="flex items-center space-x-4 ml-5 text-sm">
          <HeaderNavigationMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
