import { useState } from "react";

import "./myBagMob.css";
import "./myBagWeb.css";

// components
import ButtonBigMob from "../../components/ButtonBigMobile";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// icons e imagens

import arrow from "../../assets/icons/blackArrow.svg";
import empty from "../../assets/Img/emptyBag.png";
import close from "../../assets/icons/cross.svg";
import bolsa from "../../assets/Img/image.jpg";
import ArrowDown from "../../assets/imgFooter/ArrowDown.svg";

import { useMediaQuery } from "react-responsive";

const MyBag = () => {
  const products = true;
  const [open, setOpen] = useState(false);

  const isWeb = useMediaQuery({ minWidth: 820 });

  function handleButtonFooter(e) {
    e.preventDefault();

    setOpen(!open);

    var box = document.getElementById("boxFunction");

    if (open) {
      box.classList.remove("button-active");
    } else {
      box.classList.add("button-active");
    }
  }

  return (
    <>
      {isWeb === true && products === true ? (
        <>
          <Header />
          <div className="windonw-web-mybag">
            <div className="path-to-cart-mybag">
              <p>Home</p>
              <img src={arrow} />
              <p>My Cart</p>
            </div>

            <h1 className="cart-mybag">My Cart</h1>

            <div className="web-container-mybag">
              <div className="products-info-mybag">
                <div className="line-info-mybag">
                  <p className="product-name-mybag">Product Name</p>
                  <p className="price-mybag">Price</p>
                  <p className="qty-mybag">Qty</p>
                  <p>Subtotal</p>
                </div>

                <hr />

                <div className="product-pic-mybag">
                  <img src={bolsa} />
                  <div className="text-mybag">
                    <p>Coach</p>
                    <p>Leather Coach Bag</p>
                    <p>Qty- 1</p>
                  </div>

                  <div className="price-and-buttons-mybag">
                    <div className="price-qty-mybag">
                      <p className="price-mybag">$54.69</p>
                      <p className="qty-mybag">1</p>
                      <p>$54.69</p>
                    </div>
                    <div className="btns-mybag">
                      <button>Move to Wishlist</button>
                      <button>Remove</button>
                    </div>
                  </div>
                </div>

                <div className="product-pic-mybag">
                  <img src={bolsa} />
                  <div className="text-mybag">
                    <p>Coach</p>
                    <p>Leather Coach Bag</p>
                    <p>Qty- 1</p>
                  </div>

                  <div className="price-and-buttons-mybag">
                    <div className="price-qty-mybag">
                      <p className="price-mybag">$54.69</p>
                      <p className="qty-mybag">1</p>
                      <p>$54.69</p>
                    </div>
                    <div className="btns-mybag">
                      <button>Move to Wishlist</button>
                      <button>Remove</button>
                    </div>
                  </div>
                </div>

                <div
                  id="boxFunction"
                  className="box-button-footer"
                  style={
                    open
                      ? { marginBottom: 0 + "px" }
                      : { marginBottom: 0 + "px" }
                  }
                >
                  <h3 className="coral-footer">Apply Coupon Code</h3>
                  <button
                    onClick={handleButtonFooter}
                    className="icon-button-footer"
                  >
                    {" "}
                    <img
                      src={ArrowDown}
                      style={{
                        transform: `rotate(${open ? "180deg" : "0deg"})`,
                      }}
                      alt=""
                    />{" "}
                  </button>
                </div>
                {open === false ? (
                  <>
                    <hr />
                    <div className="coupon-input-mybag">
                      <input type="text" placeholder="Apply Coupon Code" />
                      <button>CHECK</button>
                    </div>
                  </>
                ) : null}
              </div>

              <div className="summary-mybag">
                <h4>Order Summary</h4>
                <hr />
                <div className="space-divs-mybag">
                  <div>
                    <p>Sub Total</p>
                    <p>Discount</p>
                    <p>Delivery Fee</p>
                    <p>Grand Total</p>
                  </div>
                  <div className="space-numbers-mybag">
                    <p>$119.69</p>
                    <p>-$13.40</p>
                    <p>-$0.00</p>
                    <p>$106.29</p>
                  </div>
                </div>
                <div className="summary-btns-mybag">
                  <button>Place Order</button>
                  <button>Continue Shopping</button>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : isWeb === true && products === false ? (
        <>
          <Header />
          <div className="windonw-web-mybag">
            <div className="path-to-cart-mybag">
              <p>Home</p>
              <img src={arrow} />
              <p>My Cart</p>
            </div>

            <h1 className="cart-mybag">My Cart</h1>

            <div className="empty-mybag">
              <img src={empty} />
              <h2>Uh Oh....!</h2>
              <p>
                You haven’t added any any items. Start shopping to make your bag
                bloom
              </p>
            </div>
          </div>
          <Footer />
        </>
      ) : products === false ? (
        <>
          <div className="container-title-mybag">
            <img src={arrow} />
            <h3>My Bag</h3>
          </div>

          <div className="empty-mybag">
            <img src={empty} />
            <h2>Uh Oh....!</h2>
            <p>
              You haven’t added any any items. Start shopping to make your bag
              bloom
            </p>
          </div>

          <div className="button-mybag">
            <ButtonBigMob>Continue Shopping</ButtonBigMob>
          </div>
        </>
      ) : (
        <div className="window-mybag">
          <div className="productIn">
            <div className="container-title-mybag">
              <img src={close} />
              <h3>My Bag</h3>
            </div>

            <div className="showProduct">
              <div>
                <div className="box-product">
                  <div className="box-aling">
                    <img src={bolsa} />
                    <div className="info">
                      <p>Coach</p>
                      <p>Leather Coach Bag</p>
                      <p>01</p>

                      <div className="prices">
                        <p className="big-text">$54.69</p>
                        <p className="small-text">$69.99</p>
                        <p className="red-text">20% OFF</p>
                      </div>
                    </div>
                  </div>
                  <hr className="line" />
                  <div className="buttons">
                    <button>Move to Wishlist</button>
                    <button>Remove</button>
                  </div>
                </div>

                <div className="box-product">
                  <div className="box-aling">
                    <img src={bolsa} />
                    <div className="info">
                      <p>Coach</p>
                      <p>Leather Coach Bag</p>
                      <p>01</p>

                      <div className="prices">
                        <p className="big-text">$54.69</p>
                        <p className="small-text">$69.99</p>
                        <p className="red-text">20% OFF</p>
                      </div>
                    </div>
                  </div>
                  <hr className="line" />
                  <div className="buttons">
                    <button>Move to Wishlist</button>
                    <button>Remove</button>
                  </div>
                </div>
              </div>

              <div className="coupon-input">
                <input type="text" placeholder="Apply Coupon Code" />
                <button>CHECK</button>
              </div>
            </div>

            <div className="space-order">
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
                  <div className="price">
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyBag;
