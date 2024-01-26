"use client";

import CardsView from "@/components/Cards-View";
import { getPopularPeople } from "@/services/home.apis";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const initialData = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

const PopularPeople = () => {
  const [popularPeople, setPopularPeople] = useState(initialData);
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const fetchPopularPeopleData = async () => {
    const data = await getPopularPeople(page ? parseInt(page) : 1);
    setPopularPeople(data);
  };

  useEffect(() => {
    fetchPopularPeopleData();
  }, []);

  return (
    <div className="mx-[2%] md:mx-[10%] lg:mx-[15%] my-10">
      <h2 className="font-bold text-xl mb-10">Popular People</h2>

      <CardsView
        data={popularPeople}
        currentPage={page ? parseInt(page) : 1}
        type="people"
        urlType="people/popular"
      />
    </div>
  );
};

export default PopularPeople;
