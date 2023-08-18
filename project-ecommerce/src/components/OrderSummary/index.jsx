import React from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const OrderSummary = ({
	bag,
	button,
	display = "flex",
	title = "Order Summary",
	hrClass = "",
	paddR = "0",
	margL = "5%",
}) => {
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
				<div className="summary-mybag" style={{ marginLeft: margL }}>
					<h4>{title}</h4>
					<hr className={hrClass} />
					<div className="space-divs-mybag" style={{ paddingRight: paddR }}>
						<div>
							<p>Sub Total</p>
							<p>Discount</p>
							<p>Delivery Free</p>
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
					<div className="summary-btns-mybag" style={{ display: display }}>
						<Link to="/checkout">Place Order</Link>
						<button>Continue Shopping</button>
					</div>
				</div>
			) : (
				<>
					<div className="space-order">
						<div className="order-details">
							<h3>Order Details</h3>
							<div className="space-divs-mybag">
								<div>
									<p>Sub Total</p>
									<p>Discount</p>
									<p>Delivery Free</p>
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
							{button !== false && (
								<div className="confirm-details">
									<div>
										<p>Total Bag Amount</p>
										<p>
											$
											{calculateTotalPrice(bag).totalPrecoComDesconto.toFixed(
												2
											)}
										</p>
									</div>
									<Link to="/checkout">Place Order</Link>
								</div>
							)}
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default OrderSummary;
