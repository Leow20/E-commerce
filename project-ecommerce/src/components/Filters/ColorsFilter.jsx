import React, { useEffect, useState } from "react";

import "./index.css";
import { useMediaQuery } from "react-responsive";

const ColorsFilter = ({ colorReturn, filterProps }) => {
  const isMobile = useMediaQuery({ maxWidth: 820 });
  const colorsData = [
    { name: "Blue", value: "blue" },
    { name: "Marron Red", value: "marron-red" },
    { name: "Crimson Red", value: "crimson-red" },
    { name: "Seinna Pink", value: "seinna-pink" },
    { name: "Teal", value: "teal" },
    { name: "Aquamarine", value: "aquamarine" },
    { name: "Off-White", value: "off-white" },
    { name: "Muave Orange", value: "muave-orange" },
  ];

  const [selectedColors, setSelectedColors] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedColors((prevSelectedColors) => [...prevSelectedColors, value]);
    } else {
      setSelectedColors((prevSelectedColors) =>
        prevSelectedColors.filter((color) => color !== value)
      );
    }
  };

  useEffect(() => {
    const handleFilterReturn = () => {
      colorReturn(selectedColors);
    };
    handleFilterReturn();
  }, [selectedColors]);

  useEffect(() => {
    if (filterProps && isMobile) {
      setSelectedColors(filterProps.color);
      if (filterProps.color == undefined) {
        setSelectedColors([]);
      }
    }
  }, [filterProps]);

  console.log(selectedColors);

  return (
    <div>
      <form className="form-input-filters">
        {colorsData.map((color) => (
          <div className="checkbox-results" key={color.value}>
            <input
              type="checkbox"
              name="colors"
              value={color.value}
              id={color.value}
              checked={selectedColors.includes(color.value)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={color.value}>{color.name}</label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default ColorsFilter;
