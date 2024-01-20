import dayjs from "dayjs";
import Image from "next/image";

import { Skeleton } from "./ui/skeleton";
import { CardData } from "@/typings/typings";
import { PaginationCards } from "./Pagination";
import { useRouter } from "next/navigation";

interface CardsViewProps {
  currentPage: number;
  data: CardData;
  type: string;
}

const CardsView = ({ currentPage, data, type }: CardsViewProps) => {
  const router = useRouter();

  return (
    <>
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
      ) : data.results ? (
        <>
          <div className="grid grid-cols-4 lg:grid-cols-5 gap-10 mb-10">
            {data.results.map((item) => {
              return (
                <div
                  className="cursor-pointer"
                  key={item.id}
                  onClick={() => {
                    router.push(
                      `${
                        type.includes("movies")
                          ? `/movies/${item.id}`
                          : `/tv/${item.id}`
                      }`
                    );
                  }}
                >
                  <Image
                    placeholder="blur"
                    blurDataURL={
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/wcAAwAB/8AIPAAAAABJRU5ErkJggg=="
                    }
                    style={{ borderRadius: "0.5rem" }}
                    className="object-contain h-84 w-full"
                    src={`${process.env.NEXT_PUBLIC_TMDB_IMG_URL}/${item.poster_path}`}
                    alt={item.name || item.title}
                    height={100}
                    quality={100}
                    width={150}
                  />

                  <p className="break-words font-bold mt-3 max-w-40 text-sm">
                    {item.title || item.name}
                  </p>

                  <p className="mt-1 max-w-40 text-sm text-[#6A6A6C]">
                    {dayjs(item.release_date).format("MMM DD, YYYY") || "-"}
                  </p>
                </div>
              );
            })}
          </div>

          <PaginationCards currentPage={currentPage} type={type} />
        </>
      ) : (
        <>Failed</>
      )}
    </>
  );
};

export default CardsView;
