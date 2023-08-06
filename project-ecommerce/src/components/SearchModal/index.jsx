import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SearchMod.css";

import Arrow from "../../assets/icons/arrowProfile.svg";
import Lupa from "../../assets/imgHeader/search.svg";
import Cross from "../../assets/icons/cross-small.svg";
import Autofill from "../../assets/icons/auto-fill.svg";

import { ProductContext } from "../../Contexts/products";
import ProductContainer from "../ProductContainer";
import { useMediaQuery } from "react-responsive";

function SearchModal({ closeModal }) {
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 820 });

  if (isMobile === false) {
    closeModal(false);
  }

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

  const completeSearch = (searchText) => {
    setSearchQuery(searchText);
    console.log(`busca: ${searchText}`);
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
            value={searchQuery}
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
                {product.name || product.category}
                <img
                  onClick={() =>
                    completeSearch(product.name || product.category)
                  }
                  src={Autofill}
                />
              </div>
            ))}
        </div>
        <h4 className="title-modalSearch">Recent Searchs</h4>
        <div className="recent-searchs-modalSearch">
          <button>
            Womens Wrist Watches <img src={Cross} />
          </button>
          <button>
            Chanel Perfumes <img src={Cross} />
          </button>
          <button>
            Claute Bags <img src={Cross} />
          </button>
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
