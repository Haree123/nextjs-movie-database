type TimeFrame = "day" | "week";

export const getTrending = async (page: number, timeFrame: TimeFrame) => {
  const queryParams = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY as string,
    page: String(page),
  });

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/trending/all/${timeFrame}?${queryParams}`
  );
  return data.json();
};
