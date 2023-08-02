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
import SlideUpModal from "../../components/SlideUpModal";

const busca = "Hand";

const ResultCategories = () => {
  const { products } = useContext(ProductContext);
  const [result, setResult] = useState("");
  const [sortby, setSortby] = useState(null);
  const [showUpModal, setShowUpModal] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 820 });
  var lowProducts = [];

  const handleSortBy = (value) => {
    setSortby(value);
  };

  function organizarPorMenorPreco(array) {
    const value = array.slice().sort((a, b) => {
      const precoA = parseFloat(a.price.replace("$", ""));
      const precoB = parseFloat(b.price.replace("$", ""));
      return precoA - precoB;
    });
    console.log(value);
    setResult(value);
  }

  // Função para organizar o array de objetos com base no preço (do maior para o menor)
  function organizarPorMaiorPreco(array) {
    const value = array.slice().sort((a, b) => {
      const precoA = parseFloat(a.price.replace("$", ""));
      const precoB = parseFloat(b.price.replace("$", ""));
      return precoB - precoA;
    });
    console.log(value);
    setResult(value);
  }

  function organizarPorMaiorPopularidade(array) {
    const value = array.slice().sort((a, b) => b.stars - a.stars);
    console.log(value);
    setResult(value);
  }

  function organizarPorMaiorDesconto(array) {
    const value = array.slice().sort((a, b) => b?.discount - a?.discount);
    console.log(value);
    setResult(value);
  }

  function organizarPorMaisRecente(array) {
    const value = array.slice().reverse();
    setResult(value);
  }

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

    console.log(sortby);

    handleSort(filterProducts, sortby);
  }, [busca, sortby]);

  function handleSort(filterProducts) {
    if (sortby) {
      switch (sortby) {
        case "priceLowToHigh":
          return organizarPorMenorPreco(filterProducts);
        case "priceHighToLow":
          return organizarPorMaiorPreco(filterProducts);
        case "popularity":
          return organizarPorMaiorPopularidade(filterProducts);
        case "discount":
          return organizarPorMaiorDesconto(filterProducts);
        case "latest":
          return organizarPorMaisRecente(filterProducts);
        default:
          console.error("Opção de ordenação inválida!");
          return filterProducts;
      }
    } else {
      setResult(filterProducts);
    }
  }

  return (
    <div>
      {isMobile && (
        <>
          <div>
            <SlideUpModal
              isOpen={showUpModal}
              page={"result"}
              onValueReturn={handleSortBy}
            />
          </div>
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
                {result.map((product) => (
                  <ProductContainer product={product} key={product.id} />
                ))}
              </div>
            )}
            <div className="container-filter-result">
              <div
                className="content-filter-result"
                onClick={() => setShowUpModal(!showUpModal)}
              >
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
