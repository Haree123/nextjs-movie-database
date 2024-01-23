import dayjs from "dayjs";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import {
  getInfoByIdCredits,
  getInfoByIdVideos,
  getReviewsById,
  getSimilarById,
} from "@/services/home.apis";
import {
  MovieCrew,
  MovieCredits,
  CardData,
  MovieVideos,
  MovieReviews,
} from "@/typings/typings";
import { Skeleton } from "@/components/ui/skeleton";
import CastCardsView from "@/components/Cast-Card-View";
import MovieCard from "@/components/Movie-Card";
import ReviewCards from "@/components/Review-Cards";

const VideoDialog = dynamic(() => import("@/components/Video-Dialog"), {
  ssr: false,
});

const VideoCards = dynamic(() => import("@/components/Video-Cards"), {
  ssr: false,
});

const MoviesById = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const dataCredits: MovieCredits = await getInfoByIdCredits(
    "movie",
    params.id
  );
  const dataVideos: MovieVideos = await getInfoByIdVideos("movie", params.id);
  const similarMovies: CardData = await getSimilarById("movie", params.id);
  const movieReviews: MovieReviews = await getReviewsById(
    "movie",
    params.id,
    1
  );
  const crewFilter = ["Director", "Producer", "Screenplay"];

  const convertMinutesToHoursAndMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return {
      hours: hours,
      minutes: remainingMinutes,
    };
  };

  const getCrewDetails = (arr: MovieCredits): MovieCrew[] => {
    const info = arr.credits?.crew.filter((item) =>
      crewFilter.includes(item.job)
    );

    const castInfo: MovieCrew[] = Object.values(
      (info || []).reduce((acc: Record<number, MovieCrew>, current) => {
        const { id, name, job, ...rest } = current;

        if (!acc[id]) {
          acc[id] = { ...rest, id, name, job, jobs: [] };
        }

        acc[id].jobs.push(job);

        return acc;
      }, {})
    );

    return castInfo;
  };

  const convertedTime = convertMinutesToHoursAndMinutes(dataCredits.runtime);
  const voteAverage = Math.round(dataCredits.vote_average * 10);
  const videoUrl = dataVideos.videos?.results.filter((item) =>
    item.name.includes("Official Trailer")
  )[0];

  return dataCredits ? (
    <>
      <div className="relative h-[550px]">
        <div className="absolute inset-0">
          <Image
            sizes="100vw"
            className="object-cover h-full w-full"
            src={`${process.env.NEXT_PUBLIC_TMDB_BACKDROP_IMG_URL}/${dataCredits.backdrop_path}`}
            height={0}
            width={0}
            quality={100}
            alt={dataCredits.original_title}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(29,29,29,0.65)] to-[rgba(29,29,29,1)]"></div>

        <div className="relative flex justify-center items-center space-x-20 p-10 h-full w-full">
          <div className="border-4 border-white h-5/6">
            <Image
              className="h-full"
              src={`${process.env.NEXT_PUBLIC_TMDB_IMG_URL}/${dataCredits.poster_path}`}
              height={50}
              width={250}
              quality={100}
              alt={dataCredits.original_title || dataCredits.title}
            />
          </div>

          <div className="hidden md:flex flex-col items-start w-2/3">
            <p className="text-4xl">
              <b>{dataCredits.title || dataCredits.original_title}</b>{" "}
              {dataCredits.release_date &&
                `(${dayjs(dataCredits.release_date).format("YYYY")})`}
            </p>

            <div className="flex space-x-3 my-2">
              <p>{dataCredits.genres.map((item) => item.name).join(", ")}</p>
              <p>|</p>
              <p>
                {convertedTime.hours}h {convertedTime.minutes}m
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-[#091C23] border-2 border-[#20D17A] px-4 py-5 rounded-full overflow-hidden text-center text-xs">
                {voteAverage}
                <span className="text-xs">%</span>
              </div>

              <p>
                <b>
                  User <br /> Score
                </b>
              </p>

              {videoUrl?.key && <VideoDialog url={videoUrl?.key} />}
            </div>
            <p className="italic text-gray-400 my-3">{dataCredits.tagline}</p>

            <b className="my-2">Overview</b>
            <p className="break-words ">{dataCredits.overview || "-"}</p>

            <div className="grid grid-cols-3 lg:grid-cols-4 gap-x-9 gap-y-4 mt-5">
              {getCrewDetails(dataCredits)?.map((item) => {
                return (
                  <div className="flex flex-col" key={item.id}>
                    <p>
                      <b>{item.name}</b>
                    </p>
                    <p className="mt-1 text-sm text-gray-300">
                      {item.jobs.sort().join(", ")}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden flex flex-col items-start w-full m-4">
        <p className="text-4xl">
          <b>{dataCredits.title || dataCredits.original_title}</b>{" "}
          {dataCredits.release_date &&
            `(${dayjs(dataCredits.release_date).format("YYYY")})`}
        </p>

        <div className="flex space-x-3 my-2">
          <p>{dataCredits.genres.map((item) => item.name).join(", ")}</p>
          <p>|</p>
          <p>
            {convertedTime.hours}h {convertedTime.minutes}m
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-[#091C23] border-2 border-[#20D17A] px-4 py-5 rounded-full overflow-hidden text-center">
            {voteAverage}
            <span className="text-xs">%</span>
          </div>

          <p>
            <b>
              User <br /> Score
            </b>
          </p>

          {videoUrl?.key && <VideoDialog url={videoUrl?.key} />}
        </div>
        <p className="italic text-gray-400 my-3">{dataCredits.tagline}</p>

        {dataCredits.overview !== "" ? (
          <>
            <b className="my-2">Overview</b>
            <p className="break-words w-[95%]">{dataCredits.overview}</p>
          </>
        ) : null}

        <div className="grid grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4 mt-5">
          {getCrewDetails(dataCredits).map((item) => {
            return (
              <div className="flex flex-col" key={item.id}>
                <p>
                  <b>{item.name}</b>
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  {item.jobs.sort().join(", ")}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {dataCredits.credits.cast.length > 0 && (
        <div className="m-4 md:m-10">
          <CastCardsView data={dataCredits} movieId={params.id} type="movies" />
        </div>
      )}

      {movieReviews.results.length > 0 && (
        <div className="m-4 md:m-10">
          <h2 className="font-bold text-xl mb-5">Reviews</h2>

          <div className="grid grid-cols-2 gap-x-5">
            {movieReviews.results.slice(0, 2).map((reviews) => (
              <div key={reviews.id}>
                <ReviewCards review={reviews} />
              </div>
            ))}
          </div>

          <Link href={`/movies/${params.id}/reviews`}>
            <div className="cursor-pointer my-4 hover:font-bold w-fit">
              <p>Read Full Reviews</p>
            </div>
          </Link>
        </div>
      )}

      {dataVideos.videos.results.length > 0 && (
        <div className="m-4 md:m-10">
          <h2 className="font-bold text-xl mb-5">Videos</h2>
          <div className="flex space-x-2 overflow-x-scroll scrollbar-hide">
            {dataVideos.videos.results.map((vItem) => {
              if (vItem.key && vItem.site === "YouTube") {
                return (
                  <div key={vItem.id} className="w-[450px]">
                    <VideoCards url={vItem.key} />
                    <p className="my-4">
                      <b>{vItem.name}</b>
                    </p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}

      {similarMovies.results.length > 0 && (
        <div className="m-4 md:m-10">
          <h2 className="font-bold text-xl mb-5">Similar Movies</h2>

          <MovieCard data={similarMovies} type="movie" />
        </div>
      )}
    </>
  ) : (
    <MoviesByIdSkeleton />
  );
};

export default MoviesById;

function MoviesByIdSkeleton() {
  return (
    <>
      <div className="relative flex justify-center items-center space-x-5 p-10 h-full w-full">
        <div className="w-1/6">
          <Skeleton className="h-96 w-full" />
        </div>

        <div className="hidden md:flex flex-col items-start w-2/3">
          <Skeleton className="h-2 w-2/4" />

          <div className="my-2">
            <Skeleton className="h-2 w-2/4" />
          </div>

          <div className="flex items-center space-x-3 w-full">
            <Skeleton className="h-12 w-12 rounded-full" />

            <Skeleton className="h-2 w-1/6" />

            <Skeleton className="h-2 w-1/6" />
          </div>

          <Skeleton className="my-3 h-2 w-2/4" />

          <Skeleton className="h-2 w-2/4" />
          <Skeleton className="h-2 w-2/4" />

          <div className="grid grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 mt-5 w-2/3">
            {Array.from({ length: 8 })?.map((_, index) => {
              return (
                <div className="flex flex-col" key={index}>
                  <Skeleton className="h-2 w-2/4" />
                  <Skeleton className="h-2 w-2/4" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
