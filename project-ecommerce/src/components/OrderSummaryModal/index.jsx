import React, { useEffect, useState } from "react";
import OrderSummary from "../OrderSummary";

import "./OrderSummaryModal.css";

//Icons
import arrowProfile from "../../assets/icons/arrowProfile.svg";

const OrderSummaryModal = ({ bag, isOpen }) => {
 
  const [open , setOpen] = useState(false)
  
  
  useEffect(() => {
    setOpen(true)
  },[isOpen]) 
 
  // function handleModalState() {
  //     setShow("page-wrapper-modal-info animate-modal-info");

  //     setTimeout(() => {
  //       setSelectedTab("");
  //       setShow("page-wrapper-modal-info");
  //     }, 400);
  //   }

  return (
    <div className="container-modal-summary">
      <div className="page-wrapper-modal-info">
        <header>
          {/* onClick={() => handleModalState()} */}
          <div>
            <img src={arrowProfile} alt="icone seta" />
          </div>
          <h1>Order Summary</h1>
        </header>
        {/* {bag.map((product) => (
          <img src={product.url} alt="Produto" key={product.url} />
        ))} */}
        <OrderSummary bag={bag} />
      </div>
    </div>
  );
};

export default OrderSummaryModal;
