import { useProductCart } from "@/Hooks/ProductCart";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

type Props = {};

const Rating = (props: Props) => {
  const [rating, setRating] = useState<number>(1);
  const [hover, setHover] = useState<null | number>(null);

  return (
    <div style={{ display: "flex" }}>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              color={ratingValue <= (hover || rating) ? "#ff5733" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}

      <p style={{ fontSize: "17px", marginLeft: "10px" }}>({rating})</p>
    </div>
  );
};

export default Rating;
