import React, { useEffect, useState } from "react";

//Style
import "./slideUpModal.css";

const SlideUpModal = ({ page, isOpen, onValueReturn }) => {
  const [open, setOpen] = useState(isOpen);
  const [sortby, setSortby] = useState("popularity");
  const [firstTimeSort, setFirstTimeSort] = useState(false);
  const [animateModal, setAnimateModal] = useState("container-slide-up");

  useEffect(() => {
    if (!firstTimeSort) {
      setFirstTimeSort(true);
    } else {
      setOpen(true);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleReturnValue = () => {
      onValueReturn(sortby);
    };
    handleReturnValue();
  }, [sortby]);

  function handleModalState() {
    setAnimateModal("container-slide-up animate-modal-close");

    setTimeout(() => {
      setOpen(false);
      setAnimateModal("container-slide-up");
    }, 250);
  }

  const sortOptions = [
    { value: "popularity", label: "Popularity" },
    { value: "latest", label: "Latest Products" },
    { value: "priceLowToHigh", label: "Price - Low to High" },
    { value: "priceHighToLow", label: "Price - High to Low" },
    { value: "discount", label: "Discount" },
  ];

  const handleRadioChange = (event) => {
    setSortby(event.target.value);
  };

  return (
    <div className="page-wrapper-slide-modal">
      {open && (
        <div
          onClick={() => handleModalState()}
          className="modal-brackground"
        ></div>
      )}
      {open && (
        <div className={animateModal}>
          {page == "result" && (
            <div className="container-sortby-modal">
              <p>Sort By</p>
              <hr />
              <form className="form-sortby">
                {sortOptions.map((option) => (
                  <label key={option.value}>
                    <input
                      type="radio"
                      name="sortOption"
                      value={option.value}
                      checked={sortby === option.value}
                      onChange={handleRadioChange}
                    />
                    <div className="input-radio">
                      <span></span>
                    </div>
                    {option.label}
                  </label>
                ))}
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SlideUpModal;