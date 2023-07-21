import React from "react";
import "./style.css";

import close from "../../../assets/icons/cross.svg";

function ContainerWP() {
  return (
    <>
      <div className="productIn">
        <div className="container-title-mybag">
          <img src={close} />
          <h3>My Bag</h3>
        </div>

        <div className="showProduct">
          <h1>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam
            ipsam vitae fuga atque veniam, exercitationem accusantium! quos
          </h1>

          <div className="coupon-input">
            <input type="text" placeholder="Apply Coupon Code" />
            <button>CHECK</button>
          </div>
        </div>
      </div>
      <div className="img-circles"></div>

      <div className="order-details">
        <h3>Order Details</h3>
        <div className="price-details">
          <div>
            <p>Sub Total</p>
            <p>Discount</p>
            <p>Delivery Fee</p>
            <p>Grand Total</p>
          </div>
          <div>
            <p>$119.69</p>
            <p>-$13.40</p>
            <p>-$0.00</p>
            <p>$106.29</p>
          </div>
        </div>
        <div className="confirm-details">
          <div>
            <p>Total Bag Amount</p>
            <p>$106.29</p>
          </div>
          <button>Place Order</button>
        </div>
      </div>
    </>
  );
}

export default ContainerWP;
