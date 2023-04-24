import Link from "next/link";
import { Cuisine, Location, Price } from "@prisma/client";

import { SearchParams } from "../types";

export default function SearchSideBar({
  cuisines,
  locations,
  searchParams,
}: {
  cuisines: Cuisine[];
  locations: Location[];
  searchParams: SearchParams;
}) {
  const prices = [
    {
      price: Price.CHEAP,
      label: "$",
    },
    {
      price: Price.REGULAR,
      label: "$$",
    },
    {
      price: Price.EXPENSIVE,
      label: "$$$",
    },
  ];
  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {locations.map((location) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                location: location.name,
              },
            }}
            key={location.id}
            className="font-light text-reg capitalize"
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                cuisine: cuisine.name,
              },
            }}
            key={cuisine.id}
            className="font-light text-reg capitalize"
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex pr-3">
          {prices.map((price) => (
            <Link
              key={price.label}
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  price: price.price,
                },
              }}
              className="border w-full text-reg font-light rounded-l p-2"
            >
              {price.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
