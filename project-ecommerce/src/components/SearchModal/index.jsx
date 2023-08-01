import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SearchMod.css";

import Arrow from "../../assets/icons/arrowProfile.svg";
import Heart from "../../assets/icons/Fill=False(1).svg";

import Bag from "../../assets/Img/bolsa_rosa.jpg";
import Perfume from "../../assets/Img/perfume.jpg";

function SearchModal() {
  return (
    <>
      <div className="Window-modalSearch">
        <div className="bar-modalSearch">
          <Link to="/">
            <img className="redirect-modalSearch" src={Arrow} alt="Back" />
          </Link>
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
            <div>
              <img className="productimg-modalSearch" src={Bag} alt="" />
              <img className="heart-modalSearch" src={Heart} alt="Heart" />
              <h5>Grande</h5>
              <p>Blossom Pouch</p>
              <p>$39.49</p>
            </div>

            <div>
              <img className="productimg-modalSearch" src={Perfume} alt="" />
              <img className="heart-modalSearch" src={Heart} alt="Heart" />
              <h5>Grande</h5>
              <p>Blossom Pouch</p>
              <p>$39.49</p>
            </div>

            <div>
              <img className="productimg-modalSearch" src={Bag} alt="" />
              <img className="heart-modalSearch" src={Heart} alt="Heart" />
              <h5>Grande</h5>
              <p>Blossom Pouch</p>
              <p>$39.49</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchModal;
