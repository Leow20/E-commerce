import React, { useContext } from "react";
import { ProductContext } from "../../Contexts/products";
import ProductContainer from "../ProductContainer";
import { Link } from "react-router-dom";
import "./relatedProducts.css";

const RelatedProducts = ({ func, productsFiltered }) => {
	if (func == "container") {
		return (
			<div className="container-also-like-data">
				<h1>You may also like</h1>
				<div className="box-products-data">
					{productsFiltered.map((product) => (
						<Link to={`/product/${product.id}`} key={product.id}>
							<ProductContainer product={product} />
						</Link>
					))}
				</div>
			</div>
		);
	}
};

export default RelatedProducts;
