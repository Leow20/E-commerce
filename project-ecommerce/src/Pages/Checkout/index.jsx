import React, { useContext, useEffect, useState } from "react";

//Style
import "./checkout.css";

//Icons
import Arrow from "../../assets/icons/arrowProfile.svg";
import edit from "../../assets/icons/edit.svg";
import ArrowDown from "../../assets/imgFooter/ArrowDown.svg";

//Router-dom
import { Link } from "react-router-dom";

//Components
import SlideUpModal from "../../components/SlideUpModal";
import Payments from "../../components/Payments";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import OrderSummary from "../../components/OrderSummary";

//React-Responsive
import { useMediaQuery } from "react-responsive";

//Firebase
import { db } from "../../../firebaseConnection";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

//Context
import { UserContext } from "../../Contexts/user";

//Toastify
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
	const [selectAddress, setSelectAddress] = useState({});
	const [content, setContent] = useState("");
	const [payment, setPayment] = useState("");
	const [codePayment, setCodePayment] = useState("");
	const [save, setSave] = useState(false);
	const [order, setOrder] = useState("");
	const [arrOrder, setArrOrder] = useState([]);
	const [loading, setLoading] = useState(true);

	function handleButtonSelect(buttonName) {
		setSelectedButton(buttonName);
	}
	async function loadLocationUser() {
		const locationSnapshot = await getDoc(doc(db, "locationUser", user.uid));
		if (user) {
			if (locationSnapshot.exists()) {
				setAddress(locationSnapshot.data().data);
				setSelectAddress(locationSnapshot.data().data[0]);
				setLoading(false);
			}
		}
	}

	function VerifyAddressAndPayment() {
		if (
			pre === "" ||
			phone === "" ||
			addressData.city === "" ||
			addressData.street === "" ||
			addressData.state === "" ||
			pincode === "" ||
			apiError ||
			name === ""
		) {
			toast.warn("Fill in all address fields");
			return false;
		} else if (content === "") {
			toast.warn("Select payment type");
			return false;
		} else if (payment === "") {
			toast.warn("Select a payment method");
			return false;
		} else if (bag.length === 0) {
			toast.warn("You have no products in the bag");
		} else if (content === "UPI" && codePayment === "") {
			toast.warn(`Fill in the field "Enter your UPI Id"`);
			return false;
		} else if (
			(content === "Amazon Pay" &&
				payment === "Amazon Gift Card" &&
				codePayment === "") ||
			(content === "Apple Pay" &&
				payment === "Apple Gift Card" &&
				codePayment === "")
		) {
			toast.warn(`Fill in the field "Enter your Gift Crad code"`);
			return false;
		} else {
			if (
				(content !== "UPI" && codePayment !== "") ||
				(payment !== "Amazon Gift Card" && codePayment !== "") ||
				(payment !== "Apple Gift Card" && codePayment !== "")
			) {
				setCodePayment("");
			}
			return true;
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
				setApiError(null);
			})
			.catch((error) => {
				setApiError("Invalid CEP or failed to fetch data");
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
	async function loadOrders() {
		const orders = await getDoc(doc(db, "payments", user.uid));
		if (user) {
			if (orders.exists()) {
				if (orders.data().data) {
					setArrOrder(orders.data().data);
					console.log(orders.data().data);
				}
			}
		}
	}

	const handlePayment = async () => {
		if (!isMobile && user) {
			if (VerifyAddressAndPayment() === true) {
				const object = {
					order: {
						orderCode: order,
						date: getCurrentFormattedDate(),
						paymentMethod: content,
						typeOfPayment: payment,
						codePayment: codePayment,
						savePayment: save,
						bag: bag,
						prices: {
							totalDesconto: calculateTotalPrice(bag).totalDesconto,
							totalPrecoComDesconto:
								calculateTotalPrice(bag).totalPrecoComDesconto,
							totalPrecoSemDesconto:
								calculateTotalPrice(bag).totalPrecoSemDesconto,
						},
						address: {
							name: name,
							fullNumber: pre + "-" + phone,
							pinCode: pincode,
							street: addressData.street,
							city: addressData.city,
							state: addressData.state,
							selectedButton: selectedButton,
						},
					},
				};
				arrOrder.push(object);
				await setDoc(doc(db, "payments", user.uid), { data: arrOrder }).then(
					async () => {
						await setDoc(doc(db, "bag", user.uid), { data: [] }).then(() => {
							toast.success("Payment successful!");
							loadBag();
						});
						loadOrders();
					}
				);
			}
		} else {
			if (
				(content !== "" &&
					payment !== "" &&
					selectAddress &&
					content === "UPI" &&
					codePayment !== "") ||
				(payment === "Amazon Gift Card" && codePayment !== "") ||
				(payment === "Apple Gift Card" && codePayment !== "")
			) {
				const object = {
					order: {
						orderCode: order,
						date: getCurrentFormattedDate(),
						paymentMethod: content,
						typeOfPayment: payment,
						codePayment: codePayment,
						savePayment: save,
						bag: bag,
						prices: {
							totalDesconto: calculateTotalPrice(bag).totalDesconto,
							totalPrecoComDesconto:
								calculateTotalPrice(bag).totalPrecoComDesconto,
							totalPrecoSemDesconto:
								calculateTotalPrice(bag).totalPrecoSemDesconto,
						},
						address: selectAddress,
					},
				};
				arrOrder.push(object);
				await setDoc(doc(db, "payments", user.uid), { data: arrOrder }).then(
					async () => {
						await setDoc(doc(db, "bag", user.uid), { data: [] }).then(() => {
							toast.success("Payment successful!");
							loadBag();
						});
						loadOrders();
					}
				);
			} else {
				if (!selectAddress) {
					return toast.warn("Select an address");
				}
				if (content === "") {
					return toast.warn("Select payment type");
				}
				if (payment === "") {
					return toast.warn("Select a payment method");
				}
				if (content === "UPI" && codePayment === "") {
					return toast.warn(`Fill in the field "Enter your UPI Id"`);
				}
				if (
					(payment === "Amazon Gift Card" && codePayment === "") ||
					(payment === "Apple Gift Card" && codePayment === "")
				) {
					return toast.warn(`Fill in the field "Enter your Gift Crad code"`);
				}
			}
		}
	};

	function generateRandom6DigitNumber() {
		const min = 10000;
		const max = 99999;
		setOrder(Math.floor(Math.random() * (max - min + 1)) + min);
	}
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
	function getCurrentFormattedDate() {
		const currentDate = new Date();
		const day = String(currentDate.getDate()).padStart(2, "0");
		const month = String(currentDate.getMonth() + 1).padStart(2, "0");
		const year = currentDate.getFullYear();
		return `${day}/${month}/${year}`;
	}

	useEffect(() => {
		loadOrders();
		loadBag();
		loadLocationUser();
		generateRandom6DigitNumber();
		console.log(arrOrder);
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
								<span>{loading || selectAddress.name}</span>
								<span>
									{loading || selectAddress.street + ", " + selectAddress.city}
								</span>
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
						<Payments
							content={content}
							setContent={setContent}
							payment={payment}
							setPayment={setPayment}
							save={save}
							setSave={setSave}
							codePayment={codePayment}
							setCodePayment={setCodePayment}
						/>
					)}
					<OrderSummary button={false} display={"none"} bag={bag} />
					<div className="btn-pay-now">
						<button onClick={handlePayment}>Pay Now</button>
					</div>
				</section>
				<SlideUpModal
					page="location"
					isOpen={slideOpen}
					address={address}
					selectAddress={selectAddress}
					setSelectAddress={setSelectAddress}
				/>
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
								<Payments
									content={content}
									setContent={setContent}
									payment={payment}
									setPayment={setPayment}
									save={save}
									setSave={setSave}
									codePayment={codePayment}
									setCodePayment={setCodePayment}
								/>
							)}
							<div className="btns-checkout">
								<Link to="/mybag">Back to Cart</Link>
								<button onClick={handlePayment}>Pay Now</button>
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
