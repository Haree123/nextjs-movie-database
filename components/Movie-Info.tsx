"use client";

import { useState } from "react";
import { InfoIcon, Star } from "lucide-react";
import { Dialog, DialogContent, DialogDescription } from "./ui/dialog";
import Image from "next/image";
import dayjs from "dayjs";

import { PersonCast, PersonCrew } from "@/typings/typings";
import Link from "next/link";

type TypeBasedData<T extends string> = T extends "cast"
  ? PersonCast
  : T extends "crew"
  ? PersonCrew
  : never;

interface MovieInfoProps<T extends string> {
  movieInfo: TypeBasedData<T>;
  type: T;
}

const MovieInfo = ({ movieInfo, type }: MovieInfoProps<"cast" | "crew">) => {
  const [isMovieInfoOpen, setIsMovieInfoOpen] = useState(false);

  const handleDialog = () => {
    setIsMovieInfoOpen(!isMovieInfoOpen);
  };

  return (
    <div className="cursor-pointer" onClick={() => handleDialog()}>
      <InfoIcon />

      <Dialog open={isMovieInfoOpen} onOpenChange={() => handleDialog()}>
        <DialogContent>
          <DialogDescription>
            <Link
              href={`/${movieInfo.media_type === "movie" ? "movies" : "tv"}/${
                movieInfo.id
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="h-full w-20">
                  <Image
                    className="h-full w-full object-cover"
                    src={
                      movieInfo.poster_path
                        ? `${process.env.NEXT_PUBLIC_TMDB_IMG_URL}/${movieInfo.poster_path}`
                        : "https://banner2.cleanpng.com/20180628/jvc/kisspng-clapperboard-computer-icons-film-download-movie-poster-5b359e7b2db090.7720687515302406351872.jpg"
                    }
                    height={0}
                    width={0}
                    sizes="100vw"
                    alt={movieInfo.title || movieInfo.original_title}
                  />
                </div>

                <div>
                  <p className="font-bold text-sm">
                    {movieInfo.title ||
                      movieInfo.original_title ||
                      movieInfo.original_name ||
                      "-"}
                  </p>

                  <div className="flex space-x-1 items-center mt-1 text-sm">
                    <Star color="yellow" size={13} />

                    <p>{movieInfo.vote_average.toFixed(2)} / 10</p>
                  </div>

                  <p className="mt-1 text-sm text-gray-400">
                    {type === "cast"
                      ? (movieInfo as PersonCast).character
                      : (movieInfo as PersonCrew).job}
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    {movieInfo.release_date
                      ? dayjs(movieInfo.release_date).format("MMM DD, YYYY")
                      : movieInfo.first_air_date
                      ? dayjs(movieInfo.first_air_date).format("MMM DD, YYYY")
                      : ""}
                  </p>
                </div>
              </div>
            </Link>

            <h2 className="my-4">Popularity - {movieInfo.popularity}%</h2>

            <h2 className="font-bold text-xl mt-4">Overview</h2>
            <h2 className="my-2 text-sm">{movieInfo.overview}</h2>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MovieInfo;
