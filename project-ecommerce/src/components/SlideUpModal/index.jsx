import React, { useEffect, useState } from "react";

//Style
import "./slideUpModal.css";

import { Link } from "react-router-dom";
import ProductContainer from "../ProductContainer";
import StarFill from "../../assets/icons/star-fill.svg";
import Star from "../../assets/icons/star.svg";
import PlaceHolder from "../../assets/icons/placeholder.svg";
import Bag from "../../assets/icons/bag-white.svg";
import arrow from "../../assets/HeaderModal/arrow-right-gray.svg";
import { useMediaQuery } from "react-responsive";
import Location from "../../assets/icons/location.svg";
import Plus from "../../assets/icons/Plus.svg";
import BagButton from "../BagButton";

const SlideUpModal = ({
	page,
	isOpen,
	onValueReturn = false,
	filteredProducts,
	product,
	address,
	selectAddress,
	setSelectAddress,
}) => {
	const [open, setOpen] = useState(isOpen);
	const [sortby, setSortby] = useState("popularity");
	const [firstTimeSort, setFirstTimeSort] = useState(false);
	const [animateModal, setAnimateModal] = useState("container-slide-up");
	const [size, setSize] = useState("8");
	const isMobile = useMediaQuery({ maxWidth: 820 });

	useEffect(() => {
		if (!firstTimeSort) {
			setFirstTimeSort(true);
		} else {
			setOpen(true);
		}
		console.log(selectAddress);
		console.log(address);
	}, [isOpen]);

	useEffect(() => {
		if (onValueReturn) {
			const handleReturnValue = () => {
				onValueReturn(sortby);
			};
			handleReturnValue();
		}
	}, [sortby]);

	function handleModalState() {
		setAnimateModal("container-slide-up animate-modal-close");

		setTimeout(() => {
			setOpen(false);
			setAnimateModal("container-slide-up");
		}, 250);
	}

	const sortOptions = [
		{ value: "popularity", label: "Popularity" },
		{ value: "latest", label: "Latest Products" },
		{ value: "priceLowToHigh", label: "Price - Low to High" },
		{ value: "priceHighToLow", label: "Price - High to Low" },
		{ value: "discount", label: "Discount" },
	];

	const handleRadioChange = (event) => {
		setSortby(event.target.value);
	};

	return (
		<div className="page-wrapper-slide-modal">
			{open && (
				<div
					onClick={() => handleModalState()}
					className="modal-brackground"
				></div>
			)}
			{open && (
				<div className={animateModal}>
					{page == "result" && (
						<div className="container-sortby-modal">
							<p>Sort By</p>
							<hr />
							<form className="form-sortby">
								{sortOptions.map((option) => (
									<label key={option.value}>
										<input
											type="radio"
											name="sortOption"
											value={option.value}
											checked={sortby === option.value}
											onChange={handleRadioChange}
										/>
										<div className="input-radio">
											<span></span>
										</div>
										{option.label}
									</label>
								))}
							</form>
						</div>
					)}
					{page == "Also Like" && (
						<div className="container-also-like-data-modal">
							<h1>You may also like</h1>
							<hr />
							<div className="box-products-data">
								{filteredProducts.map((product) => (
									<Link to={`/product/${product.id}`} key={product.id}>
										<ProductContainer product={product} />
									</Link>
								))}
							</div>
						</div>
					)}
					{page == "Product Details" && product && isMobile && (
						<div className="container-product-details-modal">
							<div className="box-product-details">
								<img src={product.url} alt={product.name} />
								<div className="box-text-products-details">
									<h1>{product.name}</h1>
									<h2>{product.description}</h2>

									{product.priceWithDiscount ? (
										<div className="box-price">
											<h3>{product.priceWithDiscount}</h3>
											<h4>{product.price}</h4>
											<h5>{product.discount + "%OFF"}</h5>
										</div>
									) : (
										<div className="box-price">
											<h3>{product.price}</h3>
										</div>
									)}
								</div>
							</div>
							<div className="box-stars-details">
								<div className="box-stars-data">
									<div className="content-stars-data">
										<span className="span-stars-data">{product.stars}</span>
										<img
											src={product.stars == 0 ? Star : StarFill}
											alt="Stars"
										/>
									</div>

									<div className="content-text-stars-data">
										<h2>Average Rating</h2>
										<p>{product.totalRating} Rating</p>
									</div>
								</div>
								<button>
									<img src={arrow} alt="" />
								</button>
							</div>

							<div className="box-select-size">
								<div className="box-select-size-text">
									<h1>Select Size</h1>
									<h2>(UK Size)</h2>
								</div>
								<div className="box-btns-select-size">
									<button
										className={size === "8" ? "btn-active-size" : ""}
										onClick={() => setSize("8")}
									>
										8
									</button>
									<button
										className={size === "9" ? "btn-active-size" : ""}
										onClick={() => setSize("9")}
									>
										9
									</button>
									<button
										className={size === "10" ? "btn-active-size" : ""}
										onClick={() => setSize("10")}
									>
										10
									</button>
									<button
										className={size === "11" ? "btn-active-size" : ""}
										onClick={() => setSize("11")}
									>
										11
									</button>
								</div>
							</div>

							<div className="box-btn-product-details">
								<Link to={`/product/${product.id}`}>
									<img src={PlaceHolder} alt="" />
								</Link>
								<BagButton product={product} />
							</div>
						</div>
					)}
					{page == "location" && (
						<div className="container-location-modal">
							<div className="header-location-modal">
								<h1>Select Delivery Address</h1>
								<button>
									<img src={Plus} alt="Plus" /> <span>Add Address</span>
								</button>
								<hr />
							</div>
							{address &&
								address.map((location) => (
									<div
										className="card-location-modal"
										key={location.pinCode}
										onClick={() => setSelectAddress(location)}
									>
										<div className="container-content-card-modal">
											<div
												className="box-content-ball"
												onClick={() => setSelectAddress(location)}
											>
												<div
													className={
														location.street === selectAddress.street &&
														location.city === selectAddress.city &&
														location.state === selectAddress.state
															? "active"
															: ""
													}
												></div>
											</div>
											<div className="content-location-modal">
												<div className="title-location-modal">
													<h2>{location.name}</h2>
													<span>
														{location.selectedButton !== "Other"
															? location.selectedButton
															: null}
													</span>
												</div>
												<span>{location.street}</span>
												<span>{location.city}</span>
												<span>{location.fullnumber}</span>
											</div>
										</div>
										<button>Edit</button>
									</div>
								))}
							<div className="btn-location-modal">
								<button onClick={() => handleModalState()}>
									<img src={Location} alt="Location" />
									<span>Deliver Here</span>{" "}
								</button>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default SlideUpModal;
