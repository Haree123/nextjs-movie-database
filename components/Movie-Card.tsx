import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

import { CardData } from "@/typings/typings";

type MovieCardProps = {
  data: CardData;
  title: string;
};

const MovieCard = ({ data, title }: MovieCardProps) => {
  return (
    <div className="mt-5" style={{ overflow: "visible" }}>
      <div className="flex space-x-2 overflow-x-scroll scrollbar-hide">
        {data.results.map((item) => {
          // const percentage = (parseInt(item.vote_average) / 10) * 100;
          // const vote_percentage = Math.round(percentage);
          const type = item.media_type === "movie" ? "movies" : "tv";

          return (
            <Link
              key={item.id}
              href={`/${title !== "upcoming movie" ? type : "movies"}/${
                item.id
              }`}
            >
              <div className="cursor-pointer relative overflow-visible h-[350px]">
                <Image
                  style={{ borderRadius: "0.375rem" }}
                  className="h-3/4 w-full"
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
                  {item.title || item.name}
                </p>

                <p className="mt-1 text-sm text-[#6A6A6C]">
                  {item.release_date
                    ? dayjs(item.release_date).format("MMM DD, YYYY")
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
