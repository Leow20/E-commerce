import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { ProductContext } from "../../Contexts/products";

//Images
import hero from "../../assets/img/heroCategories.jpg";
import StarFill from "../../assets/icons/star-fill.svg";
import Star from "../../assets/icons/star.svg";

//Icons
import arrowProfile from "../../assets/icons/arrowProfile.svg";
import sort from "../../assets/icons/sort.svg";
import filterIcon from "../../assets/icons/filter.svg";
import arrow from "../../assets/icons/blackArrow.svg";
import { FaPlus, FaMinus } from "react-icons/fa";

//Style
import "./resultCategories.css";

//Component
import ProductContainer from "../../components/ProductContainer";
import SlideUpModal from "../../components/SlideUpModal";
import FilterModal from "../../components/FilterModal";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const busca = "";

const ResultCategories = () => {
  const { products } = useContext(ProductContext);
  const [result, setResult] = useState("");
  const [sortby, setSortby] = useState(null);
  const [filter, setFilter] = useState({
    color: [],
    rating: [],
    brand: [],
    price: [],
    discount: [],
  });
  const [showUpModal, setShowUpModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [tabReview, setTabReview] = useState(false);
  const [tabColor, setTabColor] = useState(false);
  const [tabBrand, setTabBrand] = useState(false);
  const [tabPrice, setTabPrice] = useState(false);
  const [tabDiscount, setTabDiscount] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  const isMobile = useMediaQuery({ maxWidth: 820 });
  var lowProducts = [];

  const handleSortBy = (value) => {
    setSortby(value);
  };

  const handleFilter = (value) => {
    console.log(value);
    setFilter(value);
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
    console.log(filter);
    var filterProducts = products.filter(
      (product) =>
        product.name.includes(busca.toLowerCase()) ||
        product.category.includes(busca.toLowerCase()) ||
        product.description.includes(busca.toLowerCase())
    );
    if (filter.color.length > 0) {
      filterProducts = filterProducts.filter((product) =>
        filter.color.some((color) => product.color.includes(color))
      );
      console.log(filterProducts);
    }

    if (filter.rating.length > 0) {
      filterProducts = filterProducts.filter((product) =>
        filter.rating.some((rating) => product.stars == rating)
      );
    }

    if (filter.brand.length > 0) {
      console.log(filter);
      filterProducts = filterProducts.filter((product) =>
        filter.brand.some((brand) => product.brand == brand)
      );
    }

    if (filter.price.length > 0) {
      filterProducts = filterProducts.filter((product) =>
        filter.price.some((priceRange) => {
          const price = parseFloat(
            product.price.replace("$", "").replace(".", "")
          );
          console.log(price);
          if (priceRange === "0-50") {
            return price <= 50;
          } else if (priceRange === "50-100") {
            return price > 50 && price <= 100;
          } else if (priceRange === "100-200") {
            return price > 100 && price <= 200;
          } else if (priceRange === "200-400") {
            return price > 200 && price <= 400;
          } else if (priceRange === "400") {
            return price > 400;
          } else {
            return true;
          }
        })
      );
    }

    if (filter.discount.length > 0) {
      filterProducts = filterProducts.filter((product) =>
        filter.discount.some((discountRange) => {
          const discount = product.discount;
          if (discountRange === "10-20") {
            return discount >= 10 && discount <= 20;
          } else if (discountRange === "20-30") {
            return discount > 20 && discount <= 30;
          } else if (discountRange === "30-40") {
            return discount > 30 && discount <= 40;
          } else if (discountRange === "40-50") {
            return discount > 40 && discount <= 50;
          } else if (discountRange === "50+") {
            return discount > 50;
          } else {
            return true;
          }
        })
      );
    }

    console.log(filterProducts);
    console.log(sortby);
    handleSort(filterProducts, sortby);
  }, [busca, sortby, filter]);

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

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (tab) => {
    if (tab == "color") {
      setTabColor(!tabColor);
    } else if (tab == "review") {
      setTabReview(!tabReview);
    } else if (tab == "brand") {
      setTabBrand(!tabBrand);
    } else if (tab == "price") {
      setTabPrice(!tabPrice);
    } else if (tab == "discount") {
      setTabDiscount(!tabDiscount);
    }
    console.log(isMenuOpen);
  };

  const truncateDescription = (description, maxWords) => {
    const words = description.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return description;
  };

  return (
    <div>
      {isMobile && (
        <div className="container-results">
          <div>
            <SlideUpModal
              isOpen={showUpModal}
              page={"result"}
              onValueReturn={handleSortBy}
            />
          </div>
          <div>
            <FilterModal
              isOpen={showFilter}
              onFilterReturn={handleFilter}
              filterProps={filter}
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
                  <Link to={`/product/${product.id}`} key={product.id}>
                    <ProductContainer product={product} page="result" />
                  </Link>
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
              <div
                className="content-filter-result"
                onClick={() => setShowFilter(!showFilter)}
              >
                <img src={filterIcon} alt="filter icon" />
                <span>FILTER</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isMobile && (
        <>
          <Header />
          <div className="page-wrapper-web-result">
            <div className="hero-results-web">
              <img src={hero} alt="img hero 70% off" />
            </div>
            <div className="path-to-cart-mybag">
              <Link to="/">
                {" "}
                <p>Home</p>
              </Link>
              <img src={arrow} />
              {busca != "" && <p>{busca}</p>}
              {busca == "" && <p>View All</p>}
            </div>
            <h1 className="title-result-web">{busca}</h1>
          </div>
          <div className="container-filter-products-result">
            <div className="container-filters-web">
              <div className="collapsible-filter">
                <span>Reviews</span>
                <button
                  className="menu-button"
                  onClick={() => toggleMenu("review")}
                >
                  {tabReview ? <FaMinus /> : <FaPlus />}
                </button>
                <div className={`menu-items ${tabReview ? "open" : ""}`}>
                  <FilterModal
                    isOpen={showFilter}
                    onFilterReturn={handleFilter}
                    filterProps={filter}
                    tab="review"
                  />
                </div>
              </div>
              <div className="collapsible-filter">
                <span>Color</span>
                <button
                  className="menu-button"
                  onClick={() => toggleMenu("color")}
                >
                  {tabColor ? <FaMinus /> : <FaPlus />}
                </button>
                <div className={`menu-items ${tabColor ? "open" : ""}`}>
                  <FilterModal
                    isOpen={showFilter}
                    onFilterReturn={handleFilter}
                    filterProps={filter}
                    tab="color"
                  />
                </div>
              </div>
              <div className="collapsible-filter">
                <span>Brand</span>
                <button
                  className="menu-button"
                  onClick={() => toggleMenu("brand")}
                >
                  {tabBrand ? <FaMinus /> : <FaPlus />}
                </button>
                <div className={`menu-items ${tabBrand ? "open" : ""}`}>
                  <FilterModal
                    isOpen={showFilter}
                    onFilterReturn={handleFilter}
                    filterProps={filter}
                    tab="brand"
                  />
                </div>
              </div>
              <div className="collapsible-filter">
                <span>Price</span>
                <button
                  className="menu-button"
                  onClick={() => toggleMenu("price")}
                >
                  {tabPrice ? <FaMinus /> : <FaPlus />}
                </button>
                <div className={`menu-items ${tabPrice ? "open" : ""}`}>
                  <FilterModal
                    isOpen={showFilter}
                    onFilterReturn={handleFilter}
                    filterProps={filter}
                    tab="price"
                  />
                </div>
              </div>
              <div className="collapsible-filter">
                <span>Discount</span>
                <button
                  className="menu-button"
                  onClick={() => toggleMenu("discount")}
                >
                  {tabDiscount ? <FaMinus /> : <FaPlus />}
                </button>
                <div className={`menu-items ${tabDiscount ? "open" : ""}`}>
                  <FilterModal
                    isOpen={showFilter}
                    onFilterReturn={handleFilter}
                    filterProps={filter}
                    tab="discount"
                  />
                </div>
              </div>
            </div>
            <div className="cointainer-products-web">
              {result && (
                <div className="container-products-results-web">
                  {result.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id}>
                      <div className="product-container-result">
                        <div className="product-image-result">
                          <img src={product.url} alt="produto" />
                        </div>
                        <div className="text-product-result-web">
                          <span>{truncateDescription(product.name, 2)}</span>
                          <span>
                            {truncateDescription(product.description, 2)}
                          </span>
                          <div className="content-stars-data">
                            <img
                              src={
                                product.stars > 0 && product.stars >= 1
                                  ? StarFill
                                  : Star
                              }
                              alt="Stars"
                            />
                            <img
                              src={
                                product.stars > 1 && product.stars >= 2
                                  ? StarFill
                                  : Star
                              }
                              alt="Stars"
                            />
                            <img
                              src={
                                product.stars > 2 && product.stars >= 3
                                  ? StarFill
                                  : Star
                              }
                              alt="Stars"
                            />
                            <img
                              src={
                                product.stars > 3 && product.stars >= 4
                                  ? StarFill
                                  : Star
                              }
                              alt="Stars"
                            />
                            <img
                              src={
                                product.stars > 4 && product.stars >= 5
                                  ? StarFill
                                  : Star
                              }
                              alt="Stars"
                            />
                          </div>
                          <div className="container-product-price">
                            <span>{product.price}</span>
                            <span>{product.priceWithDiscount}</span>
                            {product.discount > 0 && (
                              <span>{product.discount}% OFF</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Footer />
        </>
      )}
    </div>
  );
};

export default ResultCategories;
