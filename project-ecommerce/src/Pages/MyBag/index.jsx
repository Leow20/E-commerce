import { useContext, useEffect, useState } from "react";

import "./myBagMob.css";
import "./myBagWeb.css";

// components
import ButtonBigMob from "../../components/ButtonBigMobile";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// icons e imagens

import arrow from "../../assets/icons/blackArrow.svg";
import empty from "../../assets/Img/emptyBag.png";
import close from "../../assets/icons/cross.svg";
import bolsa from "../../assets/Img/image.jpg";
import ArrowDown from "../../assets/imgFooter/ArrowDown.svg";

import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import NavMob from "../../components/NavMob";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConnection";
import { UserContext } from "../../Contexts/user";
import { ProductContext } from "../../Contexts/products";
import OrderSummary from "../../components/OrderSummary";
import OrderSummaryModal from "../../components/OrderSummaryModal";
import Loading from "../../components/Loading";

const MyBag = () => {
	const [open, setOpen] = useState(false);
	const [orderOpen, setOrderOpen] = useState(true);
	const [bag, setBag] = useState([]);
	const { user } = useContext(UserContext);
	const { products } = useContext(ProductContext);
	const isWeb = useMediaQuery({ minWidth: 820 });
	const [wishlist, setWishlist] = useState([]);
	const [loading, setLoading] = useState(true);

	const loadWishlist = async () => {
		const wishlistRef = doc(db, "wishlist", user.uid);
		const wishlistSnapshot = await getDoc(wishlistRef);
		if (user) {
			if (wishlistSnapshot.exists()) {
				setWishlist(wishlistSnapshot.data().data);
			} else {
				setWishlist([]);
				await setDoc(doc(db, "wishlist", user.uid), { data: wishlist });
			}
		}
	};

	const handleWishlist = async (product, index) => {
		if (!user || !product) return;
		const indexF = wishlist.findIndex((item) => item.id === product[0].id);
		const wishlistRef = doc(db, "wishlist", user.uid);
		const wishlistSnapshot = await getDoc(wishlistRef);
		const updatedWishlist = wishlistSnapshot.data().data;
		if (indexF === -1) {
			updatedWishlist.push(product[0]);
			await setDoc(doc(db, "wishlist", user.uid), { data: updatedWishlist });
			removeBag(index);
		} else {
			removeBag(index);
		}

		setWishlist(updatedWishlist);
	};

	function handleButtonFooter(e) {
		e.preventDefault();

		setOpen(!open);

		var box = document.getElementById("boxFunction");

		if (open) {
			box.classList.remove("button-active");
		} else {
			box.classList.add("button-active");
		}
	}
	const loadBag = async () => {
		const bagSnapshot = await getDoc(doc(db, "bag", user.uid));
		if (user) {
			if (bagSnapshot.exists()) {
				setBag(bagSnapshot.data().data);
				setLoading(false);
			} else {
				setBag([]);
				await setDoc(doc(db, "bag", user.uid), { data: bag });
				setLoading(false);
			}
		}
	};
	useEffect(() => {
		loadWishlist();
		loadBag();
	}, [user]);
	const truncateDescription = (description, maxWords) => {
		const words = description.split(" ");
		if (words.length > maxWords) {
			return words.slice(0, maxWords).join(" ") + "...";
		}
		return description;
	};
	function removeDollarAndFormatNumber(dollarValue, qtyBag) {
		const valueWithoutDollar = dollarValue.replace("$", "");

		const formattedNumber = parseFloat(valueWithoutDollar);

		return (formattedNumber * qtyBag).toFixed(2);
	}
	const removeBag = async (index) => {
		const updatedProducts = [...bag];
		updatedProducts.splice(index, 1);
		setBag(updatedProducts);
		if (user) {
			await setDoc(doc(db, "bag", user.uid), { data: updatedProducts });
		}
	};

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

	const [selectedValue, setSelectedValue] = useState("");

	const handleChange = async (e, product, index) => {
		product.qtyBag = e.target.value;
		setSelectedValue(e.target.value);
		const updatedProducts = [...bag];
		updatedProducts.splice(index, product);
		setBag(updatedProducts);
		if (user) {
			await setDoc(doc(db, "bag", user.uid), { data: updatedProducts });
		}
	};
	if (!loading) {
		return (
			<>
				{isWeb === true && bag.length > 0 ? (
					<>
						<Header />
						<div className="windonw-web-mybag">
							<div className="path-to-cart-mybag">
								<p>Home</p>
								<img src={arrow} />
								<p>My Cart</p>
							</div>

							<h1 className="cart-mybag">My Cart</h1>

							<div className="web-container-mybag">
								<div className="products-info-mybag">
									<div className="line-info-mybag">
										<p className="product-name-mybag">Product Name</p>
										<p className="price-mybag">Price</p>
										<p className="qty-mybag">Qty</p>
										<p>Subtotal</p>
									</div>

									<hr />

									{bag.map((product, index) => (
										<div
											className="product-pic-mybag Trending-web"
											key={product.id}
										>
											<img src={product.url} />
											{product.stars >= 4.5 ? (
												<h5 className="Trending-bag-web">Trending</h5>
											) : null}
											<div className="text-mybag">
												<p>{product.name}</p>
												<p>{truncateDescription(product.description, 3)}</p>
												<p>Qty - {product.qtyBag}</p>
											</div>

											<div className="price-and-buttons-mybag">
												<div className="price-qty-mybag">
													<p className="price-mybag">
														{product.discount
															? product.priceWithDiscount
															: product.price}
													</p>
													<p className="qty-mybag">{product.qtyBag}</p>
													<p>
														$
														{product.discount
															? removeDollarAndFormatNumber(
																	product.priceWithDiscount,
																	product.qtyBag
															  )
															: removeDollarAndFormatNumber(
																	product.price,
																	product.qtyBag
															  )}
													</p>
												</div>
												<div className="btns-mybag">
													<button
														onClick={() =>
															handleWishlist(
																products.filter((doc) => doc.id === product.id),
																index
															)
														}
													>
														Move to Wishlist
													</button>
													<button onClick={() => removeBag(`${index}`)}>
														Remove
													</button>
												</div>
											</div>
										</div>
									))}

									<div
										id="boxFunction"
										className="box-button-footer"
										style={
											open
												? { marginBottom: 0 + "px" }
												: { marginBottom: 0 + "px" }
										}
									>
										<h3 className="coral-footer">Apply Coupon Code</h3>
										<button
											onClick={handleButtonFooter}
											className="icon-button-footer"
										>
											{" "}
											<img
												src={ArrowDown}
												style={{
													transform: `rotate(${open ? "180deg" : "0deg"})`,
												}}
												alt=""
											/>{" "}
										</button>
									</div>
									{open === false ? (
										<>
											<hr />
											<div className="coupon-input-mybag">
												<input type="text" placeholder="Apply Coupon Code" />
												<button>CHECK</button>
											</div>
										</>
									) : null}
								</div>
								<OrderSummary bag={bag} />
							</div>
						</div>
						<Footer />
					</>
				) : isWeb === true && bag.length == 0 ? (
					<>
						<Header />
						<div className="windonw-web-mybag">
							<div className="path-to-cart-mybag">
								<p>Home</p>
								<img src={arrow} />
								<p>My Cart</p>
							</div>

							<h1 className="cart-mybag">My Cart</h1>

							<div className="empty-mybag">
								<img src={empty} />
								<h2>Uh Oh....!</h2>
								<p>
									You haven’t added any any items. Start shopping to make your
									bag bloom
								</p>
							</div>
						</div>
						<Footer />
					</>
				) : bag.length == 0 ? (
					<>
						<div className="container-title-mybag">
							<img src={arrow} />
							<h3>My Bag</h3>
						</div>

						<div className="empty-mybag">
							<img src={empty} />
							<h2>Uh Oh....!</h2>
							<p>
								You haven’t added any any items. Start shopping to make your bag
								bloom
							</p>
						</div>

						<div className="button-mybag">
							<Link to="/">
								<ButtonBigMob>Continue Shopping</ButtonBigMob>
							</Link>
						</div>
					</>
				) : (
					<>
						<OrderSummaryModal bag={bag} isOpen={orderOpen} />
						<div className="window-mybag">
							<div className="productIn">
								<div className="container-title-mybag">
									<Link to="/">
										<img src={close} />
									</Link>
									<h3>My Bag</h3>
								</div>

								<div className="showProduct">
									<div>
										{bag.map((product, index) => (
											<div className="box-product" key={product.id}>
												{product.stars >= 4.5 ? (
													<h5 className="mybag-Trending-mob">Trending</h5>
												) : null}
												<div className="box-aling">
													<img src={product.url} />
													<div className="info-mybag">
														<p>{product.name}</p>
														<p>{truncateDescription(product.description, 3)}</p>
														<span>Qty:</span>
														<select
															value={product.qtyBag && product.qtyBag}
															onChange={(e) => {
																handleChange(e, product, index);
															}}
															className="number-select-mybag"
														>
															{Array.from(
																{ length: product.qty },
																(_, index) => index + 1
															).map((number) => (
																<option key={number} value={number}>
																	{number}
																</option>
															))}
														</select>
														{product.discount ? (
															<div className="prices-mybag">
																<p className="big-text">
																	{product.priceWithDiscount}
																</p>
																<p className="small-text">{product.price}</p>
																<p className="red-text">
																	{product.discount}% OFF
																</p>
															</div>
														) : (
															<div className="prices-mybag">
																<p className="big-text">{product.price}</p>
															</div>
														)}
													</div>
												</div>
												<hr className="line-mybag" />
												<div className="buttons-mybag">
													<button
														onClick={() =>
															handleWishlist(
																products.filter((doc) => doc.id === product.id),
																index
															)
														}
													>
														Move to Wishlist
													</button>
													<div className="vertical-line-mybag"></div>
													<button onClick={() => removeBag(index)}>
														Remove
													</button>
												</div>
											</div>
										))}
									</div>

									<div className="coupon-input-mybag-mob">
										<input type="text" placeholder="Apply Coupon Code" />
										<button>CHECK</button>
									</div>
								</div>

								<div className="space-order">
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
													$
													{calculateTotalPrice(
														bag
													).totalPrecoSemDesconto.toFixed(2)}
												</p>
												<p>
													-${calculateTotalPrice(bag).totalDesconto.toFixed(2)}
												</p>
												<p>-$0.00</p>
												<p>
													$
													{calculateTotalPrice(
														bag
													).totalPrecoComDesconto.toFixed(2)}
												</p>
											</div>
										</div>
										<div className="confirm-details">
											<div>
												<p>Total Bag Amount</p>
												<p>
													$
													{calculateTotalPrice(
														bag
													).totalPrecoComDesconto.toFixed(2)}
												</p>
											</div>
											<button onClick={() => setOrderOpen(!orderOpen)}>
												Place Order
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
				<NavMob page="/mybag" />
			</>
		);
	} else {
		<Loading page={"modal"} />;
	}
};

export default MyBag;
