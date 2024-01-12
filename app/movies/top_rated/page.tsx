"use client";

import { useEffect, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";

import { getMovies } from "@/services/home.apis";
import { CardData } from "@/typings/typings";
import CardsView from "@/components/Cards-View";

const initialData = {
  page: 0,
  results: [],
  total_pages: 0,
};

const NowPlayingMovies = () => {
  const [isNotFound, setIsNotFound] = useState(false);
  const [topRatedData, setTopRatedData] = useState<CardData>(initialData);
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const fetchLatestMoviesData = async () => {
    const data = await getMovies(page ? parseInt(page) : 1, "top_rated");
    setTopRatedData(data);
  };

  useEffect(() => {
    fetchLatestMoviesData();
  }, []);

  useEffect(() => {
    if (topRatedData.total_pages !== 0) {
      const pageNo = page ? parseInt(page) : 1;

      if (pageNo > topRatedData.total_pages) {
        setIsNotFound(true);
      }
    }
  }, [topRatedData]);

  if (isNotFound) {
    return notFound();
  }

  return (
    <div className="mx-3 md:mx-40 lg:mx-72 my-10">
      <h2 className="font-bold text-xl mb-10">Top Rated Movies</h2>

      <CardsView
        data={topRatedData}
        currentPage={page ? parseInt(page) : 1}
        type="movies/top_rated"
      />
    </div>
  );
};

export default NowPlayingMovies;
