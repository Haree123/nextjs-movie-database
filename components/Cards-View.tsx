import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  CardData,
  CardResults,
  PeopleData,
  PeopleResults,
} from "@/typings/typings";
import { Skeleton } from "./ui/skeleton";
import { PaginationCards } from "./Pagination";

type TypeBasedData<T extends string> = T extends "movies"
  ? CardData
  : T extends "tv"
  ? CardData
  : PeopleData;

interface CardsViewProps<T extends string> {
  currentPage: number;
  data: TypeBasedData<T>;
  type: T;
  urlType: string;
}

const CardsView = ({
  currentPage,
  data,
  type,
  urlType,
}: CardsViewProps<"movies" | "people" | "tv">) => {
  const router = useRouter();

  const isTypePeople = type.includes("people");

  return (
    <div>
      {data.page === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 min-h-full">
          {Array.from({ length: 10 }).map((_, index) => {
            return (
              <div key={index}>
                <div className="flex flex-col space-y-4">
                  <Skeleton className="h-72 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            );
          })}
        </div>
      ) : data.results.length > 0 ? (
        <>
          <div className="flex justify-center flex-wrap gap-5 mb-10">
            {data.results.map((item) => {
              const movieTvItems = item as CardResults;
              const personItem = item as PeopleResults;

              return (
                <div
                  className="cursor-pointer h-fit w-32 md:w-40 overflow-hidden"
                  key={item.id}
                  onClick={() => {
                    router.push(
                      `${
                        isTypePeople
                          ? `/people/${item.id}`
                          : type.includes("movies")
                          ? `/movies/${item.id}`
                          : `/tv/${item.id}`
                      }`
                    );
                  }}
                >
                  <Image
                    style={{ borderRadius: "10px" }}
                    className="object-contain h-3/4 w-full"
                    src={`${process.env.NEXT_PUBLIC_TMDB_IMG_URL}/${
                      type === "people"
                        ? personItem.profile_path
                        : movieTvItems.poster_path
                    }`}
                    alt={item.name || movieTvItems.title || "-"}
                    height={100}
                    width={100}
                    quality={100}
                    priority
                  />

                  <p className="break-words font-bold mt-3 max-w-40 text-sm">
                    {type === "people"
                      ? personItem.name || "-"
                      : movieTvItems.title || movieTvItems.name || "-"}
                  </p>

                  {type !== "people" && (
                    <p className="mt-1 max-w-40 text-sm text-[#6A6A6C]">
                      {movieTvItems.release_date
                        ? dayjs(movieTvItems.release_date).format(
                            "MMM DD, YYYY"
                          )
                        : movieTvItems.first_air_date
                        ? dayjs(movieTvItems.first_air_date).format(
                            "MMM DD, YYYY"
                          )
                        : ""}
                    </p>
                  )}

                  {type === "people" && (
                    <p className="mt-1 max-w-40 text-sm text-[#6A6A6C]">
                      {personItem.known_for
                        .slice(0, 4)
                        .map(
                          (knownItem) =>
                            knownItem.original_name || knownItem.original_title
                        )
                        .join(", ")}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <PaginationCards currentPage={currentPage} type={urlType} />
        </>
      ) : (
        <p className="font-bold text-center">No Results</p>
      )}
    </div>
  );
};

export default CardsView;
