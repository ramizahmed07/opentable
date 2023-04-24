import { Metadata } from "next";

import { SearchParams } from "./types";
import prisma from "@/app/client";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";

export const metadata: Metadata = {
  title: "Search Restaurants",
};

const fetchRestaurantsByParams = (searchParams: SearchParams) => {
  const where: any = {};
  const select = {
    id: true,
    main_image: true,
    name: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
    reviews: true,
  };

  if (!Object.keys(searchParams).length)
    return prisma.restaurant.findMany({ select });

  for (let key in searchParams) {
    const value = searchParams[key as keyof SearchParams];
    where[key] =
      key === "price"
        ? value
        : {
            name: {
              equals: value,
            },
          };
  }

  return prisma.restaurant.findMany({
    where,
    select,
  });
};

const fetchLocations = () => prisma.location.findMany();
const fetchCuisines = () => prisma.cuisine.findMany();

export default async function Search({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const restaurants = await fetchRestaurantsByParams(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          searchParams={searchParams}
          locations={locations}
          cuisines={cuisines}
        />
        <div className="w-5/6">
          {restaurants.length ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <p>Sorry, we found no restaurants in this area</p>
          )}
        </div>
      </div>
    </>
  );
}
