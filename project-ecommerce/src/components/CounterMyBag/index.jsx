import React, { useEffect, useState } from "react";

const CounterMyBag = ({ product, key, index, handleUpload }) => {
	const [quantity, setQuantity] = useState(0);

	useEffect(() => {
		if (product.qtyBag) {
			setQuantity(parseInt(product?.qtyBag));
		}
	}, []);
	function handleChange(qtd) {
		product.qtyBag = qtd;
		handleUpload(product, index);
	}
	return (
		<div className="box-counter-product-header" key={key}>
			<button
				onClick={() => {
					if (
						(quantity < product.qty && quantity > 1) ||
						quantity == product.qty
					) {
						setQuantity(quantity - 1);
						handleChange(quantity - 1);
					}
				}}
			>
				-
			</button>
			<input
				type="number"
				name="number"
				id="numberID"
				value={quantity}
				disabled
			/>

			<button
				onClick={() => {
					if (quantity < product.qty) {
						setQuantity(quantity + 1);
						handleChange(quantity + 1);
					}
				}}
			>
				+
			</button>
		</div>
	);
};

export default CounterMyBag;
