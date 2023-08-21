import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useParams } from "react-router-dom";
import { ProductContext } from "../../Contexts/products";

//Images
import hero from "../../assets/img/heroCategories.jpg";
import StarFill from "../../assets/icons/star-fill.svg";
import Star from "../../assets/icons/star.svg";
import notSearch from "../../assets/img/art.jpg";

//Icons
import arrowProfile from "../../assets/icons/arrowProfile.svg";
import sort from "../../assets/icons/sort.svg";
import filterIcon from "../../assets/icons/filter.svg";
import arrow from "../../assets/icons/blackArrow.svg";
import gridLine from "../../assets/icons/sort.png";
import grid from "../../assets/icons/gridH.png";
import { FaPlus, FaMinus } from "react-icons/fa";

//Style
import "./resultCategories.css";

//Component
import ProductContainer from "../../components/ProductContainer";
import SlideUpModal from "../../components/SlideUpModal";
import FilterModal from "../../components/FilterModal";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ReviewFilter from "../../components/Filters/ReviewFilter";
import ColorsFilter from "../../components/Filters/colorsFilter";
import BrandFilter from "../../components/Filters/BrandFilter";
import PriceRangeFilter from "../../components/Filters/PriceRangeFilter";
import DiscountFilter from "../../components/Filters/DiscountFilter";
import WishlistButton from "../../components/WishlistButton";

