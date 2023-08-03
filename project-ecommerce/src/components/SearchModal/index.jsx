import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SearchMod.css";

import Arrow from "../../assets/icons/arrowProfile.svg";
import Lupa from "../../assets/imgHeader/search.svg";
import Cross from "../../assets/icons/cross-small.svg";
import Autofill from "../../assets/icons/auto-fill.svg";

import { ProductContext } from "../../Contexts/products";
import ProductContainer from "../ProductContainer";

function SearchModal({ closeModal }) {
  const [searchQuery, setSearchQuery] = useState("");
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const { products } = useContext(ProductContext);

  const filteredProducts = products.filter((product) => {
    const nameP = product.name.toLowerCase();
    const categoryP = product.category.toLowerCase();
    const searchQ = searchQuery.toLowerCase();
    return nameP.startsWith(searchQ) || categoryP.startsWith(searchQ);
  });

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/results/${searchQuery}`);
  };

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
          <button className="redirect" onClick={handleRedirect}>
            <img src={Lupa} alt="Search" />
          </button>
        </div>
        <div className="dropdown">
          {searchQuery &&
            filteredProducts.map((product) => (
              <div className="dropdownRow" key={product.id}>
                <img src={Cross} />
                {product.name || product.category}
                <img src={Autofill} />
              </div>
            ))}
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
