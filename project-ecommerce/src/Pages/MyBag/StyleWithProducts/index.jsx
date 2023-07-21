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
    </>
  );
}

export default ContainerWP;
