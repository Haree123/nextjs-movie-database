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
  const [nowPlayingData, setNowPlayingData] = useState<CardData>(initialData);
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const fetchLatestMoviesData = async () => {
    const data = await getMovies(page ? parseInt(page) : 1, "now_playing");
    setNowPlayingData(data);
  };

  useEffect(() => {
    fetchLatestMoviesData();
  }, []);

  useEffect(() => {
    if (nowPlayingData.total_pages !== 0) {
      const pageNo = page ? parseInt(page) : 1;

      if (pageNo > nowPlayingData.total_pages) {
        setIsNotFound(true);
      }
    }
  }, [nowPlayingData]);

  if (isNotFound) {
    return notFound();
  }

  return (
    <div className="mx-3 md:mx-40 lg:mx-72 my-10">
      <h2 className="font-bold text-xl mb-10">Now Playing Movies</h2>

      <CardsView
        data={nowPlayingData}
        currentPage={page ? parseInt(page) : 1}
        type="movies"
        urlType="movies/now_playing"
      />
    </div>
  );
};

export default NowPlayingMovies;
