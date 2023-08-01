import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { ProductContext } from "../../Contexts/products";

//Icons
import arrowProfile from "../../assets/icons/arrowProfile.svg";
import sort from "../../assets/icons/sort.svg";
import filter from "../../assets/icons/filter.svg";

//Style
import "./resultCategories.css";

//Component
import ProductContainer from "../../components/ProductContainer";

const busca = "Hand";

const ResultCategories = () => {
  const { products } = useContext(ProductContext);
  const [result, setResult] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 820 });
  var lowProducts = [];

  useEffect(() => {
    const transformToLowercase = () => {
      if (products) {
        products.forEach((item) => {
          const transformedItem = {
            ...item,
            name: item.name.toLowerCase(),
            description: item.description.toLowerCase(),
          };
          lowProducts.push(transformedItem);
        });
      }
    };

    transformToLowercase();
    console.log(lowProducts);
    const filterProducts = products.filter(
      (team) =>
        team.name.includes(busca.toLowerCase()) ||
        team.category.includes(busca.toLowerCase()) ||
        team.description.includes(busca.toLowerCase())
    );
    console.log(filterProducts);
    setResult(filterProducts);
    console.log(result);
  }, [busca]);

  return (
    <div>
      {" "}
      {isMobile && (
        <>
          <div className="page-wrapper-modal-info">
            <header>
              <Link to="/">
                {" "}
                <div>
                  <img src={arrowProfile} alt="icone seta" />
                </div>
              </Link>

              <h1>{busca}</h1>
            </header>
            {result.length > 1 && isMobile ? (
              <div className="qty-product-result">
                {" "}
                <p>{`${result.length} Products`}</p>
              </div>
            ) : (
              <div className="qty-product-result">
                {" "}
                <p>{`${result.length} Product`}</p>
              </div>
            )}
            {result && (
              <div className="container-products-results">
                {products.map((product) => (
                  <ProductContainer product={product} key={product.id} />
                ))}
              </div>
            )}
            <div className="container-filter-result">
              <div className="content-filter-result">
                <img src={sort} alt="sort icon" />
                <span>SORT</span>
              </div>
              <div className="content-filter-result">
                <img src={filter} alt="filter icon" />
                <span>FILTER</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultCategories;
