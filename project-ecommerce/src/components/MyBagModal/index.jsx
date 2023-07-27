import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

//Images
import bolsa from "../../assets/Img/bolsa_rosa.jpg";

//icons
import arrow from "../../assets/icons/arroBlue.svg";
import cross from "../../assets/icons/cross-small.svg";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/Ai";

const MyBagModal = ({ hover }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [fistTime, setFirstTime] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 820 });

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (fistTime) {
      setFirstTime(false);
    }
    if (!fistTime) {
      setIsHovered(true);
    }
  }, [hover]);

  useEffect(() => {
    setIsHovered(false);
  }, [isMobile]);

  return (
    <div>
      {isHovered && (
        <div onClick={handleMouseLeave} className="modal-brackground"></div>
      )}
      {isHovered && (
        <div className="modal-mybag-header">
          <div className="mybag-btnh2-header">
            <button onClick={handleMouseLeave}>
              <img src={arrow} alt="Back" />
            </button>
            <h2>Back</h2>
          </div>

          <div className="max-product-header">
            <div className="mybag-container-product-header">
              <div className="img-product-mybag-header">
                <img src={bolsa} />
              </div>

              <div className="desc-product-mybag-header">
                <p>Coach</p>
                <p>Leather Coach Bag</p>
                <div className="box-counter-product-header">
                  <button>-</button>
                  <p>1</p>
                  <button>
                    <AiOutlinePlus />
                  </button>
                </div>
              </div>

              <div className="price-product-header">
                <button>
                  <img src={cross} alt="" />
                </button>
                <p>R$54.69</p>
              </div>
            </div>
            <hr className="line-product-header" />

            <div className="mybag-container-product-header">
              <div className="img-product-mybag-header">
                <img src={bolsa} />
              </div>

              <div className="desc-product-mybag-header">
                <p>Coach</p>
                <p>Leather Coach Bag</p>
                <div className="box-counter-product-header">
                  <button>-</button>
                  <p>1</p>
                  <button>+</button>
                </div>
              </div>

              <div className="price-product-header">
                <button>
                  <img src={cross} alt="" />
                </button>
                <p>R$54.69</p>
              </div>
            </div>
            <hr className="line-product-header" />

            <div className="mybag-container-product-header">
              <div className="img-product-mybag-header">
                <img src={bolsa} />
              </div>

              <div className="desc-product-mybag-header">
                <p>Coach</p>
                <p>Leather Coach Bag</p>
                <div className="box-counter-product-header">
                  <button>
                    <AiOutlineMinus />
                  </button>
                  <p>1</p>
                  <button>
                    <AiOutlinePlus />
                  </button>
                </div>
              </div>

              <div className="price-product-header">
                <button>
                  <img src={cross} alt="" />
                </button>
                <p>R$54.69</p>
              </div>
            </div>
            <hr className="line-product-header" />
          </div>

          <div className="total-price-header">
            <div className="txt-price-header">
              <p className="sub-tax-header">Subtotal:</p>
              <p className="sub-tax-header">Tax:</p>
              <p className="final-price-header">Total:</p>
            </div>

            <div className="prices-header">
              <p className="sub-tax-header">$109.38</p>
              <p className="sub-tax-header">$2.00</p>
              <p className="final-price-header">$111.38</p>
            </div>
          </div>

          <div className="container-btns-header">
            <div className="coupon-header">
              <input type="text" placeholder="Apply Coupon Code" />
              <button>CHECK</button>
            </div>

            <button className="order-btn-header">Place Order</button>

            <p>Continue Shopping</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBagModal;
