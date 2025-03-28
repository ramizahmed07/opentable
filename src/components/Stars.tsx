import React from "react";
import Image from "next/image";
import { Review } from "@prisma/client";

import { calculateReviewRatingAverage } from "@/utils/caculateReviewRating";
import fullStar from "public/icons/full-star.png";
import halfStar from "public/icons/half-star.png";
import emptyStar from "public/icons/empty-star.png";

export default function Stars({
  reviews,
  rating,
}: {
  reviews: Review[];
  rating?: number;
}) {
  const calculatedRating = rating || calculateReviewRatingAverage(reviews);

  const renderStar = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const diff = +(calculatedRating - i).toFixed(1);
      if (diff > 0.6) stars.push(fullStar);
      if (diff > 0.2 && diff <= 0.6) stars.push(halfStar);
      if (diff <= 0.2) stars.push(emptyStar);
    }
    return stars.map((star, i) => (
      <Image key={i} className="w-4 h-4 mr-1" src={star} alt="star icon" />
    ));
  };

  return <div className="flex item items-center">{renderStar()}</div>;
}
