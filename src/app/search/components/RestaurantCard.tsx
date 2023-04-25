import Link from "next/link";
import { Cuisine, Location, Price as PRICE, Review } from "@prisma/client";

import Price from "@/app/components/Price";
import { calculateReviewRating } from "@/app/utils/caculateReviewRating";
import Stars from "@/app/components/Stars";

interface Restaurant {
  id: number;
  main_image: string;
  name: string;
  price: PRICE;
  cuisine: Cuisine;
  location: Location;
  slug: string;
  reviews: Review[];
}

const renderRatingText = (reviews: Review[]) => {
  const rating = calculateReviewRating(reviews);
  if (rating > 4) return "Awesome";
  else if (rating > 3 && rating <= 4) return "Good";
  else if (rating > 0 && rating <= 3) return "Average";
  else "";
};

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  return (
    <div className="border-b flex pb-5">
      <img src={restaurant.main_image} alt="" className="w-44 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-center">
          <Stars reviews={restaurant.reviews} />
          <p className="ml-2 text-sm">{renderRatingText(restaurant.reviews)}</p>
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
    </div>
  );
}
