"use client";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

import { CardData, PersonData } from "@/typings/typings";

type TypeBasedData<T extends string> = T extends "movie"
  ? CardData
  : T extends "tv"
  ? CardData
  : T extends "people"
  ? PersonData
  : never;

type MovieCardProps<T extends string> = {
  data: TypeBasedData<T>;
  type: T;
};

const MovieCard = ({
  data,
  type,
}: MovieCardProps<"movie" | "people" | "tv">) => {
  return (
    <div className="mt-5">
      <div className="flex space-x-2 overflow-x-scroll scrollbar-hide">
        {(type === "people"
          ? (data as PersonData).combined_credits.cast
          : (data as CardData).results
        ).map((item) => {
          return (
            <Link
              className="min-h-fit h-full"
              key={item.id}
              href={`/${
                item.media_type === undefined
                  ? "movies"
                  : item.media_type === "movie"
                  ? "movies"
                  : "tv"
              }/${item.id}`}
            >
              <div className="cursor-pointer relative overflow-visible">
                <Image
                  style={{ borderRadius: "0.375rem" }}
                  className="h-[80%] w-full"
                  src={
                    item.poster_path
                      ? `${process.env.NEXT_PUBLIC_TMDB_IMG_URL}${item.poster_path}`
                      : "https://banner2.cleanpng.com/20180628/jvc/kisspng-clapperboard-computer-icons-film-download-movie-poster-5b359e7b2db090.7720687515302406351872.jpg"
                  }
                  alt={item.title}
                  height={50}
                  width={160}
                  loading="lazy"
                />

                <p className="break-words font-bold mt-3 w-40 text-sm">
                  {item.title || item.original_title || item.original_name}
                </p>

                <p className="mt-1 text-sm text-[#6A6A6C]">
                  {item.release_date
                    ? dayjs(item.release_date).format("MMM DD, YYYY")
                    : item.first_air_date
                    ? dayjs(item.first_air_date).format("MMM DD, YYYY")
                    : "-"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MovieCard;
