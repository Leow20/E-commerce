import React from "react";

const ReviewBar = ({ rating, starCount }) => {
  const filledPercentage = (rating / starCount) * 100;

  return (
    <div className="container-bar">
      <div className="review-bar">
        <div
          className="filled-bar"
          style={{
            width: `${filledPercentage}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ReviewBar;
