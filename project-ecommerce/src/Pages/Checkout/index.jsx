import React, { useContext, useEffect, useState } from "react";
import "./checkout.css";

import Arrow from "../../assets/icons/arrowProfile.svg";
import { Link } from "react-router-dom";
import edit from "../../assets/icons/edit.svg";
import SlideUpModal from "../../components/SlideUpModal";
import { useMediaQuery } from "react-responsive";
import { db } from "../../../firebaseConnection";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserContext } from "../../Contexts/user";
import ArrowDown from "../../assets/imgFooter/ArrowDown.svg";
import OrderSummary from "../../components/OrderSummary";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";

const Checkout = () => {
	const [slideOpen, setSlideOpen] = useState(false);
	const [contentCheckout, setContentCheckout] = useState("");
	const [contentPayment, setContentPayment] = useState("");

	const isMobile = useMediaQuery({ maxWidth: 820 });
	const [bag, setBag] = useState([]);
	const { user } = useContext(UserContext);
	const [selectedButton, setSelectedButton] = useState("Home");
	const [apiError, setApiError] = useState(null);
	const [pre, setPre] = useState("");
	const [phone, setPhone] = useState("");
	const [name, setName] = useState("");
	const [pincode, setPincode] = useState("");
	const [addressData, setAddressData] = useState({
		street: "",
		city: "",
		state: "",
		selectedButton: selectedButton,
	});
	const [address, setAddress] = useState([]);

	function handleButtonSelect(buttonName) {
		setSelectedButton(buttonName);
	}
	async function loadLocationUser() {
		const locationSnapshot = await getDoc(doc(db, "locationUser", user.uid));
		if (user) {
			if (locationSnapshot.exists()) {
				setAddress(locationSnapshot.data().data);
			}
		}
	}

	const fullnumber = `${pre}-${phone}`;

	async function handleSubmitAddress() {
		if (
			pre === "" ||
			phone === "" ||
			addressData.city === "" ||
			addressData.street === "" ||
			addressData.state === "" ||
			pincode === "" ||
			apiError ||
			addressData.city === "" ||
			addressData.street === "" ||
			addressData.state === ""
		) {
			toast.warn("Fill all the fields and ensure address data is valid");
			return;
		} else {
			console.log(name);
			console.log(fullnumber);

			const pinCode = pincode.replace(/\D/g, "");
			console.log(pinCode);
			console.log(addressData.street);
			console.log(addressData.city);
			console.log(addressData.state);
			console.log(selectedButton);
			loadLocationUser();

			address.push({
				name,
				fullnumber,
				pinCode,
				street: addressData.street,
				city: addressData.city,
				state: addressData.state,
				selectedButton,
			});

			const location = await setDoc(doc(db, "locationUser", user?.uid), {
				data: address,
			}).then(() => {
				toast.success("Address successfully registered");
				setPincode("");
				setAddressData({
					street: "",
					city: "",
					state: "",
				});
			});

			console.log(location);
		}
	}

	const checkCEP = (e) => {
		const cep = e.target.value.replace(/\D/g, "");
		fetch(`https://viacep.com.br/ws/${cep}/json/`)
			.then((res) => {
				if (!res.ok) {
					throw new Error("Failed to fetch address information");
				}
				return res.json();
			})
			.then((data) => {
				setAddressData({
					street: data.logradouro || address.street,
					city: data.localidade || "",
					state: data.uf || "",
				});
				setApiError(null); // Limpar erro se a requisição for bem-sucedida
			})
			.catch((error) => {
				setApiError("Invalid CEP or failed to fetch data"); // Configurar erro de requisição
				toast.error("An error occurred while fetching address data");
			});
	};

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
					<div className="box-checkout">
						<h1>Product Details</h1>
						<button
							onClick={() =>
								contentCheckout === "Product Details"
									? setContentCheckout("")
									: setContentCheckout("Product Details")
							}
						>
							<img
								src={ArrowDown}
								alt="Arrow Down"
								style={{
									transform: `rotate(${
										contentCheckout === "Product Details" ? "180deg" : "0deg"
									})`,
								}}
							/>
						</button>
					</div>
					{contentCheckout === "Product Details" &&
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
					<div className="box-checkout">
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
	else
		return (
			<>
				<Header />
				<section className="section-checkout">
					<div className="route-checkout">
						<Link to="/">Home</Link>
						<img src={Arrow} alt="Arrow Right" />
						<span>Checkout</span>
					</div>
					<h1 className="h1-title-checkout">Checkout</h1>

					<div className="container-content-checkout">
						<div className="box-first-checkout">
							<div className="box-checkout">
								<h1>Add New Address</h1>

								<button
									onClick={() =>
										contentCheckout === "New Address"
											? setContentCheckout("")
											: setContentCheckout("New Address")
									}
								>
									<img
										src={ArrowDown}
										alt="Arrow Down"
										style={{
											transform: `rotate(${
												contentCheckout === "New Address" ? "180deg" : "0deg"
											})`,
										}}
									/>
								</button>
								<hr />
							</div>

							{contentCheckout === "New Address" && (
								<div className="box-address-checkout">
									<div className="box-address-first">
										<div className="input-checkout">
											<span>Full Name</span>
											<input
												type="text"
												placeholder="Enter Name"
												onChange={(e) => {
													setName(e.target.value);
												}}
											/>
										</div>
										<div className="input-checkout">
											<span>CEP</span>
											<input
												type="text"
												placeholder="CEP"
												onBlur={checkCEP}
												value={pincode}
												onChange={(e) => {
													setPincode(e.target.value);
												}}
											/>
										</div>
										<div className="input-checkout">
											<span>City</span>
											<input
												type="text"
												placeholder="City"
												value={addressData.city}
												onChange={(e) =>
													setAddressData({
														...addressData,
														city: e.target.value,
													})
												}
												disabled
											/>
										</div>
										<div className="div-buttons-add-address">
											<button
												className={`${
													selectedButton === "Home" ? "selected-button" : ""
												} button-style-add-address`}
												onClick={() => handleButtonSelect("Home")}
											>
												Home
											</button>
											<button
												className={`${
													selectedButton === "Office" ? "selected-button" : ""
												} button-style-add-address`}
												onClick={() => handleButtonSelect("Office")}
											>
												Office
											</button>
											<button
												className={`${
													selectedButton === "Other" ? "selected-button" : ""
												} button-style-add-address`}
												onClick={() => handleButtonSelect("Other")}
											>
												Other
											</button>
										</div>
									</div>
									<div className="box-address-second">
										<div className="input-checkout">
											<span>Mobile Number</span>
											<div>
												<input
													type="number"
													placeholder="+11"
													onChange={(e) => {
														setPre(e.target.value);
													}}
												/>
												<input
													type="number"
													placeholder="Enter Number"
													onChange={(e) => {
														setPhone(e.target.value);
													}}
												/>
											</div>
										</div>

										<div className="input-checkout">
											<span>Street Address</span>
											<input
												type="text"
												placeholder="Enter Address"
												value={addressData.street}
												onChange={(e) =>
													setAddressData({
														...addressData,
														street: e.target.value,
													})
												}
											/>
										</div>

										<div className="input-checkout">
											<span>State</span>
											<input
												type="text"
												placeholder="State: SP"
												value={addressData.state}
												onChange={(e) =>
													setAddressData({
														...addressData,
														state: e.target.value,
													})
												}
												disabled
											/>
										</div>
									</div>
								</div>
							)}
							<div className="box-checkout">
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
								<hr />
							</div>

							{contentPayment === "Payment Method" && (
								<div>COMPONENTE PAGAMENTOS</div>
							)}
							<div className="btns-checkout">
								<Link to="/mybag">Back to Cart</Link>
								<button>Pay Now</button>
							</div>
						</div>

						<div className="box-second-checkout">
							<div className="box-title-checkout">
								<h1>Order Summary</h1>
								<hr className="hr-checkout" />
							</div>
							<div className="box-product-details-check">
								{bag.map((product) => (
									<div className="content-product-summary" key={product.id}>
										<img src={product.url} alt="Produto" key={product.url} />
										<div>
											<span>{product.name}</span>
											<span>{truncateDescription(product.description, 3)}</span>
											<span>Qtd: {product.qtyBag}</span>
										</div>
									</div>
								))}
							</div>
							<OrderSummary
								bag={bag}
								button={false}
								display="none"
								title="Order Details"
								hrClass="hr-checkout"
								paddR="12px"
								margL="0"
							/>
						</div>
					</div>
				</section>
				<Footer />
			</>
		);
};

export default Checkout;
