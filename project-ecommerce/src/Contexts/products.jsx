import { collection, getDocs, query } from "@firebase/firestore";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { db, storage } from "../../firebaseConnection";
import { getDownloadURL, ref, listAll } from "@firebase/storage";
import Loading from "../components/Loading";

const refReview = query(collection(db, "reviews"));

export const ProductContext = createContext({});

var productsArray = [];
var userArray = [];

function ProductProvider({ children }) {
	const [products, setProducts] = useState("");
	const [review, setReview] = useState("");
	const [reviewImg, setReviewImg] = useState("");
	const [user, setUser] = useState("");
	const [loading, setLoading] = useState(true);
	var arr = [];
	const refUser = query(collection(db, "users"));

	const handleProducts = useMemo(async () => {
		const q = query(collection(db, "products"));

		try {
			const querySnapshot = await getDocs(q);
			const snapshot = await getDocs(refReview);
			const snapUser = await getDocs(refUser);

			snapUser.forEach((user) => {
				let currentUser = {
					firstName: user.data().firstName,
					lastName: user.data().lastName,
					uid: user.data().uid,
				};
				userArray.push(currentUser);
				setUser(userArray);
			});

			querySnapshot.forEach((doc) => {
				let product = {
					name: doc.data().name,
					description: doc.data().description,
					price: doc.data().price,
					qty: doc.data().qty,
					discount: doc.data().discount,
					id: doc.data().id,
					category: doc.data().category,
					color: doc.data().color,
					brand: doc.data().brand,
				};
				handleReview(doc.data().id, snapshot).then((value) => {
					product.stars = value.averageRating;
					product.totalRating = value.totalRatings;
				});
				productsArray.push(product);
				handleUsers(product.id, snapUser);
			});

			await Promise.all(
				productsArray.map(async (doc) => {
					const storageRef = storage;
					const imageRef = ref(storageRef, `images/products/${doc.id}`);
					try {
						const downloadURL = await getDownloadURL(imageRef);
						doc.url = downloadURL;
						if (doc.discount != 0) {
							calculatePriceWithDiscount(doc);
						}
					} catch (error) {
						console.error("Error obtaining image URL:", error);
					}
				})
			);

			setProducts(productsArray);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
		handleProducts();
	}, []);

	async function handleReview(id, snapshot) {
		let totalRatings = 0;
		let numRatings = 0;
		let review = {};
		let reviewArray = [];

		snapshot.forEach((doc) => {
			if (id == doc.data().product) {
				const rating = doc.data().rating;
				if (rating >= 1 && rating <= 5) {
					totalRatings += rating;
					numRatings++;
				}
			}

			totalRatings =
				Math.floor(totalRatings) + parseFloat((totalRatings % 1).toFixed(1));

			review = {
				title: doc.data().title,
				description: doc.data().description,
				rating: doc.data().rating,
				user: doc.data().uid,
				product: doc.data().product,
				date: doc.data().date,
			};
			reviewArray.push(review);
			setReview(reviewArray);
		});

		const averageRating =
			numRatings > 0 ? Math.min(5, totalRatings / numRatings) : 0;

		return {
			averageRating: averageRating,
			totalRatings: numRatings,
		};
	}

	function calculatePriceWithDiscount(product) {
		if ("price" in product && "discount" in product) {
			const originalPrice = parseFloat(
				product.price.replace("$", "").replace(",", ".")
			);
			const discount = parseFloat(product.discount);

			const priceWithDiscount = originalPrice * (1 - discount / 100);

			product.priceWithDiscount = `$${priceWithDiscount.toFixed(2)}`;
		} else {
			console.log(
				"The product object does not contain the 'price' and/or 'discount' keys."
			);
		}
	}

	async function handleUsers(id, querySnapshot) {
		try {
			querySnapshot.forEach((user) => {
				const storageRef = storage;
				const imageRef = ref(
					storageRef,
					`images/reviews/${id}/${user.data().uid}`
				);
				let imgUser = {};

				listAll(imageRef)
					.then((result) => {
						result.items.forEach(async (itemRef) => {
							await getDownloadURL(itemRef)
								.then((url) => {
									imgUser = {
										url,
										user: user.data().uid,
										product: id,
									};
									arr.push(imgUser);
								})
								.catch((error) => {
									console.error("Erro ao obter a URL da imagem:", error);
								});
						});
						setReviewImg(arr);
						setLoading(false);
					})
					.catch((error) => {
						console.error("Erro ao listar as imagens:", error);
					});
			});
		} catch (error) {
			console.log(error);
		}
	}
	if (!loading) {
		if (products && reviewImg) {
			return (
				<ProductContext.Provider value={{ products, review, reviewImg, user }}>
					{children}
				</ProductContext.Provider>
			);
		}
	} else {
		<Loading page={"modal"} />;
	}
}

export default ProductProvider;
