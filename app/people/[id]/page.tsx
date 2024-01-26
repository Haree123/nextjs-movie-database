import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import { Star } from "lucide-react";
import { notFound } from "next/navigation";

import { getPeopleInfoById } from "@/services/home.apis";
import { PersonData } from "@/typings/typings";
import MovieInfo from "@/components/Movie-Info";

interface PersonByIdProps {
  params: {
    id: string;
  };
}

const PersonById = async ({ params }: PersonByIdProps) => {
  const personData: PersonData = await getPeopleInfoById(params.id);

  const sortedKnownFor = personData.combined_credits?.cast
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 4);

  if (personData.status_code === 34) {
    return notFound();
  }

  return (
    <div className="my-5 px-10 lg:w-3/4 lg:mx-auto">
      <div className="flex flex-col">
        <div className="my-5">
          <h2 className="font-bold text-2xl">{personData.name}</h2>
          <p className="mt-1 text-sm text-gray-400">
            {personData.known_for_department}
          </p>
        </div>

        <div className="flex space-x-10">
          <div className="h-80 min-w-fit lg:w-60">
            <Image
              className="h-full w-full object-cover"
              src={`${process.env.NEXT_PUBLIC_TMDB_IMG_NEW_URL}/${personData.profile_path}`}
              alt={personData.name}
              sizes="100vw"
              height={0}
              width={0}
            />
          </div>

          <div className="w-full">
            <h2 className="font-bold text-xl">Personal Info</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
              <div>
                <h2 className="font-semibold">Birth Day</h2>
                <p className="mt-2 text-sm">
                  {personData.birthday
                    ? dayjs(personData.birthday).format("DD-MM-YYYY")
                    : "-"}
                  {personData.birthday
                    ? ` (${dayjs(Date.now()).diff(
                        personData.birthday,
                        "years"
                      )} years old)`
                    : ""}
                </p>
              </div>

              <div>
                <h2 className="font-semibold">Place of Birthday</h2>
                <p className="mt-2 text-sm">
                  {personData.place_of_birth || "-"}
                </p>
              </div>

              <div>
                <h2 className="font-semibold">Gender</h2>
                <p className="mt-2 text-sm">
                  {personData.gender === 1
                    ? "Female"
                    : personData.gender === 2
                    ? "Male"
                    : "-"}
                </p>
              </div>

              <div>
                <h2 className="font-semibold">Also Known as</h2>
                <div className="mt-2 text-sm leading-7">
                  {personData.also_known_as.join(", ") || "-"}
                </div>
              </div>
            </div>

            <div className="hidden md:inline-block">
              <h2 className="font-bold text-xl mb-4">Biography</h2>

              <div
                className="text-sm leading-7"
                dangerouslySetInnerHTML={{
                  __html: personData.biography.replace(/\n/g, "<br />"),
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <h2 className="font-bold text-xl mb-4">Biography</h2>

        <div
          className="text-sm leading-7"
          dangerouslySetInnerHTML={{
            __html: personData.biography.replace(/\n/g, "<br />"),
          }}
        />
      </div>

      <div className="my-10">
        <h2 className="font-bold text-xl">Known For</h2>

        <div className="grid grid-cols-2 gap-8 my-3">
          {sortedKnownFor?.map((sortedItem) => (
            <div
              key={sortedItem.id}
              className="flex items-center space-x-5 h-[141px] w-full"
            >
              <Link
                className="flex items-center space-x-5 md:w-[60%]"
                href={`/${
                  sortedItem.media_type === "movie" ? "movies" : "tv"
                }/${sortedItem.id}`}
              >
                <div className="h-full min-w-[94px] w-[94px]">
                  <Image
                    className="h-full w-full object-cover"
                    style={{ borderRadius: "5px" }}
                    src={
                      sortedItem.poster_path
                        ? `${process.env.NEXT_PUBLIC_TMDB_IMG_URL}/${sortedItem.poster_path}`
                        : "https://banner2.cleanpng.com/20180628/jvc/kisspng-clapperboard-computer-icons-film-download-movie-poster-5b359e7b2db090.7720687515302406351872.jpg"
                    }
                    height={0}
                    width={0}
                    sizes="100vw"
                    alt={sortedItem.title || sortedItem.original_title}
                  />
                </div>

                <div>
                  <p className="font-bold text-sm">
                    {sortedItem.title ||
                      sortedItem.original_title ||
                      sortedItem.original_name ||
                      "-"}
                  </p>

                  <div className="flex space-x-1 items-center mt-1 text-sm">
                    <Star color="yellow" size={13} />

                    <p>{sortedItem.vote_average.toFixed(2)}</p>
                  </div>

                  <p className="line-clamp-2 mt-1 text-sm text-gray-400">
                    {sortedItem.character}
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    {sortedItem.release_date
                      ? dayjs(sortedItem.release_date).format("MMM DD, YYYY")
                      : sortedItem.first_air_date
                      ? dayjs(sortedItem.first_air_date).format("MMM DD, YYYY")
                      : ""}
                  </p>
                </div>
              </Link>

              <div className="hidden md:inline-block">
                <MovieInfo movieInfo={sortedItem} type="cast" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10">
        <h2 className="font-bold text-xl">Credits</h2>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <h2 className="font-semibold my-5 text-lg">Cast</h2>

            <div className="flex flex-col space-y-4">
              {personData.combined_credits?.cast.map((castItem) => (
                <div key={castItem.id}>
                  <div className="flex items-center space-x-5 h-[141px] w-full">
                    <Link
                      className="flex items-center space-x-5 md:w-[60%]"
                      key={castItem.id}
                      href={`/${
                        castItem.media_type === "movie" ? "movies" : "tv"
                      }/${castItem.id}`}
                    >
                      <div className="h-full min-w-[94px] w-[94px]">
                        <Image
                          className="h-full w-full object-cover"
                          style={{ borderRadius: "5px" }}
                          src={
                            castItem.poster_path
                              ? `${process.env.NEXT_PUBLIC_TMDB_IMG_URL}/${castItem.poster_path}`
                              : "https://banner2.cleanpng.com/20180628/jvc/kisspng-clapperboard-computer-icons-film-download-movie-poster-5b359e7b2db090.7720687515302406351872.jpg"
                          }
                          height={0}
                          width={0}
                          sizes="100vw"
                          alt={castItem.title || castItem.original_title}
                        />
                      </div>

                      <div>
                        <p className="font-bold text-sm">
                          {castItem.title ||
                            castItem.original_title ||
                            castItem.original_name ||
                            "-"}
                        </p>

                        <div className="flex space-x-1 items-cente mt-1 text-sm">
                          <Star color="yellow" size={13} />

                          <p>{castItem.vote_average.toFixed(2)}</p>
                        </div>

                        <p className="line-clamp-2 mt-1 text-sm text-gray-400">
                          {castItem.character}
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                          {castItem.release_date
                            ? dayjs(castItem.release_date).format(
                                "MMM DD, YYYY"
                              )
                            : castItem.first_air_date
                            ? dayjs(castItem.first_air_date).format(
                                "MMM DD, YYYY"
                              )
                            : ""}
                        </p>
                      </div>
                    </Link>

                    <div className="hidden md:inline-block">
                      <MovieInfo movieInfo={castItem} type="cast" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold my-5 text-lg">Crew</h2>

            <div className="flex flex-col space-y-4">
              {personData.combined_credits?.crew.length > 0 ? (
                personData.combined_credits?.crew.map((crewItem) => (
                  <div key={crewItem.id}>
                    <div className="flex items-center space-x-5 h-[141px] w-full">
                      <Link
                        className="flex items-center space-x-5 md:w-[60%]"
                        key={crewItem.id}
                        href={`/${
                          crewItem.media_type === "movie" ? "movies" : "tv"
                        }/${crewItem.id}`}
                      >
                        <div className="h-full min-w-[94px] w-[94px]">
                        <Image
                          className="h-full w-full object-cover"
                          style={{ borderRadius: "5px" }}
                          src={
                            crewItem.poster_path
                              ? `${process.env.NEXT_PUBLIC_TMDB_IMG_URL}/${crewItem.poster_path}`
                              : "https://banner2.cleanpng.com/20180628/jvc/kisspng-clapperboard-computer-icons-film-download-movie-poster-5b359e7b2db090.7720687515302406351872.jpg"
                          }
                          height={0}
                          width={0}
                          sizes="100vw"
                          alt={crewItem.title || crewItem.original_title}
                        />
                      </div>

                        <div>
                          <p className="font-bold text-sm">
                            {crewItem.title ||
                              crewItem.original_title ||
                              crewItem.original_name ||
                              "-"}
                          </p>

                          <div className="flex space-x-1 items-cente mt-1 text-sm">
                            <Star color="yellow" size={13} />

                            <p>{crewItem.vote_average.toFixed(2)}</p>
                          </div>

                          <p className="mt-1 text-sm text-gray-400">
                            {crewItem.job}
                          </p>

                          <p className="mt-1 text-sm text-gray-400">
                            {crewItem.release_date
                              ? dayjs(crewItem.release_date).format(
                                  "MMM DD, YYYY"
                                )
                              : crewItem.first_air_date
                              ? dayjs(crewItem.first_air_date).format(
                                  "MMM DD, YYYY"
                                )
                              : ""}
                          </p>
                        </div>
                      </Link>

                      <div className="hidden md:inline-block">
                        <MovieInfo movieInfo={crewItem} type="crew" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="font-semibold text-lg">No Crew</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonById;
