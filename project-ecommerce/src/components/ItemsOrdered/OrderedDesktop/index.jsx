import React, { useState } from "react";

import bolsa from "../../../assets/Img/bolsa_rosa.jpg";
import { Link } from "react-router-dom";

const OrderedDesktop = ({ isOpen, order, orderKey, state }) => {
  const [selectedTab, setSelectedTab] = useState("Items Ordered");

  return (
    <>
      {isOpen && (
        <div className="page-wrapper-web-ordered">
          <div className="container-tab-state">
            <div
              onClick={() => setSelectedTab("Items Ordered")}
              className="content-tab-state"
              style={
                selectedTab == "Items Ordered"
                  ? { backgroundColor: "#1B4B66" }
                  : { backgroundColor: "#f1f1f1" }
              }
            >
              <span
                style={
                  selectedTab == "Items Ordered"
                    ? { color: "#FFF" }
                    : { color: "#626262" }
                }
              >
                Items Ordered
              </span>
            </div>
            <div
              onClick={() => setSelectedTab("Invoices")}
              className="content-tab-state"
              style={
                selectedTab == "Invoices"
                  ? { backgroundColor: "#1B4B66", color: "#FFF" }
                  : { backgroundColor: "#f1f1f1", color: "#626262" }
              }
            >
              <span
                style={
                  selectedTab == "Invoices"
                    ? { color: "#FFF" }
                    : { color: "#626262" }
                }
              >
                Invoices
              </span>
            </div>
            <div
              onClick={() => setSelectedTab("Order Shipment")}
              className="content-tab-state"
              style={
                selectedTab == "Order Shipment"
                  ? { backgroundColor: "#1B4B66", color: "#FFF" }
                  : { backgroundColor: "#f1f1f1", color: "#626262" }
              }
            >
              <span
                style={
                  selectedTab == "Order Shipment"
                    ? { color: "#FFF" }
                    : { color: "#626262" }
                }
              >
                Order Shipment
              </span>
            </div>
          </div>
          <p>Product Name</p>
          <hr />
          <div className="container-products-ordered">
            {order.bag.map((product) => (
              <div className="content-products-ordered">
                <div>
                  <img src={product.url} alt="imagem do produto" />
                </div>
                <div className="text-info-ordered">
                  <div className="content-info-ordered">
                    <span>{product.name}</span>
                    <span>{product.description}</span>
                  </div>
                  <div className="container-qty-price">
                    <span>{product.price}</span>
                    <span>Qty- {product.qtyBag}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="container-sections-information">
              <h4 className="title-oder-information">Order Information</h4>
              <hr />
              <div className="section-container">
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
                <section className="payment-details-ordered">
                  <p>Payment Details</p>
                  <span>{order.typeOfPayment}</span>
                </section>
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
              </div>
              <div className="buttons-ordered-web">
                <button>Reorder</button>
                <button className="button-ordered">Add Rating</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderedDesktop;
