"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ChevronDown } from "lucide-react";
import { CardData } from "@/typings/typings";
import { getTrending } from "@/services/home.apis";
import { useRouter } from "next/navigation";
import MovieCard from "./Movie-Card";

let trendingPage = 1;

const FilterMenu = ({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<CardData>>;
}) => {
  type timeFrameType = "day" | "week";
  const [timeFrame, setTimeFrame] = useState<timeFrameType>("day");
  //to avoid initial api call.
  const [isFilterClicked, setIsFilterClicked] = useState(false);

  const fetchData = async () => {
    const trendingData = await getTrending(trendingPage, timeFrame);
    setData(trendingData);
    setIsFilterClicked(false);
  };

  useEffect(() => {
    if (isFilterClicked) {
      fetchData();
    }
  }, [isFilterClicked, timeFrame]);

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          Filter By <ChevronDown className="ml-3" size={15} />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            onClick={() => {
              if (timeFrame === "day") {
                return;
              }
              setTimeFrame("day");
              setIsFilterClicked(true);
            }}
          >
            Today
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
            onClick={() => {
              if (timeFrame === "week") {
                return;
              }
              setTimeFrame("week");
              setIsFilterClicked(true);
            }}
          >
            Week
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

const MovieCardWrapper = ({ initialData }: { initialData: CardData }) => {
  const router = useRouter();
  const [data, setData] = useState<CardData>(initialData);

  return (
    <>
      {data ? (
        <>
          <div className="flex justify-between items-center space-x-4">
            <h2 className="font-bold text-2xl">Trending</h2>
            <div className="flex items-center space-x-3">
              <FilterMenu setData={setData} />
              <Button
                variant="outline"
                onClick={() => {
                  router.push("/trending");
                }}
              >
                View All
              </Button>
            </div>
          </div>
          <MovieCard data={data} />
        </>
      ) : null}
    </>
  );
};

export default MovieCardWrapper;
