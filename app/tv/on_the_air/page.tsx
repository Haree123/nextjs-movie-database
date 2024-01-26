"use client";

import { useEffect, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";

import { getTvShows } from "@/services/home.apis";
import { CardData } from "@/typings/typings";
import CardsView from "@/components/Cards-View";

const initialData = {
  page: 0,
  results: [],
  total_results: 0,
  total_pages: 0,
};

const OnTheAirTvShows = () => {
  const [isNotFound, setIsNotFound] = useState(false);
  const [OnTheAirData, setOnTheAirData] = useState<CardData>(initialData);
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const fetchLatestTvData = async () => {
    const data = await getTvShows(page ? parseInt(page) : 1, "on_the_air");
    setOnTheAirData(data);
  };

  useEffect(() => {
    fetchLatestTvData();
  }, []);

  useEffect(() => {
    if (OnTheAirData.total_pages !== 0) {
      const pageNo = page ? parseInt(page) : 1;

      if (pageNo > OnTheAirData.total_pages) {
        setIsNotFound(true);
      }
    }
  }, [OnTheAirData]);

  if (isNotFound) {
    return notFound();
  }

  return (
    <div className="mx-[2%] md:mx-[10%] lg:mx-[15%] my-10">
      <h2 className="font-bold text-xl mb-10">On The Air Tv Shows</h2>

      <CardsView
        data={OnTheAirData}
        currentPage={page ? parseInt(page) : 1}
        type="tv"
        urlType="tv/on_the_air"
      />
    </div>
  );
};

export default OnTheAirTvShows;
