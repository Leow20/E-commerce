import "./myBag.css";

import ButtonBigMob from "../../components/ButtonBigMobile";
import arrow from "../../assets/icons/arrowProfile.svg";
import empty from "../../assets/Img/emptyBag.png";
import close from "../../assets/icons/cross.svg";
import bolsa from "../../assets/Img/image.jpg";

import { useMediaQuery } from "react-responsive";

const MyBag = () => {
  const products = true;

  const isMobile = useMediaQuery({ minWidth: 820 });

  return (
    <>
      {isMobile === true && products === true ? (
        <div>
          <h1>olá</h1>
          <h2>Com produto</h2>
        </div>
      ) : isMobile === true && products === false ? (
        <div>
          <h1>olá</h1>
          <h2>Sem produto</h2>
        </div>
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
