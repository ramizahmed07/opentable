import React from "react";
import Image from "next/image";
import { Review } from "@prisma/client";

import { calculateReviewRating } from "../utils/caculateReviewRating";
import fullStar from "public/icons/full-star.png";
import halfStar from "public/icons/half-star.png";
import emptyStar from "public/icons/empty-star.png";

export default function Stars({ reviews }: { reviews: Review[] }) {
  const rating = calculateReviewRating(reviews);

  const renderStar = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const diff = +(rating - i).toFixed(1);
      if (diff > 1) stars.push(fullStar);
      else if (diff < 1 && diff > 0) {
        if (diff <= 0.2) stars.push(emptyStar);
        else if (diff > 0.2 && diff <= 0.6) stars.push(halfStar);
        else stars.push(fullStar);
      } else stars.push(emptyStar);
    }
    return stars.map((star) => (
      <Image className="w-4 h-4 mr-1" src={star} alt="star icon" />
    ));
  };

  return <div className="flex items-center">{renderStar()}</div>;
}
