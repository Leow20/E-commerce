//React
import React, { useState } from "react";

//Router Dom
import { Link } from "react-router-dom";

//Style
import "./productData.css";

//Firebase
import { db, storage } from "../../../firebaseConnection";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useMediaQuery } from "react-responsive";
import { getDownloadURL, ref } from "firebase/storage";

//Components
import Header from "../../components/Header";
import Footer from "../../components/Footer";

//Icon
import Arrow from "../../assets/HeaderModal/arrow-right-black.svg";
import StarFill from "../../assets/icons/star-fill.svg";
import Star from "../../assets/icons/star.svg";
import Bag from "../../assets/icons/bag.svg";
import Hearth from "../../assets/icons/icon-wishlist.svg";

const ProductData = () => {
	const isMobile = useMediaQuery({ maxWidth: 820 });
	const productId = "dHNcftyqtcPFuSKXMVDEVe4gmNe7NaEa";
	const q = query(collection(db, "products"), where("id", "==", productId));
	const [product, setProduct] = useState([]);
	const [image, setImage] = useState("");

	if (!product || !image) {
		getDocs(q).then((value) => {
			value.forEach((doc) => {
				const data = doc.data();
				setProduct(data);
			});
		});
		const storageRef = storage;
		const imagemRef = ref(storageRef, `images/products/${productId}`);

		getDownloadURL(imagemRef)
			.then((url) => {
				setImage(url);
			})
			.catch((error) => {
				//if (error.code === "storage/object-not-found")
			});
	}
	console.log(product);
	console.log(image);

	return <div>ProductData</div>;
};

export default ProductData;
