import React from "react";
import { Price as PRICE } from "@prisma/client";

export default function Price({ price }: { price: PRICE }) {
  const renderPrice = () => {
    if (price === PRICE.CHEAP)
      return (
        <>
          <span>$$</span> <span className="text-gray-400">$$</span>
        </>
      );
    if (price === PRICE.REGULAR)
      return (
        <>
          <span>$$$</span> <span className="text-gray-400">$</span>
        </>
      );
    else
      return (
        <>
          <span>$$$$</span>
        </>
      );
  };

  return <div className="flex mr-3">{renderPrice()}</div>;
}
