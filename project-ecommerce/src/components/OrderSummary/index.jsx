import React from "react";
import { useMediaQuery } from "react-responsive";

const OrderSummary = ({ bag }) => {
  const isWeb = useMediaQuery({ minWidth: 820 });
  const calculateTotalPrice = (produtos) => {
    let totalDesconto = 0;
    let totalPrecoSemDesconto = 0;
    let totalPrecoComDesconto = 0;

    produtos.forEach((product) => {
      const preco = parseFloat(product.price.replace("$", ""));
      const desconto = parseFloat(product.discount);
      const precoSemDesconto = preco * parseFloat(product.qtyBag);
      const valorDesconto =
        ((preco * desconto) / 100) * parseFloat(product.qtyBag);
      const precoComDesconto = precoSemDesconto - valorDesconto;

      totalDesconto += valorDesconto;
      totalPrecoSemDesconto += precoSemDesconto;
      totalPrecoComDesconto += precoComDesconto;
    });

    return {
      totalDesconto,
      totalPrecoSemDesconto,
      totalPrecoComDesconto,
    };
  };

  return (
    <>
      {isWeb ? (
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
              <p>
                -$
                {calculateTotalPrice(bag).totalPrecoSemDesconto.toFixed(2)}
              </p>
              <p>-${calculateTotalPrice(bag).totalDesconto.toFixed(2)}</p>
              <p>-$0.00</p>
              <p>
                ${calculateTotalPrice(bag).totalPrecoComDesconto.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="summary-btns-mybag">
            <button>Place Order</button>
            <button>Continue Shopping</button>
          </div>
        </div>
      ) : (
        <>
          <div className="space-order">
            <div className="img-circles"></div>
            <div className="order-details">
              <h3>Order Details</h3>
              <div className="space-divs-mybag">
                <div>
                  <p>Sub Total</p>
                  <p>Discount</p>
                  <p>Delivery Fee</p>
                  <p>Grand Total</p>
                </div>
                <div className="space-numbers-mybag">
                  <p>
                    ${calculateTotalPrice(bag).totalPrecoSemDesconto.toFixed(2)}
                  </p>
                  <p>-${calculateTotalPrice(bag).totalDesconto.toFixed(2)}</p>
                  <p>-$0.00</p>
                  <p>
                    ${calculateTotalPrice(bag).totalPrecoComDesconto.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="confirm-details">
                <div>
                  <p>Total Bag Amount</p>
                  <p>
                    ${calculateTotalPrice(bag).totalPrecoComDesconto.toFixed(2)}
                  </p>
                </div>
                <button>Place Order</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderSummary;
