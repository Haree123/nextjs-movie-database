"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { useRouter } from "next/navigation";
import { SearchIcon, X } from "lucide-react";

import { useStore } from "@/store/store";

const HeaderNavigationMenu = () => {
  const router = useRouter();
  const { isSearchOpen, handleSearch } = useStore();

  return (
    <>
      <button
        className="transition ease-in-out duration-1000 transform hover:scale-110"
        onClick={() => {
          handleSearch();
        }}
      >
        {!isSearchOpen ? <SearchIcon size={20} /> : <X size={20} />}
      </button>
      
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Movies</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-[150px]">
                <li
                  className="p-3 hover:bg-accent hover:text-accent-foreground"
                  onClick={() => router.push("/movies/now_playing?page=1")}
                >
                  Now Playing
                </li>
                <li
                  className="p-3 hover:bg-accent hover:text-accent-foreground"
                  onClick={() => router.push("/movies/popular?page=1")}
                >
                  Popular
                </li>
                <li
                  className="p-3 hover:bg-accent hover:text-accent-foreground"
                  onClick={() => router.push("/movies/top_rated?page=1")}
                >
                  Top Rated
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>People</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-[150px]">
                <li
                  className="p-3 hover:bg-accent hover:text-accent-foreground"
                  onClick={() => router.push("/people/popular?page=1")}
                >
                  Popular
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Tv Shows</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-[150px]">
                <li
                  className="p-3 hover:bg-accent hover:text-accent-foreground"
                  onClick={() => router.push("/tv/on_the_air?page=1")}
                >
                  On the Air
                </li>
                <li
                  className="p-3 hover:bg-accent hover:text-accent-foreground"
                  onClick={() => router.push("/tv/popular?page=1")}
                >
                  Popular
                </li>
                <li
                  className="p-3 hover:bg-accent hover:text-accent-foreground"
                  onClick={() => router.push("/tv/top_rated?page=1")}
                >
                  Top Rated
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default HeaderNavigationMenu;
