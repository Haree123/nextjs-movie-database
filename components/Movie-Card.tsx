import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { CardData } from "@/typings/typings";

type MovieCardProps = {
  data: CardData;
  title: string;
};

const MovieCard = ({ data, title }: MovieCardProps) => {
  const router = useRouter();

  return (
    <div className="mt-10" style={{ overflow: "visible" }}>
      <div className="flex space-x-2 overflow-x-scroll scrollbar-hide">
        {data.results.map((item) => {
          // const percentage = (parseInt(item.vote_average) / 10) * 100;
          // const vote_percentage = Math.round(percentage);
          const type = item.media_type === "movie" ? "movies" : "tv";

          return (
            <div
              className="cursor-pointer relative overflow-visible"
              key={item.id}
              onClick={() => {
                router.push(
                  `/${title !== "upcoming movie" ? type : "movies"}/${item.id}`
                );
              }}
            >
              <Image
                style={{ borderRadius: "0.375rem" }}
                className="w-full"
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
