import React, { useState } from "react";
import Wishlist from "../../components/Wishlist";

const MyBag = () => {
	const [isOpen, setIsOpen] = useState(true);
	return (
		<div>
			<Wishlist isOpen={isOpen} setClose={setIsOpen} />
		</div>
	);
};

export default MyBag;
