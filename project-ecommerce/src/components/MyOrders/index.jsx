import React, { useContext, useEffect, useMemo, useState } from "react";

//Style
import "./myOrders.css";

//Icons
import arrowProfile from "../../assets/icons/arrowProfile.svg";
import ItemsOrdered from "../ItemsOrdered";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import OrderedDesktop from "../ItemsOrdered/OrderedDesktop";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebaseConnection";

const MyOrders = ({ user }) => {
  const isMobile = useMediaQuery({ maxWidth: 820 });
  const [selectedTab, setSelectedTab] = useState("Completed");
  const [isOpen, setIsOpen] = useState(false);
  const [openOrdered, setOpenOrdered] = useState(false);
  const [id, setId] = useState("");
  const [state, setState] = useState("");
  const [order, setOrder] = useState("");
  const [orders, setOrders] = useState("");
  const [filteredOrder, setFilteredOrder] = useState("");

  const q = query(collection(db, "payments"));

  useEffect(() => {
    async function getOrders() {
      try {
        const querySnapshot = await getDocs(q);

        querySnapshot.docs.forEach((doc) => {
          console.log(user.uid);
          console.log(doc.id);
          if (doc.id == "udFgAEvijnTh0KRq2Q32xemn0Dg2") {
            //  PRECISA SUBSTITUIR ESTE ID

            let dadosPedidos = {
              id: doc.id,
              ...doc.data(),
            };
            setOrders(dadosPedidos);
            console.log(dadosPedidos);
            console.log(dadosPedidos.data);
          }
        });
      } catch (erro) {
        console.error("Erro ao buscar pedidos:", erro);
      }
    }
    getOrders();
  }, []);

  useEffect(() => {
    if (orders) {
      const ordersWithStatus = orders.data.map((order) => {
        const orderDate = new Date(order.date);
        const threeDaysLater = new Date();
        threeDaysLater.setDate(orderDate.getDate() + 3);

        if (order.status === "Completed" || new Date() > threeDaysLater) {
          return { ...order, tab: "Completed" };
        } else {
          return { ...order, tab: "Processing" };
        }
      });

      console.log(ordersWithStatus);
      console.log(selectedTab);

      const filteredOrders = ordersWithStatus.filter(
        (order) => order.tab === selectedTab
      );
      console.log(filteredOrders.length);
      setFilteredOrder(filteredOrders);
    }
  }, [orders, selectedTab]);

  console.log(orders);

  function handleItemOrdered(orderKey, order, state) {
    if (isMobile) {
      setIsOpen(!isOpen);
      setOrder(order);
      setId(orderKey);
      setState(state);
    } else {
      setOpenOrdered(true);
      setIsOpen(!isOpen);
      setOrder(order);
      setId(orderKey);
      setState(state);
    }
  }

  return (
    <div className="page-wrapper-myorders">
      {!openOrdered && orders && (
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
            {filteredOrder.length > 0 && <p>{filteredOrder.length} Order(s)</p>}
            {filteredOrder.length == 0 && <p>You don't have any orders.</p>}
            {console.log(filteredOrder)}
            {filteredOrder && (
              <div className="container-cards-order">
                {filteredOrder.map((order, index) => {
                  const orderKey = Object.keys(order)[0];
                  const orderData = order[orderKey];
                  const tab = order.tab;
                  return (
                    <div key={index}>
                      <div
                        className="card-order"
                        onClick={() =>
                          handleItemOrdered(orderKey, orderData, tab)
                        }
                      >
                        <div className="text-card-order">
                          <span>{orderData.date}</span>
                          <span>#{orderKey}</span>
                          <span>${orderData.prices.totalPrecoSemDesconto}</span>
                          {!isMobile && selectedTab == "Completed" && (
                            <span>Paid</span>
                          )}
                          {!isMobile && selectedTab == "Processing" && (
                            <span>Processing</span>
                          )}
                        </div>
                        <img src={arrowProfile} alt="icone seta" />
                      </div>

                      {console.log(orderData)}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
      <ItemsOrdered isOpen={isOpen} order={order} orderKey={id} state={state} />
      <OrderedDesktop
        isOpen={openOrdered}
        order={order}
        orderKey={id}
        state={state}
      />
    </div>
  );
};

export default MyOrders;
