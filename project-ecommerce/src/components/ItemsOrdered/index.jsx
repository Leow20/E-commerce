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

const bag = [
  {
    id: 1,
    name: "coach",
    descrition: "bolsa daora",
    price: "$54.99",
    qty: 1,
  },
  {
    id: 2,
    name: "handbag",
    descrition: "bolsa daora",
    price: "$154.99",
    qty: 2,
  },
  {
    id: 3,
    name: "coach",
    descrition: "bolsa daora",
    price: "$54.99",
    qty: 1,
  },
];

const ItemsOrdered = ({ isOpen, id, state, date }) => {
  const [firstTime, setFirstTime] = useState(false);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState("page-wrapper-modal-info");

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
      {open && (
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
                  <span>{`Order #${id}`}</span>
                  <div>
                    <span>Place On</span>
                    <span>{date}</span>
                  </div>
                </div>
                <div className="state-container">{state}</div>
              </div>
              <p>{bag.length} Product(s)</p>
              <div className="container-products-ordered">
                {bag.map((product) => (
                  <div className="content-products-ordered">
                    <div>
                      <img src={bolsa} alt="imagem do produto" />
                    </div>
                    <div className="text-info-ordered">
                      <span>{product.name}</span>
                      <span>{product.descrition}</span>
                      <span>{product.price}</span>
                      <span>Qty- {product.qty}</span>
                      <BagButton
                        product={product}
                        qty={product.qty}
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
                  <div>
                    <span>Sub Total</span>
                    <span>$000.00</span>
                  </div>
                  <div>
                    <span>Discount</span>
                    <span>$000.00</span>
                  </div>
                  <div>
                    <span>Delivery Free</span>
                    <span>$000.00</span>
                  </div>
                  <div>
                    <span>Grand Total</span>
                    <span>$000.00</span>
                  </div>
                </div>
              </section>
              <div className="separator-ordered"></div>
              <section>
                <p>Address Details</p>
                <div className="container-address-details">
                  <div className="content-details-state">
                    <span>Vicent Lobo</span>
                    <div>
                      <span>Home</span>
                    </div>
                  </div>
                  <span>3068 Woodlawn Drive</span>
                  <span>Milwaukee</span>
                  <span>414-672-5388</span>
                </div>
              </section>
              <div className="separator-ordered"></div>
              <section className="payment-details-ordered">
                <p>Payment Details</p>
                <span>Cash on Delivery</span>
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
