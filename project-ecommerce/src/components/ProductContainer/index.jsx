import React from "react";

//Styles
import "./productContainer.css";

//Router dom
import { Link } from "react-router-dom";

//Components
import WishlistButton from "../WishlistButton";

const ProductContainer = ({ product, page }) => {
	//  const [loading, setLoading] = useState(true);
	const truncateDescription = (description, maxWords) => {
		const words = description.split(" ");
		if (words.length > maxWords) {
			return words.slice(0, maxWords).join(" ") + "...";
		}
		return description;
	};
	return (
		<div key={product.id} className="img-product-home">
			<Link to={`/product/${product.id}`} key={product.id}>
				<img src={product.url} alt="Imagem Produto" />
			</Link>
			<div
				className="arrival-content-home"
				style={{ position: "relative", width: "100%" }}
			>
				<Link to={`/product/${product.id}`} key={product.id}>
					<div className="text-product-home" style={{ width: "100%" }}>
						<span style={{ width: "100%" }}>
							{truncateDescription(product.name, 2)}
						</span>
						<span style={{ width: "100%" }}>
							{truncateDescription(product.description, 2)}
						</span>
						{product.discount == 0 ? (
							<div className="box-price">
								<h3>{product.price}</h3>
							</div>
						) : (
							<div className="box-price">
								<h3>{product.priceWithDiscount}</h3>
								<h4>{product.price}</h4>
								<h5>{product.discount + "%OFF"}</h5>
							</div>
						)}
					</div>
				</Link>
				<WishlistButton product={product} className="button-wishlist" />
			</div>
		</div>
	);
};

export default ProductContainer;
