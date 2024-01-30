"use client";

import { useState } from "react";
import { useStore } from "@/store/store";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Link from "next/link";

interface MenuType {
  movies: boolean;
  people: boolean;
  tv: boolean;
}

const HeaderResponsive = () => {
  const { isResponsiveMenu } = useStore();

  const [isMenuOpen, setIsMenuOpen] = useState<MenuType>({
    movies: false,
    people: false,
    tv: false,
  });

  const isTrue = Object.values(isMenuOpen).some((menuVal) => Boolean(menuVal));

  const handleMenuChange = (menuType: string) => {
    setIsMenuOpen((prevMenu) => {
      const updatedMenu: MenuType = {
        ...prevMenu,
        [menuType]: true,
      };

      Object.keys(updatedMenu).forEach((key) => {
        if (key !== menuType) {
          updatedMenu[key as keyof MenuType] = false;
        }
      });

      return updatedMenu;
    });
  };

  const resetMenu = () => {
    setIsMenuOpen(() => {
      return {
        movies: false,
        people: false,
        tv: false,
      };
    });
  };

  return (
    isResponsiveMenu && (
      <div className="bg-[#020817] border-l-2 border-t-2 top-15 right-0 h-full w-2/5 fixed">
        {!isTrue && (
          <>
            <div
              className="cursor-pointer hover:bg-gray-800 flex items-center p-4 space-x-2 text-sm"
              onClick={() => handleMenuChange("movies")}
            >
              <p>Movies</p>

              <ChevronRight size={14} />
            </div>

            <div
              className="cursor-pointer hover:bg-gray-800  flex items-center p-4 space-x-2 text-sm"
              onClick={() => handleMenuChange("people")}
            >
              <p>People</p>

              <ChevronRight size={14} />
            </div>

            <div
              className="cursor-pointer hover:bg-gray-800  flex items-center p-4 space-x-2 text-sm"
              onClick={() => handleMenuChange("tv")}
            >
              <p>Tv Shows</p>

              <ChevronRight size={14} />
            </div>
          </>
        )}

        {isTrue && (
          <div
            className="cursor-pointer flex items-center text-sm space-x-2 p-4"
            onClick={resetMenu}
          >
            <ChevronLeft size={14} />
            <p>Back to Main</p>
          </div>
        )}

        {isTrue && isMenuOpen.movies && (
          <div className="my-2 w-full">
            <Link href="/movies/now_playing?page=1">
              <p className="cursor-pointer p-4 hover:bg-gray-800 text-sm">
                Now Playing
              </p>
            </Link>
            <Link href="/movies/popular?page=1">
              <p className="cursor-pointer p-4 hover:bg-gray-800 text-sm">
                Popular
              </p>
            </Link>
            <Link href="/movies/top_rated?page=1">
              <p className="cursor-pointer p-4 hover:bg-gray-800 text-sm">
                Top Rated
              </p>
            </Link>
          </div>
        )}

        {isTrue && isMenuOpen.people && (
          <div className="my-2">
            <Link href="/people/popular?page=1">
              <p className="cursor-pointer p-4 hover:bg-gray-800 text-sm">
                Popular
              </p>
            </Link>
          </div>
        )}

        {isTrue && isMenuOpen.tv && (
          <div className="my-2 w-full">
            <Link href="/tv/on_the_air?page=1">
              <p className="cursor-pointer p-4 hover:bg-gray-800 text-sm">
                On the Air
              </p>
            </Link>
            <Link href="/tv/popular?page=1">
              <p className="cursor-pointer p-4 hover:bg-gray-800 text-sm">
                Popular
              </p>
            </Link>
            <Link href="/tv/top_rated?page=1">
              <p className="cursor-pointer p-4 hover:bg-gray-800 text-sm">
                Top Rated
              </p>
            </Link>
          </div>
        )}
      </div>
    )
  );
};

export default HeaderResponsive;
