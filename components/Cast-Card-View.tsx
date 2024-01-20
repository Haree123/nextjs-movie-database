import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MovieCredits } from "@/typings/typings";

interface CastCardsViewProps {
  data: MovieCredits;
  movieId: string;
}

const CastCardsView = ({ data, movieId }: CastCardsViewProps) => {
  return (
    <>
      <h2 className="font-bold text-xl mb-5">Top Billed Cast</h2>
      <div className="mt-10" style={{ overflow: "visible" }}>
        <div className="flex space-x-2 overflow-x-scroll scrollbar-hide">
          {data.credits.cast.slice(0, 15).map((item) => {
            return (
              <div
                className="cursor-pointer relative overflow-visible py-2 w-40"
                key={item.id}
              >
                <Image
                  sizes="100"
                  style={{ borderRadius: "0.375rem" }}
                  className="h-[80%] w-full"
                  src={
                    item.profile_path
                      ? `${process.env.NEXT_PUBLIC_TMDB_IMG_URL}${item.profile_path}`
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt={item.name}
                  height={0}
                  width={0}
                  loading="lazy"
                />

                <p className="break-words font-bold mt-3 w-40 text-sm">
                  {item.name}
                </p>

                <p className="break-words mt-1 text-gray-400 text-xs">
                  {item.character}
                </p>
              </div>
            );
          })}

          <div className="flex space-x-2 items-center p-10">
            <Link href={`/movies/${movieId}/cast`}>
              <p
                className="cursor-pointer text-sm hover:text-gray-600"
                style={{ whiteSpace: "nowrap" }}
              >
                <b>View More</b>
              </p>
            </Link>
            <ArrowRight size={15} />
          </div>
        </div>

        <Link href={`/movies/${movieId}/cast`}>
          <div className="cursor-pointer my-4 hover:font-bold w-fit">
            <p>Full Cast and Crew</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CastCardsView;
