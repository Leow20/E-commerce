import React, { useState } from "react";
import "./SearchMod.css";

import Arrow from "../../assets/icons/arrowProfile.svg";

function SearchModal() {
  const [searchMod, setSearchMod] = useState(true);

  const handleColse = () => {
    setSearchMod(false);
  };

  return (
    <>
      <div className="Window-modalSearch">
        <div className="bar-modalSearch">
          <button onClick={handleColse}>
            <img src={Arrow} alt="Back" />
          </button>
          <input
            type="search"
            name="searchInput"
            id="searchId"
            placeholder="Search"
          />
        </div>
      </div>
    </>
  );
}

export default SearchModal;
