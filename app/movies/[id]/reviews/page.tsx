"use client";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { getInfoByIdCredits, getReviewsById } from "@/services/home.apis";
import { MovieCredits, MovieReviews } from "@/typings/typings";

interface MovieByIdReviewsProps {
  params: {
    id: string;
  };
}

const initialDataCredits = {
  backdrop_path: "",
  credits: {
    cast: [],
    crew: [],
  },
  genres: [],
  poster_path: "",
  original_title: "",
  overview: "",
  release_date: "",
  runtime: 0,
  tagline: "",
  title: "",
  vote_average: 0,
};

const MovieByIdReviews = ({ params }: MovieByIdReviewsProps) => {
  const router = useRouter();
  const [dataCredits, setDataCredits] =
    useState<MovieCredits>(initialDataCredits);
  const [movieReviews, setMovieReviews] = useState<MovieReviews>();

  const handleGoBack = () => {
    router.back();
  };

  const fetchDataCredits = useCallback(async () => {
    const data = await getInfoByIdCredits("movie", params.id);
    const reviewsData = await getReviewsById("movie", params.id, 1);
    setDataCredits(data);
    setMovieReviews(reviewsData);
  }, []);

  useEffect(() => {
    fetchDataCredits();
  }, []);

  return (
    <div className="mx-3 md:mx-28 my-10">
      <div className="flex space-x-4 h-24">
        <Image
          className="h-full w-16"
          sizes="100vw"
          alt={dataCredits.original_title}
          src={`${process.env.NEXT_PUBLIC_TMDB_IMG_URL}/${dataCredits.poster_path}`}
          height={0}
          width={0}
          quality={100}
          loading="lazy"
        />

        <div className="flex flex-col space-y-2 justify-center">
          <p className="text-xl">
            <b>{dataCredits.title}</b>{" "}
            {dataCredits.release_date &&
              `(${dayjs(dataCredits.release_date).format("YYYY")})`}
          </p>

          <div
            className="flex space-x-2 items-center hover:text-gray-400 cursor-pointer"
            onClick={() => handleGoBack()}
          >
            <ArrowLeft size={14} />
            <p className="text-xs">Back to Main</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row my-10 space-x-10">
        <div>
          <h2 className="text-2xl">
            <b>Reviews</b>
          </h2>
        </div>

        <div className="flex flex-col space-y-6">
          {movieReviews?.results.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-col border-2 p-4"
                style={{ borderRadius: "5px" }}
              >
                <div className="flex space-x-2">
                  <div
                    className="h-14 w-14 object-contain overflow-hidden"
                    style={{ borderRadius: "35px" }}
                  >
                    <Image
                      className="h-full w-full rounded-md overflow-hidden"
                      sizes="100vw"
                      src={
                        item.author_details.avatar_path
                          ? `${process.env.NEXT_PUBLIC_TMDB_IMG_URL}/${item.author_details.avatar_path}`
                          : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                      }
                      height={0}
                      width={0}
                      quality={100}
                      alt={item.author_details.name}
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <p className="text-xl">
                      <b>A Review by {item.author_details.name || "-"}</b>
                    </p>

                    <p className="text-sm text-gray-400">
                      {item.created_at &&
                        dayjs(item.created_at).format("MMMM MM, YYYY")}
                    </p>
                  </div>
                </div>

                <div className="w-full overflow-scroll scrollbar-hide mt-3">
                  <p className="text-sm text-ellipsis">{item.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieByIdReviews;
