"use client";

import { useEffect, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";

import { getTvShows } from "@/services/home.apis";
import { CardData } from "@/typings/typings";
import CardsView from "@/components/Cards-View";

const initialData = {
  page: 0,
  results: [],
  total_pages: 0,
};

const PopularTvShows = () => {
  const [isNotFound, setIsNotFound] = useState(false);
  const [popularData, setPopularData] = useState<CardData>(initialData);
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const fetchLatestMoviesData = async () => {
    const data = await getTvShows(page ? parseInt(page) : 1, "popular");
    setPopularData(data);
  };

  useEffect(() => {
    fetchLatestMoviesData();
  }, []);

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
    <div className="mx-3 md:mx-40 lg:mx-72 my-10">
      <h2 className="font-bold text-xl mb-10">Popular Tv Shows</h2>

      <CardsView
        data={popularData}
        currentPage={page ? parseInt(page) : 1}
        type="tv/popular"
      />
    </div>
  );
};

export default PopularTvShows;
