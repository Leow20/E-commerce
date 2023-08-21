import React, { useEffect, useState } from "react";
import OrderSummary from "../OrderSummary";

import "./OrderSummaryModal.css";

//Icons
import arrowProfile from "../../assets/icons/arrowProfile.svg";
import edit from "../../assets/icons/edit.svg";
import { Link } from "react-router-dom";
import SlideUpModal from "../SlideUpModal";

const OrderSummaryModal = ({ bag, isOpen }) => {
	const [open, setOpen] = useState(false);
	const [firstTime, setFirstTime] = useState(false);
	const [show, setShow] = useState("page-wrapper-modal-info");
	const [slideOpen, setSlideOpen] = useState(false);

	useEffect(() => {
		if (!firstTime) {
			setFirstTime(true);
		} else {
			setOpen(true);
		}
	}, [isOpen]);

	function handleModalState() {
		setShow("page-wrapper-modal-info animate-modal-info");

		setTimeout(() => {
			setOpen(false);
			setShow("page-wrapper-modal-info");
		}, 400);
	}

	const truncateDescription = (description, maxWords) => {
		const words = description.split(" ");
		if (words.length > maxWords) {
			return words.slice(0, maxWords).join(" ") + "...";
		}
		return description;
	};

	return (
		<>
			{open && (
				<div className="container-modal-summary">
					<div className={show}>
						<header>
							<div onClick={() => handleModalState()}>
								<img src={arrowProfile} alt="icone seta" />
							</div>
							<h1>Order Summary</h1>
						</header>

						<div className="container-select-deliver">
							<p>Deliver To</p>
							<div className="content-select-deliver">
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

						<div className="container-img-summary-modal">
							<span>Exepected Delivery</span>
							<div className="content-img-summary">
								{bag.map((product) => (
									<div className="content-product-summary" key={product.id}>
										<img src={product.url} alt="Produto" key={product.url} />
										<div>
											<span>{product.name}</span>
											<span>{truncateDescription(product.description, 3)}</span>
										</div>
									</div>
								))}
							</div>
						</div>
						<OrderSummary bag={bag} button={false} />
						<Link to="/checkout">
							<button className="button-proceed">Proceed to Payments</button>
						</Link>
					</div>
					<SlideUpModal page="result" isOpen={slideOpen} />
				</div>
			)}
		</>
	);
};

export default OrderSummaryModal;
