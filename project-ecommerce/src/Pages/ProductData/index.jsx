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
import Similar from "../../assets/icons/view-smilar.svg";

const ProductData = () => {
	const isMobile = useMediaQuery({ maxWidth: 640 });
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

	if (isMobile && product) {
		return (
			<>
				<header className="product-data-header">
					<Link>
						<img
							src={Arrow}
							alt="Arrow-Back"
							style={{ transform: "rotate(180deg)" }}
						/>
					</Link>
				</header>
				<section className="product-data-section">
					<div className="container-product-data">
						<div className="box-img-data">
							<div className="img-data">
								<img src={image} alt="Product Image" id="productImageID" />
								<button>
									<img src={Similar} alt="View Similar" />
								</button>
							</div>
							<div className="img-data">
								<img src={image} alt="Product Image" id="productImageID" />
								<button>
									<img src={Similar} alt="View Similar" />
								</button>
							</div>
							<div className="img-data">
								<img src={image} alt="Product Image" id="productImageID" />
								<button>
									<img src={Similar} alt="View Similar" />
								</button>
							</div>
							<div className="img-data">
								<img src={image} alt="Product Image" id="productImageID" />
								<button>
									<img src={Similar} alt="View Similar" />
								</button>
							</div>
						</div>

						<div className="box-text-data">
							<h1>{product.name}</h1>
							<p>{product.description}</p>
							<div>
								<h3>{product.price}</h3>
								<h4>{product.price}</h4>

								{product.discount != 0 && <h5>{product.discount + "%OFF"}</h5>}
							</div>
						</div>

						<div className="box-stars-data">
							<div className="content-stars-data">
								<span className="span-stars-data">{product.stars}</span>
								<img src={product.stars == 0 ? Star : StarFill} alt="Stars" />
							</div>

							<div className="content-text-stars-data">
								<h2>Average Rating</h2>
								<p>43 Ratings & 23 Reviews</p>
							</div>
						</div>

						<div className="box-cards-data">
							<div className="card-data">
								<div className="text-card-data">
									<span>Get upto 30% Off on order value above $100</span>
									<Link>Terms & Conditions</Link>
								</div>
								<div className="coupon-card-data">
									<span>Use Code</span>
									<span>ORDER100</span>
								</div>
							</div>

							<div className="card-data">
								<div className="text-card-data">
									<span>Get upto 30% Off on order value above $100</span>
									<Link>Terms & Conditions</Link>
								</div>
								<div className="coupon-card-data">
									<span>Use Code</span>
									<span>ORDER100</span>
								</div>
							</div>
						</div>

						<div className="delivery-details-data">
							<span>Delivery Details</span>
							<span>Check estimated delivery date/pickup option.</span>
						</div>

						<div className="box-btns-data">
							<button className="add-fav">
								<img src={Hearth} alt="" />
							</button>
							<button className="add-bag">
								<img src={Bag} alt="Bag" />
								<span>Add to Bag</span>
							</button>
						</div>
					</div>
				</section>
			</>
		);
	} else if (!isMobile && product) {
		return (
			<>
				<Header />
				<section></section>
				<Footer />
			</>
		);
	}
};

export default ProductData;
