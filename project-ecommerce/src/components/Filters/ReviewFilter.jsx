import React, { useEffect, useState } from "react";

const ReviewFilter = ({ filterProps, ratingReturn }) => {
  const ratingsData = [
    { value: "1", label: "1 Star" },
    { value: "2", label: "2 Stars" },
    { value: "3", label: "3 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "5", label: "5 Stars" },
  ];

  const [selectedRating, setSelectedRating] = useState("");

  const handleRadioChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedRating((prevSeletedRating) => [...prevSeletedRating, value]);
    } else {
      setSelectedRating((prevSeletedRating) =>
        prevSeletedRating.filter((rating) => rating !== value)
      );
    }
  };

  useEffect(() => {
    const handleFilterReturn = () => {
      ratingReturn(selectedRating);
    };
    handleFilterReturn();
  }, [selectedRating]);

  useEffect(() => {
    if (filterProps) {
      setSelectedRating(filterProps.rating);
      if (filterProps.rating == undefined) {
        setSelectedColors([]);
      }
    }
  }, [filterProps]);

  return (
    <div>
      <form className="form-input-filters">
        {ratingsData.map((rating) => (
          <div className="checkbox-results" key={rating.value}>
            <input
              type="checkbox"
              name="selectedRating"
              value={rating.value}
              id={rating.value}
              checked={selectedRating.includes(rating.value)}
              onChange={handleRadioChange}
            />
            <label htmlFor={rating.value}>{rating.label}</label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default ReviewFilter;
