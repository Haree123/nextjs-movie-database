import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CardData } from "@/typings/typings";
import { getTrending, getUpcoming } from "@/services/home.apis";
import MovieCardWrapper from "@/components/MovieCardWrapper";
import Oppenheimer from "../public/assets/Oppenheimer.jpg";

export const metadata: Metadata = {
  title: "Film Box",
  description: "Created By Haree Prasad",
};

let page = 1;

const Home = async () => {
  const trendingData: CardData = await getTrending(page, "day");
  const upcomingMovie: CardData = await getUpcoming(page, "movie");

  return (
    <main className="30 select-none">
      <div className="relative">
        <Image
          src={Oppenheimer}
          alt="Oppenheimer"
          className="h-[550px] object-cover"
        />
        <div className="absolute top-1/2 left-1/3 lg:left-1/4 transform -translate-x-1/3 lg:-translate-x-1/2 -translate-y-1/2 text-white">
          <p className="font-bold text-2xl lg:text-3xl">Welcome.</p>
          <p className="mt-1 text-lg">
            Millions of movies, Tv Shows and people to discover. Explore now.
          </p>
          <Link href="/movies/popular?page=1">
            <div className="bg-blue-200 dark:bg-white rounded-sm flex justify-between mt-5 px-5 py-3 w-fit text-black">
              <span className="font-semibold text-base">Try It!</span>
              <ArrowRight className="ml-10" size={20} />
            </div>
          </Link>
        </div>
      </div>

      <div className="m-10">
        <MovieCardWrapper
          initialData={trendingData}
          sectionTitle={"Trending"}
          title="movie"
          filterBy={true}
        />
      </div>

      <div className="m-10">
        <MovieCardWrapper
          initialData={upcomingMovie}
          sectionTitle={"Upcoming"}
          title="movie"
          filterBy={false}
        />
      </div>
    </main>
  );
};

export default Home;
