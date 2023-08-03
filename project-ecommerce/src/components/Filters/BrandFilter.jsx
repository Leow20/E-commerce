import React, { useEffect, useState } from "react";

const BrandFilter = ({ brandReturn, filterProps }) => {
  const brandsData = [
    { value: "zara", label: "Zara" },
    { value: "dng", label: "D&G (Dolce & Gabbana)" },
    { value: "hm", label: "H&M" },
    { value: "chanel", label: "Chanel" },
    { value: "prada", label: "Prada" },
    { value: "biba", label: "Biba" },
  ];

  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedBrands((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedBrands((prevSelected) =>
        prevSelected.filter((brand) => brand !== value)
      );
    }
  };

  useEffect(() => {
    const handleFilterReturn = () => {
      brandReturn(selectedBrands);
    };
    handleFilterReturn();
  }, [selectedBrands]);

  useEffect(() => {
    if (filterProps) {
      setSelectedBrands(filterProps.brand);
      if (filterProps.brand == undefined) {
        setSelectedBrands([]);
      }
    }
  }, [filterProps]);

  return (
    <div>
      <form className="form-input-filters">
        {brandsData.map((brand) => (
          <div className="checkbox-results" key={brand.value}>
            <input
              type="checkbox"
              name="brands"
              value={brand.value}
              id={brand.value}
              checked={selectedBrands.includes(brand.value)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={brand.value}>{brand.label}</label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default BrandFilter;
