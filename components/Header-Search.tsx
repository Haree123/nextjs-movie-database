"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FilmIcon, PersonStanding, Search, TrendingUp, Tv } from "lucide-react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { CardData } from "@/typings/typings";
import { useStore } from "@/store/store";
import { QueryType, getTrending } from "@/services/home.apis";

let initialTrending = {
  page: 0,
  results: [],
  total_results: 0,
  total_pages: 0,
};

const HeaderSearch = () => {
  const { isSearchOpen, handleSearch } = useStore();
  const [isSticky, setIsSticky] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const mediaTypes = ["Movies", "Tv Shows", "People"] as const;
  type MediaTypes = (typeof mediaTypes)[number];

  const [queryType, setQueryType] = useState<QueryType | null>(null);
  const [trendingData, setTrendingData] = useState<CardData>(initialTrending);
  const [inputValue, setInputValue] = useState<string>("");

  const getTrendingData = async () => {
    const data = await getTrending(1, "day");
    setTrendingData(data);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const mediaCustomIcon = (media: MediaTypes) => {
    if (media === "Movies") {
      return <FilmIcon size={15} />;
    } else if (media === "People") {
      return <PersonStanding size={15} />;
    } else {
      return <Tv size={15} />;
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      // handleSearch();
    }
  };

  const handleScroll = () => {
    if (searchRef.current) {
      const offsetTop = searchRef.current.offsetTop;

      // Adjust the offsetTop value based on your needs
      const threshold = 0;

      setIsSticky(window.scrollY > offsetTop - threshold);
    }
  };

  useEffect(() => {
    if (isSearchOpen) {
      getTrendingData();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [searchRef]);

  return (
    isSearchOpen && (
      <div
        ref={searchRef}
        className={`fixed ${
          isSticky ? "top-0 left-0" : "top-15 left-0"
        } bg-[#020817] w-full min-h-fit transition-top ease-in-out duration-50 transform`}
      >
        <div className="flex justify-center items-center w-2/3 py-2 mx-auto">
          <Search size={14} />
          <Input
            autoFocus
            className="border-none focus-visible:ring-transparent text-white"
            type="text"
            placeholder="Search for a movie, tv show, a person"
            value={inputValue}
            onChange={(e) => handleInput(e)}
          />
        </div>

        <div className="flex items-center space-x-2 mx-auto h-10 w-2/3">
          <TrendingUp />
          <h2 className="font-bold text-xl">Trending</h2>
        </div>

        <hr />

        {inputValue.length < 3 && (
          <div>
            {trendingData?.results.slice(0, 10).map((item, index) => {
              return (
                <Link
                  href={`/${item.media_type === "movie" ? "movies" : "tv"}/${
                    item.id
                  }`}
                  onClick={handleSearch}
                >
                  <div
                    key={item.id}
                    className="flex flex-col space-y-2 mt-2 text-sm"
                  >
                    <div className="flex items-center justify-start space-x-3 mx-auto w-2/3">
                      <Search size={14} />
                      <p>
                        {item.name || item.title || item.original_title || "-"}
                      </p>
                    </div>
                    <hr />
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {inputValue.length >= 3 && (
          <div>
            {mediaTypes.map((inputItem) => {
              return (
                <Link
                  href={`/search/${
                    inputItem === "Movies"
                      ? "movies"
                      : inputItem === "Tv Shows"
                      ? "tv"
                      : "people"
                  }?query=${inputValue}&page=1`}
                >
                  <div className="flex flex-col space-y-2 mt-2 text-sm">
                    <div className="flex items-center justify-start space-x-2 mx-auto w-2/3">
                      {mediaCustomIcon(inputItem)}
                      <p>
                        {inputValue} in {inputItem}
                      </p>
                    </div>
                    <hr />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    )
  );
};

export default HeaderSearch;
