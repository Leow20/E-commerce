import React from "react";
import Bag from "../../assets/icons/bag-white.svg";

const BagButton = ({ product }) => {
	return (
		<div>
			<button className="add-bag">
				<img src={Bag} alt="Bag" />
				<span>Add to Bag</span>
			</button>
		</div>
	);
};

export default BagButton;
