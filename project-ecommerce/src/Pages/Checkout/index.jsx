import React, { useContext, useEffect, useState } from "react";
import "./checkout.css";

import Arrow from "../../assets/icons/arrowProfile.svg";
import { Link } from "react-router-dom";
import edit from "../../assets/icons/edit.svg";
import SlideUpModal from "../../components/SlideUpModal";
import { useMediaQuery } from "react-responsive";
import { db } from "../../../firebaseConnection";
import { doc, getDoc } from "firebase/firestore";
import { UserContext } from "../../Contexts/user";
import ArrowDown from "../../assets/imgFooter/ArrowDown.svg";
import OrderSummary from "../../components/OrderSummary";

const Checkout = () => {
	const [slideOpen, setSlideOpen] = useState(false);
	const [contentProduct, setContentProduct] = useState("");
	const [contentPayment, setContentPayment] = useState("");

	const isMobile = useMediaQuery({ maxWidth: 820 });
	const [bag, setBag] = useState([]);
	const { user } = useContext(UserContext);

	const loadBag = async () => {
		const bagSnapshot = await getDoc(doc(db, "bag", user.uid));
		if (user) {
			if (bagSnapshot.exists()) {
				setBag(bagSnapshot.data().data);
			}
		}
	};
	useEffect(() => {
		loadBag();
	}, [user]);
	const truncateDescription = (description, maxWords) => {
		const words = description.split(" ");
		if (words.length > maxWords) {
			return words.slice(0, maxWords).join(" ") + "...";
		}
		return description;
	};
	if (isMobile)
		return (
			<>
				<header className="header-checkout-mob">
					<Link to="/mybag">
						<img src={Arrow} alt="" style={{ transform: "rotate(180deg)" }} />
					</Link>
					<h1>Payments</h1>
				</header>
				<section className="section-checkout">
					<div style={{ marginTop: "16px", padding: "0 0 0 16px" }}>
						<p>Deliver To</p>
						<div
							className="content-select-deliver"
							style={{ maxWidth: "none" }}
						>
							<div className="address-select-deliver">
								<span>Nome do Endereço</span>
								<span>1460 Jenric Lane, Ashmor Drive</span>
							</div>
							<div
								className="edit-current-address"
								onClick={() => setSlideOpen(!slideOpen)}
							>
								<img src={edit} alt="icone de edição" />
							</div>
						</div>
					</div>
					<hr />
					<div className="box-product-checkout">
						<h1>Product Details</h1>
						<button
							onClick={() =>
								contentProduct === "Product Details"
									? setContentProduct("")
									: setContentProduct("Product Details")
							}
						>
							<img
								src={ArrowDown}
								alt="Arrow Down"
								style={{
									transform: `rotate(${
										contentProduct === "Product Details" ? "180deg" : "0deg"
									})`,
								}}
							/>
						</button>
					</div>
					{contentProduct === "Product Details" &&
						bag.map((product) => (
							<div className="content-product-summary" key={product.id}>
								<img src={product.url} alt="Produto" key={product.url} />
								<div>
									<span>{product.name}</span>
									<span>{truncateDescription(product.description, 3)}</span>
									<span>Qtd: {product.qtyBag}</span>
								</div>
							</div>
						))}
					<hr />
					<div className="box-payment-checkout">
						<h1>Select Payment Method</h1>
						<button
							onClick={() =>
								contentPayment === "Payment Method"
									? setContentPayment("")
									: setContentPayment("Payment Method")
							}
						>
							<img
								src={ArrowDown}
								alt="Arrow Down"
								style={{
									transform: `rotate(${
										contentPayment === "Payment Method" ? "180deg" : "0deg"
									})`,
								}}
							/>
						</button>
					</div>
					{contentPayment === "Payment Method" && (
						<div>COMPONENTE PAGAMENTOS</div>
					)}
					<OrderSummary button={false} display={"none"} bag={bag} />
					<div className="btn-pay-now">
						<button>Pay Now</button>
					</div>
				</section>
				<SlideUpModal page="result" isOpen={slideOpen} />
			</>
		);
	else return <div>1</div>;
};

export default Checkout;
