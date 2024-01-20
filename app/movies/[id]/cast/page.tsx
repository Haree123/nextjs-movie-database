import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getInfoByIdCredits } from "@/services/home.apis";
import { MovieCredits } from "@/typings/typings";

interface MoviesByIdCastProps {
  params: {
    id: string;
  };
}

const MoviesByIdCast = async ({ params }: MoviesByIdCastProps) => {
  const dataCredits: MovieCredits = await getInfoByIdCredits(
    "movie",
    params.id
  );

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
        />

        <div className="flex flex-col space-y-2 justify-center">
          <p className="text-xl">
            <b>{dataCredits.title}</b>{" "}
            {dataCredits.release_date &&
              `(${dayjs(dataCredits.release_date).format("YYYY")})`}
          </p>
          <Link href={`/movies/${params.id}`}>
            <div className="flex space-x-2 items-center hover:text-gray-400 cursor-pointer">
              <ArrowLeft size={14} />
              <p className="text-xs">Back to Main</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="my-5 grid grid-cols-2">
        <div>
          <h2 className="text-lg">
            <b>
              Cast{" "}
              {dataCredits.credits.cast.length &&
                `(${dataCredits.credits.cast.length})`}
            </b>
          </h2>

          <div className="flex flex-col space-y-4 my-3">
            {dataCredits.credits.cast.map((item) => (
              <div className="flex space-x-4 h-14">
                <Image
                  className="h-full w-12 object-contain"
                  sizes="100vw"
                  src={
                    item.profile_path
                      ? `${process.env.NEXT_PUBLIC_TMDB_IMG_URL}${item.profile_path}`
                      : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                  }
                  height={0}
                  width={0}
                  alt={item.name}
                />

                <div className="flex flex-col">
                  <p className="break-words font-bold mt-3 w-40 text-sm">
                    {item.name}
                  </p>

                  <p className="break-words mt-1 text-gray-400 text-xs">
                    {item.character}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg">
            <b>
              Crew{" "}
              {dataCredits.credits.crew.length &&
                `(${dataCredits.credits.crew.length})`}
            </b>
          </h2>

          <div className="flex flex-col space-y-4 my-3">
            {dataCredits.credits.crew.map((item) => (
              <div className="flex space-x-4 h-14">
                <Image
                  className="h-full w-12 object-contain"
                  sizes="100vw"
                  src={
                    item.profile_path
                      ? `${process.env.NEXT_PUBLIC_TMDB_IMG_URL}${item.profile_path}`
                      : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                  }
                  height={0}
                  width={0}
                  alt={item.name}
                />

                <div className="flex flex-col">
                  <p className="break-words font-bold mt-3 w-40 text-sm">
                    {item.name}
                  </p>

                  <p className="break-words mt-1 text-gray-400 text-xs">
                    {item.job}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesByIdCast;
