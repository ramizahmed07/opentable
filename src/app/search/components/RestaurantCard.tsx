import Price from "@/app/components/Price";
import { Cuisine, Location, Price as PRICE } from "@prisma/client";
import Link from "next/link";

interface Restaurant {
  id: number;
  main_image: string;
  name: string;
  price: PRICE;
  cuisine: Cuisine;
  location: Location;
  slug: string;
}

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  return (
    <div className="border-b flex pb-5">
      {/* <Link href={`/restaurant/${restaurant.slug}`}> */}
      <img src={restaurant.main_image} alt="" className="w-44 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">*****</div>
          <p className="ml-2 text-sm">Awesome</p>
        </div>
        <div className="mb-9">
          <div className="flex text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
}
