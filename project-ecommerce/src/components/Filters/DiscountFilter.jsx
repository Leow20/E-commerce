import React, { useEffect, useState } from "react";

const DiscountFilter = ({ discountReturn, filterProps }) => {
  const discountsData = [
    { value: "10-20", label: "10% - 20% Off" },
    { value: "20-30", label: "20% - 30% Off" },
    { value: "30-40", label: "30% - 40% Off" },
    { value: "40-50", label: "40% - 50% Off" },
    { value: "50+", label: "50%+" }, // For discounts greater than 50%
  ];

  const [selectedDiscounts, setSelectedDiscounts] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedDiscounts((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedDiscounts((prevSelected) =>
        prevSelected.filter((discount) => discount !== value)
      );
    }
  };

  useEffect(() => {
    const handleFilterReturn = () => {
      discountReturn(selectedDiscounts);
    };
    handleFilterReturn();
  }, [selectedDiscounts]);

  useEffect(() => {
    if (filterProps) {
      setSelectedDiscounts(filterProps.discount);
      if (filterProps.discount == undefined) {
        setSelectedDiscounts([]);
      }
    }
  }, [filterProps]);

  return (
    <div>
      <form className="form-input-filters">
        {discountsData.map((discount) => (
          <div className="checkbox-results" key={discount.value}>
            <input
              type="checkbox"
              name="discounts"
              value={discount.value}
              id={discount.value}
              checked={selectedDiscounts.includes(discount.value)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={discount.value}>{discount.label}</label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default DiscountFilter;
