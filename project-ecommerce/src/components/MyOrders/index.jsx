import React, { useState } from "react";

//Style
import "./myOrders.css";

//Icons
import arrowProfile from "../../assets/icons/arrowProfile.svg";
import ItemsOrdered from "../ItemsOrdered";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import OrderedDesktop from "../ItemsOrdered/OrderedDesktop";

const orders = [
  { id: 3123124, date: "11/08/2004", price: "$200" },
  { id: 2324234, date: "13/08/2004", price: "$300" },
  { id: 1112313, date: "15/08/2004", price: "$30" },
];

const MyOrders = () => {
  const isMobile = useMediaQuery({ maxWidth: 820 });
  const [selectedTab, setSelectedTab] = useState("Completed");
  const [isOpen, setIsOpen] = useState(false);
  const [openOrdered, setOpenOrdered] = useState(false);
  const [id, setId] = useState("");
  const [state, setState] = useState("");
  const [date, setDate] = useState("");

  const ordersWithStatus = orders.map((order) => {
    const orderDate = new Date(order.date);
    const threeDaysLater = new Date();
    threeDaysLater.setDate(orderDate.getDate() + 3);

    if (order.status === "Completed" || new Date() > threeDaysLater) {
      return { ...order, tab: "Completed" };
    } else {
      return { ...order, tab: "Processing" };
    }
  });

  const filteredOrders = ordersWithStatus.filter(
    (order) => order.tab === selectedTab
  );

  function handleItemOrdered(id, state, date) {
    if (isMobile) {
      setIsOpen(!isOpen);
      setId(id);
      setState(state);
      setDate(date);
    } else {
      setOpenOrdered(true);
    }
  }

  return (
    <div className="page-wrapper-myorders">
      {!openOrdered && (
        <>
          <div className="container-tab-state">
            <div
              onClick={() => setSelectedTab("Completed")}
              className="content-tab-state"
              style={
                selectedTab == "Completed"
                  ? { backgroundColor: "#1B4B66" }
                  : { backgroundColor: "#f1f1f1" }
              }
            >
              <span
                style={
                  selectedTab == "Completed"
                    ? { color: "#FFF" }
                    : { color: "#626262" }
                }
              >
                Completed
              </span>
            </div>
            <div
              onClick={() => setSelectedTab("Processing")}
              className="content-tab-state"
              style={
                selectedTab == "Processing"
                  ? { backgroundColor: "#1B4B66", color: "#FFF" }
                  : { backgroundColor: "#f1f1f1", color: "#626262" }
              }
            >
              <span
                style={
                  selectedTab == "Processing"
                    ? { color: "#FFF" }
                    : { color: "#626262" }
                }
              >
                Processing
              </span>
            </div>
            <div
              onClick={() => setSelectedTab("cancelled")}
              className="content-tab-state"
              style={
                selectedTab == "cancelled"
                  ? { backgroundColor: "#1B4B66", color: "#FFF" }
                  : { backgroundColor: "#f1f1f1", color: "#626262" }
              }
            >
              <span
                style={
                  selectedTab == "cancelled"
                    ? { color: "#FFF" }
                    : { color: "#626262" }
                }
              >
                Cancelled
              </span>
            </div>
          </div>
          <div className="container-orders">
            {filteredOrders.length > 0 && (
              <p>{filteredOrders.length} Order(s)</p>
            )}
            {filteredOrders.length == 0 && <p>You don't have any orders.</p>}
            <div className="container-cards-order">
              {filteredOrders.map((order) => (
                <div
                  className="card-order"
                  key={order.id}
                  onClick={() =>
                    handleItemOrdered(order.id, order.tab, order.date)
                  }
                >
                  <div className="text-card-order">
                    <span>{order.date}</span>
                    <span>#{order.id}</span>
                    <span>{order.price}</span>
                    {!isMobile && selectedTab == "Completed" && (
                      <span>Paid</span>
                    )}
                    {!isMobile && selectedTab == "Processing" && (
                      <span>Processing</span>
                    )}
                  </div>
                  <img src={arrowProfile} alt="icone seta" />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <ItemsOrdered isOpen={isOpen} id={id} state={state} date={date} />
      <OrderedDesktop isOpen={openOrdered} />
    </div>
  );
};

export default MyOrders;
