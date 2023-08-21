import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

//icons
import arrow from "../../assets/icons/arroBlue.svg";
import cross from "../../assets/icons/cross-small.svg";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

//Context
import { UserContext } from "../../Contexts/user";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConnection";
import CounterMyBag from "../CounterMyBag";

const MyBagModal = ({ hover }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [fistTime, setFirstTime] = useState(true);
	const isMobile = useMediaQuery({ maxWidth: 820 });
	const [bag, setBag] = useState([]);
	const { user } = useContext(UserContext);

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	useEffect(() => {
		if (fistTime) {
			setFirstTime(false);
		}
		if (!fistTime) {
			setIsHovered(true);
		}
	}, [hover]);

	useEffect(() => {
		setIsHovered(false);
	}, [isMobile]);

	const [quantity, setQuantity] = useState(0);

	const loadBag = async () => {
		const bagSnapshot = await getDoc(doc(db, "bag", user.uid));
		if (user) {
			if (bagSnapshot.exists()) {
				setBag(bagSnapshot.data().data);
			} else {
				setBag([]);
				await setDoc(doc(db, "bag", user.uid), { data: bag });
			}
		}
	};
	useEffect(() => {
		loadBag();
	}, [user]);
	const truncateDescription = (description, maxWords) => {
		const words = description.split(" ");
		if (words.length > maxWords) {
			return words.slice(0, maxWords).join(" ") + "...";
		}
		return description;
	};
	const removeBag = async (index) => {
		const updatedProducts = [...bag];
		updatedProducts.splice(index, 1);
		console.log(updatedProducts);
		setBag(updatedProducts);
		if (user) {
			await setDoc(doc(db, "bag", user.uid), { data: updatedProducts });
		}
	};
	const calculateTotalPrice = (produtos) => {
		let totalDesconto = 0;
		let totalPrecoSemDesconto = 0;
		let totalPrecoComDesconto = 0;

		produtos.forEach((product) => {
			const preco = parseFloat(product.price.replace("$", ""));
			const desconto = parseFloat(product.discount);
			const precoSemDesconto = preco * parseFloat(product.qtyBag);
			const valorDesconto =
				((preco * desconto) / 100) * parseFloat(product.qtyBag);
			const precoComDesconto = precoSemDesconto - valorDesconto;

			totalDesconto += valorDesconto;
			totalPrecoSemDesconto += precoSemDesconto;
			totalPrecoComDesconto += precoComDesconto;
		});

		return {
			totalDesconto,
			totalPrecoSemDesconto,
			totalPrecoComDesconto,
		};
	};
	const handleUpload = async (product, index) => {
		const updatedProducts = [...bag];
		updatedProducts.splice(index, product);
		setBag(updatedProducts);
		if (user) {
			await setDoc(doc(db, "bag", user.uid), { data: updatedProducts });
		}
	};

	return (
		<div>
			{isHovered && (
				<div onClick={handleMouseLeave} className="modal-brackground"></div>
			)}
			{isHovered && (
				<div className="modal-mybag-header">
					<div className="mybag-btnh2-header">
						<button onClick={handleMouseLeave}>
							<img src={arrow} alt="Back" />
						</button>
						<h2>Back</h2>
					</div>

					<div className="max-product-header">
						{bag.map((product, index) => (
							<div key={product.id}>
								<div className="mybag-container-product-header">
									<div className="img-product-mybag-header">
										{product.stars >= 4.5 ? (
											<h5 className="Trending-modal-bag">Trending</h5>
										) : null}
										<img src={product.url} />
									</div>

									<div className="desc-product-mybag-header">
										<p>{product.name}</p>
										<p>{truncateDescription(product.description, 3)}</p>
										<CounterMyBag
											product={product}
											key={product.id}
											index={index}
											handleUpload={handleUpload}
										/>
									</div>

									<div className="price-product-header">
										<button onClick={() => removeBag(index)}>
											<img src={cross} alt="" />
										</button>
										<p>
											{product.discount
												? product.priceWithDiscount
												: product.price}
										</p>
									</div>
								</div>
								<hr className="line-product-header" />
							</div>
						))}
					</div>

					<div className="total-price-header">
						<div className="txt-price-header">
							<p className="sub-tax-header">Subtotal:</p>
							<p className="sub-tax-header">Discount:</p>
							<p className="final-price-header">Total:</p>
						</div>

						<div className="prices-header">
							<p className="sub-tax-header">
								${calculateTotalPrice(bag).totalPrecoSemDesconto.toFixed(2)}
							</p>
							<p className="sub-tax-header">
								-${calculateTotalPrice(bag).totalDesconto.toFixed(2)}
							</p>
							<p className="final-price-header">
								${calculateTotalPrice(bag).totalPrecoComDesconto.toFixed(2)}
							</p>
						</div>
					</div>

					<div className="container-btns-header">
						<div className="coupon-header">
							<input type="text" placeholder="Apply Coupon Code" />
							<button>CHECK</button>
						</div>

						<button className="order-btn-header">Place Order</button>

						<p onClick={handleMouseLeave}>Continue Shopping</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default MyBagModal;
