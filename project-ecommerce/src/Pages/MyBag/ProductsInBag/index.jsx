import React from "react";
import "./BagProduct.css";

import bolsa from "../../../assets/Img/image.jpg";

function ProductBag() {
  return (
    <>
      <div className="box-product">
        <div className="box-aling">
          <img src={bolsa} />
          <div className="info">
            <p>Coach</p>
            <p>Leather Coach Bag</p>
            <select>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
            </select>

            <div className="prices">
              <p className="big-text">$54.69</p>
              <p className="small-text">$69.99</p>
              <p className="red-text">20% OFF</p>
            </div>
          </div>
        </div>
        <hr className="line"/>
        <div className="buttons">
          <button>Move to Wishlist</button>
          <button>Remove</button>
        </div>
      </div>
    </>
  );
}

export default ProductBag;
