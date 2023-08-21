import React, { useState, useEffect, useContext } from "react";

//React icons
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

//Firebase
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConnection";

//Context
import { UserContext } from "../../Contexts/user";

function WishlistButton({
	product,
	button = true,
	className = "img-product-home-button",
	text = "",
	onLoad,
}) {
	const { user } = useContext(UserContext);
	const [wishlist, setWishlist] = useState([]);

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

	const handleWishlist = async () => {
		if (!user || !product) return;

		//loadWishlist();

		const index = wishlist.findIndex((item) => item.id === product.id);
		const wishlistRef = doc(db, "wishlist", user.uid);
		const wishlistSnapshot = await getDoc(wishlistRef);
		const updatedWishlist = wishlistSnapshot.data().data;
		if (index === -1) {
			updatedWishlist.push(product);
		} else {
			updatedWishlist.splice(index, 1);
		}

		setWishlist(updatedWishlist);

		await setDoc(doc(db, "wishlist", user.uid), { data: updatedWishlist });
		onLoad();
	};

	useEffect(() => {
		loadWishlist();
	}, [user]);

	const isProductInWishlist = wishlist.some((item) => item.id === product.id);
	const HeartIcon = isProductInWishlist ? AiFillHeart : AiOutlineHeart;

	if (button) {
		return (
			<div>
				<button onClick={handleWishlist} className={className}>
					<HeartIcon id="imgHeartID" fill="#1b4b66" />
					{text ? <span>{text}</span> : null}
				</button>
			</div>
		);
	}
}

export default WishlistButton;
