import prisma from "./client";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";

const fetchRestaurants = () => {
  return prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      slug: true,
      price: true,
      reviews: true,
    },
  });
};

export default async function Home() {
  const restaurants = await fetchRestaurants();
  return (
    <>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map((restaurant, idx) => (
          <RestaurantCard key={idx} restaurant={restaurant} />
        ))}
      </div>
    </>
  );
}