const ResultCategories = () => {
  const { id } = useParams();
  const [busca, setBusca] = useState("");
  const { products } = useContext(ProductContext);
  const [result, setResult] = useState("");
  const [sortby, setSortby] = useState("popularity");
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
  const [itensPorPagina, setItensPorPagina] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [firstItem, setFirstItem] = useState("");
  const [lastItem, setLastItem] = useState("");
  const [totalItem, setTotalItem] = useState("");
  const [layout, setLayout] = useState("grid");
  const [color, setColor] = useState([]);
  const [rating, setRating] = useState([]);
  const [brand, setBrand] = useState([]);
  const [price, setPrice] = useState([]);
  const [discount, setDiscount] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id == "viewall") {
      setBusca("");
    } else {
      setBusca(id);
    }
  }, [id]);

  const translateXValue = (currentPage - 1) * 44.4;

  const isMobile = useMediaQuery({ maxWidth: 820 });
  var lowProducts = [];

  const handleSortBy = (value) => {
    setSortby(value);
  };

  const handleFilter = (value) => {
    setFilter(value);
  };

  function organizarPorMenorPreco(array) {
    const value = array.slice().sort((a, b) => {
      let priceA;
      let priceB;

      if (a.priceWithDiscount) {
        priceA = parseFloat(
          a.priceWithDiscount.replace("$", "").replace(",", "")
        );
      } else {
        priceA = parseFloat(a.price.replace("$", "").replace(".", ""));
      }
      if (b.priceWithDiscount) {
        priceB = parseFloat(
          b.priceWithDiscount.replace("$", "").replace(",", "")
        );
      } else {
        priceB = parseFloat(b.price.replace("$", "").replace(".", ""));
      }

      return priceA - priceB;
    });

    return value;
  }

  function organizarPorMaiorPreco(array) {
    const value = array.slice().sort((a, b) => {
      let priceA;
      let priceB;

      if (a.priceWithDiscount) {
        priceA = parseFloat(
          a.priceWithDiscount.replace("$", "").replace(",", "")
        );
      } else {
        priceA = parseFloat(a.price.replace("$", "").replace(".", ""));
      }
      if (b.priceWithDiscount) {
        priceB = parseFloat(
          b.priceWithDiscount.replace("$", "").replace(",", "")
        );
      } else {
        priceB = parseFloat(b.price.replace("$", "").replace(".", ""));
      }

      return priceB - priceA;
    });

    return value;
  }

  function organizarPorMaiorPopularidade(array) {
    const value = array.slice().sort((a, b) => b.stars - a.stars);

    return value;
  }

  function organizarPorMaiorDesconto(array) {
    const value = array.slice().sort((a, b) => b?.discount - a?.discount);

    return value;
  }

  function organizarPorMaisRecente(array) {
    const value = array.slice().reverse();
    return value;
  }

  const handleColorFilter = (value) => {
    setColor(value);
  };

  const handleRatingFilter = (value) => {
    setRating(value);
  };

  const handleBrandFilter = (value) => {
    setBrand(value);
  };

  const handlePriceFilter = (value) => {
    setPrice(value);
  };

  const handleDiscountFilter = (value) => {
    setDiscount(value);
  };

  useEffect(() => {
    if (!isMobile) {
      let snapfilter = {};
      snapfilter.color = color;
      snapfilter.rating = rating;
      snapfilter.brand = brand;
      snapfilter.price = price;
      snapfilter.discount = discount;
      setFilter(snapfilter);
    }
  }, [color, rating, brand, price, discount]);

  useEffect(() => {
    var filterProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(busca.toLowerCase()) ||
        product.category.includes(busca.toLowerCase()) ||
        product.description.toLowerCase().includes(busca.toLowerCase()) ||
        product.brand.toLowerCase().includes(busca.toLowerCase())
    );
    if (filter.color.length > 0) {
      filterProducts = filterProducts.filter((product) =>
        filter.color.some((color) => product.color.includes(color))
      );
    }

    if (filter.rating.length > 0) {
      filterProducts = filterProducts.filter((product) =>
        filter.rating.some((rating) => product.stars == rating)
      );
    }

    if (filter.brand.length > 0) {
      filterProducts = filterProducts.filter((product) =>
        filter.brand.some((brand) => product.brand == brand)
      );
    }

    if (filter.price.length > 0) {
      filterProducts = filterProducts.filter((product) =>
        filter.price.some((priceRange) => {
          let price;
          if (product.priceWithDiscount) {
            price = parseFloat(
              product.priceWithDiscount.replace("$", "").replace(",", "")
            );
          } else {
            price = parseFloat(product.price.replace("$", "").replace(".", ""));
          }

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

    var sortByProducts = handleSort(filterProducts, sortby);

    const indexOfLastProduct = currentPage * itensPorPagina;
    const indexOfFirstProduct = indexOfLastProduct - itensPorPagina;
    const currentProducts = sortByProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    if (!isMobile) {
      setResult(currentProducts);
    } else {
      setResult(sortByProducts);
    }

    setFirstItem(indexOfFirstProduct + 1);

    const lastPage = Math.min(indexOfLastProduct, filterProducts.length);

    setLastItem(lastPage);

    setTotalItem(filterProducts.length);
  }, [busca, sortby, filter, itensPorPagina, currentPage]);

  const nextPage = () => {
    if (currentPage < Math.ceil(totalItem / itensPorPagina)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pageNumbers = [];

  const totalPages = Math.ceil(totalItem / itensPorPagina);

  // Preenche o array com os números das páginas
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
  };

  const truncateDescription = (description, maxWords) => {
    const words = description.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return description;
  };

  const mudarQuantidadeItens = (event) => {
    if (!isMobile) {
      const quantidade = parseInt(event.target.value);
      setItensPorPagina(quantidade);
      setCurrentPage(1);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

              <h1>{capitalizeFirstLetter(busca)}</h1>
            </header>
            {result.length > 1 && isMobile && (
              <div className="qty-product-result">
                {" "}
                <p>{`${result.length} Products`}</p>
              </div>
            )}
            {result.length == 1 && isMobile && (
              <div className="qty-product-result">
                {" "}
                <p>{`${result.length} Product`}</p>
              </div>
            )}
            {result && (
              <div className="container-products-results">
                {result.map((product) => (
                  <div key={product.id}>
                    <ProductContainer product={product} />
                  </div>
                ))}
                {result.length == 0 && (
                  <>
                    <div className="page-wrapper-no-result">
                      <img src={notSearch} alt="imagem sem resultado" />
                      <div className="title-not-found-result">
                        <h1>Whoops!</h1>
                        <p>
                          We coudn’t find what you’re looking for. Try something
                          else.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
            {result.length == 0 && (
              <Link to="/">
                {" "}
                <div className="container-button-back-home">
                  <button className="button-back-home">Back to Home</button>
                </div>
              </Link>
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
              {busca != "" && <p> {capitalizeFirstLetter(busca)}</p>}
              {busca == "" && <p>View All</p>}
            </div>
            <h1 className="title-result-web">{capitalizeFirstLetter(busca)}</h1>
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
                  <ReviewFilter ratingReturn={handleRatingFilter} />
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
                  <ColorsFilter colorReturn={handleColorFilter} />
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
                  <BrandFilter brandReturn={handleBrandFilter} />
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
                  <PriceRangeFilter priceReturn={handlePriceFilter} />
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
                  <DiscountFilter discountReturn={handleDiscountFilter} />
                </div>
              </div>
            </div>
            <div className="cointainer-products-web">
              {result.length > 0 && (
                <div className="container-bar-sortby">
                  <div className="content-ornganize-product">
                    <div className="select-grid-sort">
                      <img
                        src={grid}
                        style={
                          layout === "grid"
                            ? { backgroundColor: "#1B4B66" }
                            : { backgroundColor: "#777" }
                        }
                        onClick={() => setLayout("grid")}
                        alt="icone de grade"
                      />
                      <img
                        src={gridLine}
                        style={
                          layout === "line"
                            ? { backgroundColor: "#1B4B66" }
                            : { backgroundColor: "" }
                        }
                        onClick={() => setLayout("line")}
                        alt="icone mostrar em linha"
                      />
                    </div>
                    <span>
                      Showing {firstItem} - {lastItem} of {totalItem} items
                    </span>
                  </div>
                  <div>
                    <label htmlFor="itensPorPagina">To Show:</label>
                    <select
                      id="itensPorPagina"
                      value={itensPorPagina}
                      onChange={mudarQuantidadeItens}
                    >
                      <option value="3">3</option>
                      <option value="6">6</option>
                      <option value="9">9</option>
                      <option value="12">12</option>
                      <option value="15">15</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="itensPorPagina">Sort By</label>
                    <select
                      value={sortby}
                      onChange={(e) => setSortby(e.target.value)}
                    >
                      <option value="popularity">Popularity</option>
                      <option value="latest">Latest Products</option>
                      <option value="priceLowToHigh">
                        Price - Low to High
                      </option>
                      <option value="priceHighToLow">
                        Price - High to Low
                      </option>
                      <option value="discount">Discount</option>
                    </select>
                  </div>
                </div>
              )}
              {result && (
                <div
                  className={`${
                    layout === "line"
                      ? "container-products-results-line"
                      : "container-products-results-grid"
                  }`}
                >
                  {result.map((product) => (
                    <div
                      key={product.id}
                      className={`${
                        layout === "line"
                          ? "product-container-result-line"
                          : "product-container-result-grid"
                      }`}
                    >
                      <Link to={`/product/${product.id}`} key={product.id}>
                        <div className="product-image-result">
                          <h5 className="product-Trending">Trending</h5>
                          <img src={product.url} alt="produto" />
                        </div>
                      </Link>
                      <div className="text-product-result-web">
                        <Link to={`/product/${product.id}`} key={product.id}>
                          {layout == "grid" && (
                            <>
                              <span>
                                {truncateDescription(product.name, 2)}
                              </span>
                              <span>
                                {truncateDescription(product.description, 2)}
                              </span>
                            </>
                          )}
                          {layout == "line" && (
                            <>
                              <span>{product.name} </span>
                              <span>{product.description}</span>
                            </>
                          )}
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
                          {product.discount == 0 ? (
                            <div className="box-price">
                              <h3>{product.price}</h3>
                            </div>
                          ) : (
                            <div className="box-price">
                              <h3>{product.priceWithDiscount}</h3>
                              <h4>{product.price}</h4>
                              <h5>{product.discount + "%OFF"}</h5>
                            </div>
                          )}
                        </Link>
                        <div>
                          <WishlistButton
                            product={product}
                            className="button-wishlist"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {result.length > 1 && (
                <div className="nav-pages-results">
                  {currentPage !== 1 && (
                    <button className="buttons-nav" onClick={prevPage}>
                      Prev
                    </button>
                  )}

                  <ul className="pagination-numbers-results">
                    <div
                      className="selected-number-page"
                      style={{ transform: `translateX(${translateXValue}px)` }}
                    ></div>
                    {pageNumbers.map((number) => (
                      <li key={number} className="numbers-nav-results">
                        <button onClick={() => setCurrentPage(number)}>
                          <span
                            style={
                              currentPage === number ? { color: "#FFF" } : {}
                            }
                          >
                            {number}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  {currentPage !== Math.ceil(totalItem / itensPorPagina) && (
                    <button className="buttons-nav" onClick={nextPage}>
                      Next
                    </button>
                  )}
                </div>
              )}
              {result.length == 0 && (
                <>
                  <div className="page-wrapper-no-result">
                    <img src={notSearch} alt="imagem sem resultado" />
                    <div className="title-not-found-result">
                      <h1>Whoops!</h1>
                      <p>
                        We coudn’t find what you’re looking for. Try something
                        else.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div></div>

          <Footer />
        </>
      )}
    </div>
  );
};

export default ResultCategories;
