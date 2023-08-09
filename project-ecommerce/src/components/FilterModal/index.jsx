import React, { useEffect, useState } from "react";

//Style
import "./filterModal.css";

//Icons
import cross from "../../assets/icons/cross.svg";

//Component
import ColorsFilter from "../Filters/colorsFilter";
import ReviewFilter from "../Filters/ReviewFilter";
import BrandFilter from "../Filters/BrandFilter";
import PriceRangeFilter from "../Filters/PriceRangeFilter";
import DiscountFilter from "../Filters/DiscountFilter";
import { useMediaQuery } from "react-responsive";

const FilterModal = ({ isOpen, onFilterReturn, filterProps }) => {
  const [seletedTab, setSelectedTab] = useState("reviews");
  const [translate, setTranslate] = useState("translateY(0px)");
  const [color, setColor] = useState([]);
  const [rating, setRating] = useState([]);
  const [brand, setBrand] = useState([]);
  const [price, setPrice] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [filter, setFilter] = useState({
    color: [],
    rating: [],
    brand: [],
    price: [],
    discount: [],
  });
  const [clearFilters, setClearFilters] = useState(true);
  const [open, setOpen] = useState(false);
  const [firstTimeFilter, setFirstTimeFilter] = useState(false);
  const [show, setShow] = useState("page-wrapper-filters");
  const [propsFilter, setPropsFilter] = useState(filterProps);
  const isMobile = useMediaQuery({ maxWidth: 820 });

  useEffect(() => {
    setPropsFilter(filterProps);
  }, [filterProps]);

  function handleTabChange(tab) {
    setSelectedTab(tab);

    switch (tab) {
      case "reviews":
        setTranslate("translateY(0px)");
        break;
      case "color":
        setTranslate("translateY(46px)");
        break;
      case "brand":
        setTranslate("translateY(92px)");
        break;
      case "price":
        setTranslate("translateY(138px)");
        break;
      case "discount":
        setTranslate("translateY(184px)");
        break;
      default:
        setTranslate("translateY(0px)");
        break;
    }
  }

  useEffect(() => {
    if (!firstTimeFilter) {
      setFirstTimeFilter(true);
    } else {
      setOpen(true);
    }
  }, [isOpen]);

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

  function handleApplyChanges() {
    let snapfilter = {};
    snapfilter.color = color;
    snapfilter.rating = rating;
    snapfilter.brand = brand;
    snapfilter.price = price;
    snapfilter.discount = discount;
    setFilter(snapfilter);
    console.log(snapfilter);
  }

  const handleClearForm = () => {
    setFilter({ color: [], rating: [], brand: [], price: [], discount: [] });
  };

  useEffect(() => {
    const handleFilterReturn = () => {
      onFilterReturn(filter);
    };
    handleFilterReturn();
  }, [filter]);

  function handleModalState() {
    setShow("page-wrapper-filters animate-modal-info");

    setTimeout(() => {
      setOpen(false);
      setShow("page-wrapper-filters");
    }, 400);
  }

  const handleCloseAndFilter = () => {
    handleApplyChanges();
    handleModalState();
  };

  return (
    <>
      {open && isMobile && (
        <div className={show}>
          <header className="header-filter-modal">
            <h1>Filters</h1>
            <img
              src={cross}
              alt="Icone de fechar"
              onClick={() => handleModalState()}
            />
          </header>
          <main className="container-filters">
            <div className="content-filters-options">
              <div
                className="option-filters"
                onClick={() => handleTabChange("reviews")}
              >
                <span>Reviews</span>
              </div>
              <div
                className="option-filters"
                onClick={() => handleTabChange("color")}
              >
                <span>Color</span>
              </div>
              <div
                className="option-filters"
                onClick={() => handleTabChange("brand")}
              >
                <span>Brand</span>
              </div>
              <div
                className="option-filters"
                onClick={() => handleTabChange("price")}
              >
                <span>Price Range</span>
              </div>
              <div
                className="option-filters"
                onClick={() => handleTabChange("discount")}
              >
                <span>Discount</span>
              </div>
              <div
                className="selected-tab-filters"
                style={{ transform: translate }}
              ></div>
            </div>
            <div className="content-select-filter">
              {seletedTab == "color" && (
                <ColorsFilter
                  colorReturn={handleColorFilter}
                  filterProps={propsFilter}
                />
              )}
              {seletedTab == "reviews" && (
                <ReviewFilter
                  ratingReturn={handleRatingFilter}
                  filterProps={propsFilter}
                />
              )}
              {seletedTab == "brand" && (
                <BrandFilter
                  brandReturn={handleBrandFilter}
                  filterProps={propsFilter}
                />
              )}
              {seletedTab == "price" && (
                <PriceRangeFilter
                  priceReturn={handlePriceFilter}
                  filterProps={propsFilter}
                />
              )}
              {seletedTab == "discount" && (
                <DiscountFilter
                  discountReturn={handleDiscountFilter}
                  filterProps={propsFilter}
                />
              )}
            </div>
          </main>
          <div className="buttons-filters">
            <button type="button" onClick={handleClearForm}>
              Clear All
            </button>
            <button type="button" onClick={() => handleCloseAndFilter()}>
              Apply
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterModal;
