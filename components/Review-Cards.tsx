import { MovieReviewResult } from "@/typings/typings";
import dayjs from "dayjs";
import Image from "next/image";

interface ReviewCardsProps {
  review: MovieReviewResult;
}

const ReviewCards = ({ review }: ReviewCardsProps) => {
  return (
    <div className="flex flex-col border-2 p-4" style={{ borderRadius: "5px" }}>
      <div className="flex space-x-2">
        <div
          className="h-14 w-14 object-contain overflow-hidden"
          style={{ borderRadius: "35px" }}
        >
          <Image
            className="h-full w-full rounded-md overflow-hidden"
            sizes="100vw"
            src={
              review.author_details.avatar_path
                ? `${process.env.NEXT_PUBLIC_TMDB_IMG_URL}/${review.author_details.avatar_path}`
                : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
            }
            height={0}
            width={0}
            quality={100}
            alt={review.author_details.name}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <p className="text-xl">
            <b>A Review by {review.author_details.name}</b>
          </p>

          <p className="text-sm text-gray-400">
            {review.created_at &&
              dayjs(review.created_at).format("MMMM MM, YYYY")}
          </p>
        </div>
      </div>

      <div className="h-36 w-full overflow-scroll scrollbar-hide mt-3">
        <p className="text-sm text-ellipsis">{review.content}</p>
      </div>
    </div>
  );
};

export default ReviewCards;
