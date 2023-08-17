import React, { useState } from "react";

import bolsa from "../../../assets/Img/bolsa_rosa.jpg";

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

const OrderedDesktop = ({ isOpen }) => {
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
            {bag.map((product) => (
              <div className="content-products-ordered">
                <div>
                  <img src={bolsa} alt="imagem do produto" />
                </div>
                <div className="text-info-ordered">
                  <div>
                    <span>{product.name}</span>
                    <span>{product.descrition}</span>
                  </div>
                  <span>{product.price}</span>
                  <span>Qty- {product.qty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderedDesktop;
