"use client";
import { useEffect, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { CardData } from "@/typings/typings";
import { ChevronDown } from "lucide-react";
import { getTrending } from "@/services/home.apis";
import PaginationMovieCards from "@/components/Pagination-Cards";

const initialData = {
  page: 1,
  results: [],
};

interface FilterMenuProps {
  timeFrame: "day" | "week";
  setTimeFrame: React.Dispatch<React.SetStateAction<"day" | "week">>;
}

const FilterMenu = ({ timeFrame, setTimeFrame }: FilterMenuProps) => {
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
            }}
          >
            Week
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

const Trending = () => {
  const [page, setPage] = useState(1);
  const [timeFrame, setTimeFrame] = useState<"day" | "week">("day");
  const [trendingData, setTrendingData] = useState<CardData>(initialData);


  return (
    <div className="m-10">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">Trending</h2>
        <FilterMenu timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
      </div>

      <PaginationMovieCards data={trendingData} />
    </div>
  );
};

export default Trending;
