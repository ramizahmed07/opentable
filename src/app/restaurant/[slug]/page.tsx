import { Review } from "@prisma/client";

import prisma from "@/lib/prisma";
import Description from "./components/Description";
import Images from "./components/Images";
import Rating from "./components/Rating";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Reviews from "./components/Reviews";
import Title from "./components/Title";

export const metadata = {
  title: "Milestones Grill (Toronto)",
};

interface Restaurant {
  slug: string;
  id: number;
  name: string;
  images: string[];
  description: string;
  reviews: Review[];
}

const fetchRestaurant = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
    },
  });
  if (!restaurant) throw new Error();
  return restaurant;
};

export default async function RestaurantDetails({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const restaurant = await fetchRestaurant(slug);

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Rating reviews={restaurant.reviews} />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews reviews={restaurant.reviews} />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </>
  );
}
