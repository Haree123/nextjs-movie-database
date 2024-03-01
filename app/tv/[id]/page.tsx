import dayjs from "dayjs";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Star } from "lucide-react";
import { notFound } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import {
  getInfoByIdCredits,
  getInfoByIdVideos,
  getSimilarById,
} from "@/services/home.apis";
import { CardData, TvCredits, TvCrewData, TvVideos } from "@/typings/typings";
import MovieCard from "@/components/Movie-Card";
import CastCardsView from "@/components/Cast-Card-View";

const VideoDialog = dynamic(() => import("@/components/Video-Dialog"), {
  ssr: false,
});

const VideoCards = dynamic(() => import("@/components/Video-Cards"), {
  ssr: false,
});

interface TvShowsByIdProps {
  params: {
    id: string;
  };
}

const TvShowsById = async ({ params }: TvShowsByIdProps) => {
  const dataCredits: TvCredits = await getInfoByIdCredits("tv", params.id);
  const dataVideos: TvVideos = await getInfoByIdVideos("tv", params.id);
  const similarMovies: CardData = await getSimilarById("tv", params.id);

  const crewFilter = ["Director", "Producer", "Screenplay"];

  const getCrewDetails = (arr: TvCredits): TvCrewData[] => {
    const info = arr.credits?.crew.filter((item) =>
      crewFilter.includes(item.job)
    );

    const castInfo: TvCrewData[] = Object.values(
      (info || []).reduce((acc: Record<number, TvCrewData>, current) => {
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

  const voteAverage = Math.round(dataCredits.vote_average * 10);
  const videoUrl = dataVideos.videos?.results.filter((item) =>
    item.name.includes("Official Trailer")
  )[0];

  if (dataCredits.status_code === 34) {
    return notFound();
  }

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
            alt={dataCredits.original_name || dataCredits.name || "-"}
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
              alt={dataCredits.original_name || dataCredits.name}
            />
          </div>

          <div className="hidden md:flex flex-col items-start w-2/3">
            <p className="text-4xl">
              <b>{dataCredits.original_name || dataCredits.name}</b>{" "}
              {dataCredits.first_air_date &&
                `(${dayjs(dataCredits.first_air_date).format("YYYY")})`}
            </p>

            <div className="flex space-x-3 my-2">
              <p>{dataCredits.genres?.map((item) => item.name).join(", ")}</p>
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

            {dataCredits.overview && <b className="my-2">Overview</b>}
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
          <b>{dataCredits.original_name || dataCredits.name}</b>{" "}
          {dataCredits.first_air_date &&
            `(${dayjs(dataCredits.first_air_date).format("YYYY")})`}
        </p>

        <div className="flex space-x-3 my-2">
          <p>{dataCredits.genres?.map((item) => item.name).join(", ")}</p>
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

      <div className="m-4 md:m-10">
        <h2 className="font-bold text-2xl mb-5">Seasons</h2>

        {dataCredits.seasons?.map((seasonsItem) => (
          <div key={seasonsItem.id} className="my-4">
            <p>
              <span className="font-semibold text-sm">Season Name</span> -{" "}
              {seasonsItem.name}
            </p>

            {seasonsItem.vote_average > 0 && (
              <div className="flex space-x-1 items-center mt-1 text-sm">
                <Star color="yellow" size={13} />

                <p>{seasonsItem.vote_average.toFixed(2)} / 10</p>
              </div>
            )}

            <div className="flex items-center my-2 space-x-2">
              <p className="font-semibold text-sm">Air Date</p>
              <p>-</p>
              <p>
                {seasonsItem.air_date
                  ? dayjs(seasonsItem.air_date).format("DD-MM-YYYY")
                  : "-"}
              </p>

              <p>|</p>

              <p className="font-semibold text-sm">Episode Count</p>
              <p>-</p>
              <p>
                {seasonsItem.episode_count ? seasonsItem.episode_count : "-"}
              </p>
            </div>

            <div className="my-2">
              <h2 className="font-semibold text-lg">Overview</h2>
              <p className="mb-2 leading-7">{seasonsItem.overview}</p>
            </div>
          </div>
        ))}
      </div>

      {dataCredits.credits?.cast.length > 0 && (
        <div className="m-4 md:m-10">
          <CastCardsView data={dataCredits} movieId={params.id} type="tv" />
        </div>
      )}

      {dataVideos.videos?.results.length > 0 && (
        <div className="m-4 md:m-10">
          <h2 className="font-bold text-xl mb-5">Videos</h2>

          <div className="flex space-x-2 overflow-x-scroll scrollbar-hide">
            {dataVideos.videos.results?.map((vItem) => {
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

      {similarMovies.results?.length > 0 && (
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

export default TvShowsById;

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
