import Link from "next/link";
import { ThemeToggler } from "./ThemeToggle";

const Header = () => {
  return (
    <header>
      <div className="flex items-center justify-between h-12 mx-3 lg:mx-24">
        <div className="flex items-center space-x-1.5">
          <Link href="/" className="font-bold text-xl tracking-wider">
            Film Box
          </Link>
        </div>

        <div className="flex items-center space-x-4 ml-5 text-[#6A6A6C] dark:text-white text-sm">
          <Link href="/movies">Movies</Link>
          <Link href="/people">People</Link>
          <Link href="/tv-shows">Tv Shows</Link>

          <ThemeToggler />
        </div>
      </div>
    </header>
  );
};

export default Header;
