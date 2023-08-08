import React, { useEffect, useState } from "react";

const PriceRangeFilter = ({ priceReturn, filterProps }) => {
  const priceRangesData = [
    { value: "0-50", label: "Less than $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "100-200", label: "$100 - $200" },
    { value: "200-400", label: "$200 - $400" },
    { value: "400", label: "More than $400" },
  ];

  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedPriceRanges((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedPriceRanges((prevSelected) =>
        prevSelected.filter((range) => range !== value)
      );
    }
  };

  useEffect(() => {
    const handleFilterReturn = () => {
      priceReturn(selectedPriceRanges);
    };
    handleFilterReturn();
  }, [selectedPriceRanges]);

  useEffect(() => {
    if (filterProps) {
      setSelectedPriceRanges(filterProps.price);
      if (filterProps.price == undefined) {
        setSelectedPriceRanges([]);
      }
    }
  }, [filterProps]);

  return (
    <div>
      <form className="form-input-filters">
        {priceRangesData.map((range) => (
          <div className="checkbox-results" key={range.value}>
            <input
              type="checkbox"
              name="priceRanges"
              value={range.value}
              id={range.value}
              checked={selectedPriceRanges.includes(range.value)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={range.value}>{range.label}</label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default PriceRangeFilter;
