"use client";

import { useEffect, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CardData } from "@/typings/typings";
import { getMovies } from "@/services/home.apis";
import CardsView from "@/components/Cards-View";
import ResponsiveCustomFilters from "@/components/filters/ResponsiveFilters";
import CustomFilters from "@/components/filters/Filters";

const initialData = {
  page: 0,
  results: [],
  total_results: 0,
  total_pages: 0,
};

const PopularMovies = () => {
  const [isNotFound, setIsNotFound] = useState(false);
  const [popularData, setPopularData] = useState<CardData>(initialData);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [isFilterReseted, setIsFilterReseted] = useState(false);
  const [responsiveFilter, setResponsiveFilter] = useState(false);

  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const fetchLatestMoviesData = async () => {
    const data = await getMovies(page ? parseInt(page) : 1, "popular");
    setPopularData(data);
  };

  useEffect(() => {
    if (!isFilterApplied) {
      fetchLatestMoviesData();
    }
  }, []);

  useEffect(() => {
    if (isFilterReseted) {
      fetchLatestMoviesData();
      setIsFilterReseted(false);
    }
  }, [isFilterReseted]);

  useEffect(() => {
    if (popularData.total_pages !== 0) {
      const pageNo = page ? parseInt(page) : 1;

      if (pageNo > popularData.total_pages) {
        setIsNotFound(true);
      }
    }
  }, [popularData]);

  if (isNotFound) {
    return notFound();
  }

  return (
    <div className="mx-3 my-10 md:mx-auto md:min-w-5/6 md:w-5/6 lg:min-w-3/4 lg:w-3/4">
      <h2 className="font-bold flex justify-between items-center text-xl mb-10">
        Popular Movies
        <div className="md:hidden">
          <Button variant="outline" onClick={() => setResponsiveFilter(true)}>
            Filter
          </Button>

          <ResponsiveCustomFilters
            mediaType="movie"
            open={responsiveFilter}
            setIsFilterApplied={setIsFilterApplied}
            setIsFilterReseted={setIsFilterReseted}
            setData={setPopularData}
            setResponsiveFilter={setResponsiveFilter}
          />
        </div>
      </h2>

      <div className="flex flex-col md:flex-row md:space-x-10 md:items-start mx-auto my-5">
        <div
          className="border-2 hidden md:inline md:w-2/6 lg:w-3/12"
          style={{ borderRadius: "4px" }}
        >
          <CustomFilters
            mediaType="movie"
            setIsFilterApplied={setIsFilterApplied}
            setIsFilterReseted={setIsFilterReseted}
            setData={setPopularData}
          />
        </div>

        <div className="md:w-2/3 lg:w-full">
          <CardsView
            data={popularData}
            currentPage={page ? parseInt(page) : 1}
            type="movies"
            urlType="movies/popular"
          />
        </div>
      </div>
    </div>
  );
};

export default PopularMovies;
