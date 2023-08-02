import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./SearchMod.css";

import Arrow from "../../assets/icons/arrowProfile.svg";
import Heart from "../../assets/icons/Fill=False(1).svg";

import Bag from "../../assets/Img/bolsa_rosa.jpg";
import Perfume from "../../assets/Img/perfume.jpg";
import { ProductContext } from "../../Contexts/products";
import ProductContainer from "../ProductContainer";

function SearchModal({ closeModal }) {
  const handleChange = (e) => {
    const digitando = e.target.value;
    console.log(digitando);
  };

  const { products } = useContext(ProductContext);
  console.log(products);

  return (
    <>
      <div className="Window-modalSearch">
        <div className="bar-modalSearch">
          <button
            className="redirect-modalSearch"
            onClick={() => closeModal(false)}
          >
            <img src={Arrow} alt="Back" />
          </button>
          <input
            onChange={handleChange}
            type="search"
            name="searchInput"
            id="searchId"
            placeholder="Search"
          />
        </div>
        <h4 className="title-modalSearch">Recent Searchs</h4>
        <div className="recent-searchs-modalSearch">
          <button>Womens Wrist Watches</button>
          <button>Chanel Perfumes</button>
          <button>Claute Bags</button>
        </div>
        <div className="newArrives-modalSearch">
          <h4 className="title-modalSearch">New Arrivals</h4>
          <div className="recomend-products-modalSearch">
            {products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <ProductContainer product={product} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchModal;
