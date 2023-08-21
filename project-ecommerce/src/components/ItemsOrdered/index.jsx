import React, { useEffect, useState } from "react";

//Icons
import arrowProfile from "../../assets/icons/arrowProfile.svg";

//Style
import "./ItemsOrdered.css";

//Images
import bolsa from "../../assets/Img/bolsa_rosa.jpg";
import BagButton from "../BagButton";

//Component
import ButtonBigMob from "../../components/ButtonBigMobile";
import { useMediaQuery } from "react-responsive";

const ItemsOrdered = ({ isOpen, order, state }) => {
  const [firstTime, setFirstTime] = useState(false);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState("page-wrapper-modal-info");
  const isMobile = useMediaQuery({ maxWidth: 820 });

  useEffect(() => {
    if (!firstTime) {
      setFirstTime(true);
    } else {
      setOpen(true);
    }
  }, [isOpen]);

  function handleModalState() {
    setShow("page-wrapper-modal-info animate-modal-info");

    setTimeout(() => {
      setOpen(false);
      setShow("page-wrapper-modal-info");
    }, 400);
  }

  return (
    <>
      {open && isMobile && (
        <>
          <div className={show}>
            <div className="page-wrapper-ordered">
              <header>
                <div onClick={() => handleModalState()}>
                  <img src={arrowProfile} alt="icone seta" />
                </div>

                <h1>Items Ordered</h1>
              </header>
              <div className="card-items-ordered">
                <div className="cart-text-ordered">
                  <span>{`Order#${order.orderCode}`}</span>
                  <div>
                    <span>Place On</span>
                    <span>{order.date}</span>
                  </div>
                </div>
                <div className="state-container">{state}</div>
              </div>
              <p>{order.bag.length} Product(s)</p>
              <div className="container-products-ordered">
                {order.bag.map((product) => (
                  <div className="content-products-ordered" key={product.id}>
                    <div>
                      <img src={product.url} alt="imagem do produto" />
                    </div>
                    <div className="text-info-ordered">
                      <span>{product.name}</span>
                      <span>{product.description}</span>
                      <span>{product.price}</span>
                      <span>Qty- {product.qtyBag}</span>
                      <BagButton
                        product={product}
                        qty={product.qtyBag}
                        img={false}
                        className="button-ordered"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="separator-ordered"></div>
              <section className="section-order-details">
                <p>Order Details</p>
                <div className="container-order-details">
                  <div className="content-price-ordered">
                    <span>Sub Total</span>
                    <span>
                      ${order.prices.totalPrecoSemDesconto.toFixed(2)}
                    </span>
                  </div>
                  <div className="content-price-ordered">
                    <span>Discount</span>
                    <span>${order.prices.totalDesconto.toFixed(2)}</span>
                  </div>
                  <div className="content-price-ordered">
                    <span>Delivery Free</span>
                    <span>-$0.00</span>
                  </div>
                  <div className="content-price-ordered">
                    <span>Grand Total</span>
                    <span>
                      ${order.prices.totalPrecoComDesconto.toFixed(2)}
                    </span>
                  </div>
                </div>
              </section>
              <div className="separator-ordered"></div>
              <section>
                <p>Address Details</p>
                <div className="container-address-details">
                  <div className="content-details-state">
                    <span>{order.address.name}</span>
                    <div>
                      <span>{order.address.selectedButton}</span>
                    </div>
                  </div>
                  <span>{order.address.street}</span>
                  <span>{order.address.city}</span>
                  <span>{order.address.pinCode}</span>
                </div>
              </section>
              <div className="separator-ordered"></div>
              <section className="payment-details-ordered">
                <p>Payment Details</p>
                <span>{order.typeOfPayment}</span>
              </section>
              <div className="reorder-button">
                <ButtonBigMob>Reorder</ButtonBigMob>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ItemsOrdered;
