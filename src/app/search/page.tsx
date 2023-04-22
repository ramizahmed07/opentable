import { Metadata } from "next";

import prisma from "@/app/client";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";

export const metadata: Metadata = {
  title: "Search Restaurants",
};

const fetchRestaurantsByLocation = (city: string) => {
  const select = {
    id: true,
    main_image: true,
    name: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
  };
  if (!city) return prisma.restaurant.findMany({ select });
  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city,
        },
      },
    },
    select,
  });
};

export default async function Search({
  searchParams: { city },
}: {
  searchParams: { city: string };
}) {
  const restaurants = await fetchRestaurantsByLocation(city);

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar />
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
