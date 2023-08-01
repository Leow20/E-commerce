import React, { useState } from "react";
import "./SearchMod.css";

import Arrow from "../../assets/icons/arrowProfile.svg";

import Bag from "../../assets/Img/bolsa_rosa.jpg";
import Perfume from "../../assets/Img/perfume.jpg";

function SearchModal() {
  const [searchMod, setSearchMod] = useState();

  const handleColse = () => {
    setSearchMod(!searchMod);
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
        <h4 className="title-modalSearch">Recent Searchs</h4>
        <div className="recent-searchs-modalSearch">
          <p>Womens Wrist Watches</p>
          <p>Chanel Perfumes</p>
          <p>Claute Bags</p>
        </div>
        <div className="newArrives-modalSearch">
          <h4 className="title-modalSearch">New Arrivals</h4>
          <div className="recomend-products-modalSearch">
            <img src={Bag} alt="" />
            <h5>Grande</h5>
            <p>Blossom Pouch</p>
            <p>$39.49</p>
            <img src={Perfume} alt="" />
            <h5>Grande</h5>
            <p>Blossom Pouch</p>
            <p>$39.49</p>
            <img src={Bag} alt="" />
            <h5>Grande</h5>
            <p>Blossom Pouch</p>
            <p>$39.49</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchModal;
