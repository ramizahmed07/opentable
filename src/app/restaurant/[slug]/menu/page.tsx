import prisma from "@/app/client";
import Header from "../components/Header";
import Menu from "../components/Menu";
import RestaurantNavBar from "../components/RestaurantNavBar";

export const metadata = {
  title: "Menu of Milestones Grill (Toronto)",
};

const fetchRestaurantMenu = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: { items: true },
  });

  if (!restaurant) throw new Error();

  return restaurant.items;
};

export default async function RestaurantMenu({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const menu = await fetchRestaurantMenu(slug);

  return (
    <>
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        <div className="bg-white w-[100%] rounded p-3 shadow">
          <RestaurantNavBar slug={slug} />
          <Menu menu={menu} />
        </div>
      </div>
    </>
  );
}
