import React from "react";

//Style
import "./wishlist.css";

//Images
import Hearth from "../../assets/Hearth.png";
import bag from "../../assets/Img/image.jpg";

//Icons
import Arrow from "../../assets/imgFooter/ArrowDown.svg";
import heart from "../../assets/icons/Vector.svg";
import BagIcon from "../../assets/imgHeader/bag.svg";

import { Navigate } from "react-router-dom";

const Wishlist = ({ isOpen, setClose }) => {
	const products = true;
	if (isOpen) {
		if (!products) {
			return (
				<div className="wishlist">
					<div className="wishlist-head">
						<button onClick={() => setClose(false)}>
							<img src={Arrow} alt="Arrow" />
						</button>
						<h1>My Wishlist</h1>
					</div>
					<div className="wishlist-container">
						<img src={Hearth} alt="Hearth" id="hearthId" />
						<div className="wishlist-content">
							<h2>Well...</h2>
							<p>It seems you have not added any products to for wishlist.</p>
						</div>
					</div>
					<div className="wishlist-btn-empty-products">
						<button onClick={() => <Navigate to="/" />}>Start Shopping</button>
					</div>
				</div>
			);
		} else {
			return (
				<div className="wishlist">
					<div className="wishlist-head">
						<button onClick={() => setClose(false)}>
							<img src={Arrow} alt="Arrow" />
						</button>
						<h1>My Wishlist</h1>
					</div>
					<div className="wishlist-container-products">
						<div className="card-wishlist">
							<img src={bag} alt="bolsa" width={150} height={157} />
							<div className="arrival-content-wishlist">
								<div className="text-product-wishlist">
									<span>Grande</span>
									<span>Blossom Pouch</span>
									<span>$39.49</span>
								</div>
								<img src={heart} alt="icone coração" width={16} height={16} />
							</div>
							<button>
								<img src={BagIcon} alt="Icone de sacola" /> Add to bag
							</button>
						</div>
						<div className="card-wishlist">
							<img src={bag} alt="bolsa" width={150} height={157} />
							<div className="arrival-content-wishlist">
								<div className="text-product-wishlist">
									<span>Grande</span>
									<span>Blossom Pouch</span>
									<span>$39.49</span>
								</div>
								<img src={heart} alt="icone coração" width={16} height={16} />
							</div>
							<button>
								<img src={BagIcon} alt="Icone de sacola" /> Add to bag
							</button>
						</div>
						<div className="card-wishlist">
							<img src={bag} alt="bolsa" width={150} height={157} />
							<div className="arrival-content-wishlist">
								<div className="text-product-wishlist">
									<span>Grande</span>
									<span>Blossom Pouch</span>
									<span>$39.49</span>
								</div>
								<img src={heart} alt="icone coração" width={16} height={16} />
							</div>
							<button>
								<img src={BagIcon} alt="Icone de sacola" /> Add to bag
							</button>
						</div>
					</div>
				</div>
			);
		}
	}
};

export default Wishlist;
