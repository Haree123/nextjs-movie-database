"use client";
import { useEffect, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { CardData } from "@/typings/typings";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginationCards } from "@/components/Pagination";
import { getSearchInfoByQuery } from "@/services/home.apis";

let initialSearchData = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

const SearchQueryByMovie = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page");

  const [isNotFound, setIsNotFound] = useState(false);
  const [searchData, setSearchData] = useState<CardData>(initialSearchData);
  const [peopleCount, setPeopleCount] = useState(0);
  const [tvShowsCount, setTvShowsCount] = useState(0);

  const fetchSearchQueryData = async () => {
    const data = await getSearchInfoByQuery(
      "movie",
      page ? page : String(1),
      query ? query : ""
    );

    const peopleData: CardData = await getSearchInfoByQuery(
      "person",
      page ? page : String(1),
      query ? query : ""
    );

    const tvShowsData = await getSearchInfoByQuery(
      "movie",
      page ? page : String(1),
      query ? query : ""
    );

    setSearchData(data);
    setPeopleCount(peopleData.total_results || 0);
    setTvShowsCount(tvShowsData.total_results || 0);
  };

  useEffect(() => {
    fetchSearchQueryData();
  }, []);

  useEffect(() => {
    if (searchData.total_pages !== 0) {
      const pageNo = page ? parseInt(page) : 1;

      if (pageNo > searchData.total_pages) {
        setIsNotFound(true);
      }
    }
  }, [searchData]);

  if (isNotFound) {
    return notFound();
  }

  return (
    <>
      {searchData.page == 0 ? (
        <div>
          <div className="flex flex-col items-center md:flex-row md:space-x-5 md:items-start md:justify-center mx-auto my-5">
            <Skeleton className="h-20 w-1/2 md:h-72 md:w-1/6" />

            <div className="flex flex-col m-4 space-y-5 h-56 w-full px-4 md:m-0 md:w-3/5">
              {Array.from({ length: 10 }).map((_, index) => {
                return (
                  <div key={index} className="border-2 flex space-x-5">
                    <div className="h-40 w-40">
                      <Skeleton className="h-full w-full" />
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <Skeleton className="h-4 w-2/3 my-2 rounded-lg" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-11/12 my-2.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="my-10">
          <div className="flex flex-col items-center md:flex-row md:space-x-5 md:items-start md:justify-center mx-auto my-5">
            <div
              className="border-2 h-fit md:w-1/6"
              style={{ borderRadius: "5px" }}
            >
              <h2
                className="bg-[#01B4E4] font-bold text-lg px-5 py-4"
                style={{ borderRadius: "4px" }}
              >
                Search Results
              </h2>

              <div className="flex flex-row md:flex-col justify-center text-sm">
                <div className="flex justify-between p-5 hover:bg-gray-700">
                  <p className="font-bold">Movies </p>
                  <div>{searchData.total_results || 0}</div>
                </div>
                <Link
                  href={`/search/people?query=${query}&page=1`}
                  className="flex justify-between p-5 hover:bg-gray-700"
                >
                  <p>People</p>
                  <div>{peopleCount}</div>
                </Link>
                <Link
                  href={`/search/tv?query=${query}&page=1`}
                  className="flex justify-between p-5 hover:bg-gray-700"
                >
                  <p>Tv Shows</p>
                  <div>{tvShowsCount}</div>
                </Link>
              </div>
            </div>

            {searchData.results.length > 0 ? (
              <div className="flex flex-col m-4 space-y-5 min-h-[94px] md:m-0 md:w-3/5">
                {searchData.results.map((searchItem) => {
                  return (
                    <Link href={`/movies/${searchItem.id}`}>
                      <div
                        key={searchItem.id}
                        className="border-2 flex space-x-5"
                        style={{ borderRadius: "5px" }}
                      >
                        <div className="min-w-[94px] w-[94px] h-[141px]">
                          <Image
                            className="h-full w-full object-cover"
                            style={{ borderRadius: "5px" }}
                            src={
                              searchItem.poster_path
                                ? `${process.env.NEXT_PUBLIC_TMDB_IMG_URL}${searchItem.poster_path}`
                                : "https://banner2.cleanpng.com/20180628/jvc/kisspng-clapperboard-computer-icons-film-download-movie-poster-5b359e7b2db090.7720687515302406351872.jpg"
                            }
                            alt={
                              searchItem.name ||
                              searchItem.original_name ||
                              searchItem.title
                            }
                            height={0}
                            width={0}
                            sizes="100vw"
                          />
                        </div>

                        <div className="flex flex-col justify-center">
                          <h2 className="font-bold text-lg">
                            {searchItem.name ||
                              searchItem.original_name ||
                              searchItem.title ||
                              "-"}
                          </h2>

                          <p className="text-gray-400 text-sm">
                            {searchItem.release_date
                              ? dayjs(searchItem.release_date).format(
                                  "MMMM DD,YYYY"
                                )
                              : searchItem.first_air_date
                              ? dayjs(searchItem.first_air_date).format(
                                  "MMMM DD,YYYY"
                                )
                              : "-"}
                          </p>

                          <p className="line-clamp-2 mt-5 text-sm">
                            {searchItem.overview || "-"}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="font-bold m-10 text-center w-3/5">No Results</div>
            )}
          </div>

          {searchData.results.length > 0 && (
            <PaginationCards
              currentPage={page ? parseInt(page) : 1}
              type="search/movies"
              query={query}
            />
          )}
        </div>
      )}
    </>
  );
};

export default SearchQueryByMovie;
