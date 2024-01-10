"use client";
import { CardData } from "@/typings/typings";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

type MovieCardProps = {
  data: CardData;
};

const MovieCard = ({ data }: MovieCardProps) => {
  const router = useRouter();

  return (
    <div className="mt-10">
      <div className="flex space-x-3 w-full overflow-x-scroll scrollbar-hide">
        {data.results.map((item) => {
          return (
            <div
              className="cursor-pointer"
              key={item.id}
              onClick={() => {
                router.push(`/trending/${item.id}`);
              }}
            >
              <Image
                className="rounded-md"
                src={`${process.env.NEXT_PUBLIC_TMDB_IMG_URL}${item.poster_path}`}
                alt={item.title}
                height={50}
                width={160}
                loading="lazy"
              />

              <p className="break-words font-bold mt-3 w-40 text-sm">
                {item.title || item.name}
              </p>

              <p className="mt-1 text-sm text-[#6A6A6C]">
                {dayjs(item.release_date).format("MMM DD, YYYY") || "-"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieCard;
