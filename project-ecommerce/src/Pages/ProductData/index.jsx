//React
import React, { useContext, useEffect, useState } from "react";

//Router Dom
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

//Style
import "./productData.css";

//Firebase
import { db } from "../../../firebaseConnection";
import { collection, query, where } from "firebase/firestore";
import { useMediaQuery } from "react-responsive";

//Components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RelatedProducts from "../../components/RelatedProducts";
import RatingsAndReviews from "../../components/RatingsandReviews";
import SlideUpModal from "../../components/SlideUpModal";

//Icon
import Arrow from "../../assets/HeaderModal/arrow-right-black.svg";
import ArrowRight from "../../assets/icons/blackArrow.svg";
import StarFill from "../../assets/icons/star-fill.svg";
import Star from "../../assets/icons/star.svg";
import Bag from "../../assets/icons/bag-white.svg";
import Similar from "../../assets/icons/view-smilar.svg";
import Hearth from "../../assets/icons/icon-wishlist.svg";

//Context
import { ProductContext } from "../../Contexts/products";
import WishlistButton from "../../components/WishlistButton";
import NavMob from "../../components/NavMob";
import BagButton from "../../components/BagButton";

const ProductData = () => {
  const { products } = useContext(ProductContext);
  const { id } = useParams();
  const isMobile = useMediaQuery({ maxWidth: 619 });
  const productId = id;
  const q = query(collection(db, "products"), where("id", "==", productId));
  const [product, setProduct] = useState({});
  const [image, setImage] = useState("");
  const [qtd, setQtd] = useState(1);
  const [container, setContainer] = useState("Product Description");
  const [classImg, setClassImg] = useState(1);
  const [showUpModal, setShowUpModal] = useState(false);
  const [rating, setRating] = useState(null);
  const productsFiltered = [];
  products.forEach((element) => {
    if (element.category === product.category) {
      productsFiltered.push(element);
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    products.forEach((doc) => {
      if (doc.id == productId) {
        setProduct(doc);
        setImage(doc.url);
      }
    });
  }, []);

  if (isMobile && product) {
    return (
      <>
        <header className="product-data-header">
          <Link to="/">
            <img
              src={Arrow}
              alt="Arrow-Back"
              style={{ transform: "rotate(180deg)" }}
            />
          </Link>
        </header>
        <section className="product-data-section">
          <SlideUpModal
            isOpen={showUpModal}
            page={"Also Like"}
            filteredProducts={productsFiltered}
          />
          <div className="container-product-data">
            <div className="box-img-data">
              <div className="img-data">
                <img src={image} alt="Product Image" id="productImageID" />
                <button onClick={() => setShowUpModal(!showUpModal)}>
                  <img src={Similar} alt="View Similar" />
                </button>
              </div>
              <div className="img-data">
                <img src={image} alt="Product Image" id="productImageID" />
                <button onClick={() => setShowUpModal(!showUpModal)}>
                  <img src={Similar} alt="View Similar" />
                </button>
              </div>
              <div className="img-data">
                <img src={image} alt="Product Image" id="productImageID" />
                <button onClick={() => setShowUpModal(!showUpModal)}>
                  <img src={Similar} alt="View Similar" />
                </button>
              </div>
              <div className="img-data">
                <img src={image} alt="Product Image" id="productImageID" />
                <button onClick={() => setShowUpModal(!showUpModal)}>
                  <img src={Similar} alt="View Similar" />
                </button>
              </div>
            </div>

            <div className="box-text-data">
              <h1>{product.name}</h1>
              <p>{product.description}</p>

              {product.discount == 0 ? (
                <div>
                  <h3>{product.price}</h3>
                </div>
              ) : (
                <div>
                  <h3>{product.priceWithDiscount}</h3>
                  <h4>{product.price}</h4>
                  <h5>{product.discount + "%OFF"}</h5>{" "}
                </div>
              )}
            </div>

            <Link to={`/review/${product.id}`}>
              <div className="box-stars-data">
                <div className="content-stars-data">
                  <span className="span-stars-data">{product.stars}</span>
                  <img src={product.stars == 0 ? Star : StarFill} alt="Stars" />
                </div>

                <div className="content-text-stars-data">
                  <h2>Average Rating</h2>
                  {product.totalRating != 1 && (
                    <p>{product.totalRating} Reviews</p>
                  )}
                  {product.totalRating == 1 && (
                    <p>{product.totalRating} Review</p>
                  )}
                </div>
              </div>
            </Link>

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
              <div>
                <span>Delivery Details</span>
                <span>Check estimated delivery date/pickup option.</span>
              </div>
              <div>
                <input
                  type="text"
                  name="Pincode input"
                  id="pincodeInputID"
                  placeholder="Enter Valid Pincode"
                />
                <label>CHECK</label>
              </div>
            </div>

            <div className="container-btns-content-data">
              <div className="btn-box-content-data">
                <hr />
                <button
                  className={
                    container == "Product Description" ? "active-btn-data" : ""
                  }
                  onClick={() => {
                    if (container != "Product Description") {
                      setContainer("Product Description");
                    } else {
                      setContainer("");
                    }
                  }}
                >
                  <span>Product Description</span>
                  <img
                    src={Arrow}
                    alt="Arrow"
                    style={{
                      transform: `rotate(${
                        container == "Product Description" ? "90deg" : "0deg"
                      })`,
                    }}
                  />
                </button>
                {container == "Product Description" && (
                  <div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Repellat, ad corporis ipsum explicabo provident doloremque
                      omnis? Tempore, quis ducimus possimus optio dolorum ut
                      eaque rem rerum architecto recusandae, officia nisi.
                    </p>
                  </div>
                )}
              </div>

							<div className="btn-box-content-data">
								<hr />
								<button
									className={
										container == "Ratings and Reviews" ? "active-btn-data" : ""
									}
									onClick={() => {
										if (container != "Ratings and Reviews") {
											setContainer("Ratings and Reviews");
										} else {
											setContainer("");
										}
									}}
								>
									<span>Ratings and Reviews</span>
									<img
										src={Arrow}
										alt="Arrow"
										style={{
											transform: `rotate(${
												container == "Ratings and Reviews" ? "90deg" : "0deg"
											})`,
										}}
									/>
								</button>
								{container == "Ratings and Reviews" && <RatingsAndReviews />}
							</div>
						</div>
						<RelatedProducts
							func={"container"}
							productsFiltered={productsFiltered}
						/>
						<div className="box-btns-data">
							<WishlistButton className="add-fav" product={product} />
							<BagButton product={product} />
						</div>
					</div>
				</section>
			</>
		);
	} else if (!isMobile && product) {
		const category = product.category;
		return (
			<>
				<Header Page={product.name} />
				<section className="product-data-section">
					<div className="box-title-data">
						<Link to="/">
							<span>Home</span>
						</Link>
						<img src={ArrowRight} alt="Arrow" />
						<span>
							{category
								? category.charAt(0).toUpperCase() + category.slice(1)
								: null}
						</span>
						<img src={ArrowRight} alt="Arrow" />
						<span>{product.name}</span>
					</div>
					<div className="container-product-data">
						<div className="container-img-data">
							<div className="img-data">
								<img src={image} alt="Product Image" id="productImageID" />
							</div>
							<div className="img-navigation-data">
								<button
									className="btn-arrow-left"
									onClick={() => {
										classImg != 1 && classImg >= 1 && setClassImg(classImg - 1);
									}}
								>
									<img
										src={Arrow}
										alt="Arrow left"
										style={{ transform: "rotate(180deg)" }}
									/>
								</button>
								<div>
									<button
										onClick={() => {
											setClassImg(1);
										}}
									>
										<img
											src={image}
											alt="Product Image"
											className={classImg == 1 ? "active-img" : ""}
										/>
									</button>
									<button
										onClick={() => {
											setClassImg(2);
										}}
									>
										<img
											src={image}
											alt="Product Image"
											className={classImg == 2 ? "active-img" : ""}
										/>
									</button>
									<button
										onClick={() => {
											setClassImg(3);
										}}
									>
										<img
											src={image}
											alt="Product Image"
											className={classImg == 3 ? "active-img" : ""}
										/>
									</button>
									<button
										onClick={() => {
											setClassImg(4);
										}}
									>
										<img
											src={image}
											alt="Product Image"
											className={classImg == 4 ? "active-img" : ""}
										/>
									</button>
								</div>
								<button
									className="btn-arrow-right"
									onClick={() => {
										classImg != 4 && classImg <= 4 && setClassImg(classImg + 1);
									}}
								>
									<img src={Arrow} alt="Arrow left" />
								</button>
							</div>
						</div>

            <div className="box-content-data">
              <div className="box-text-data">
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <div className="box-stars-data">
                  <div className="content-stars-data">
                    <Link to={`/review/${product.id}`}>
                      <img
                        src={
                          product.stars > 0 && product.stars >= 1
                            ? StarFill
                            : Star
                        }
                        alt="Stars"
                      />
                      <img
                        src={
                          product.stars > 1 && product.stars >= 2
                            ? StarFill
                            : Star
                        }
                        alt="Stars"
                      />
                      <img
                        src={
                          product.stars > 2 && product.stars >= 3
                            ? StarFill
                            : Star
                        }
                        alt="Stars"
                      />
                      <img
                        src={
                          product.stars > 3 && product.stars >= 4
                            ? StarFill
                            : Star
                        }
                        alt="Stars"
                      />
                      <img
                        src={
                          product.stars > 4 && product.stars >= 5
                            ? StarFill
                            : Star
                        }
                        alt="Stars"
                      />
                    </Link>
                  </div>
                  <Link to={`/review/${product.id}`}>
                    <div className="rating-data">
                      {product.totalRating != 1 && (
                        <span>{product.totalRating} Reviews</span>
                      )}
                      {product.totalRating == 1 && (
                        <span>{product.totalRating} Review</span>
                      )}
                    </div>
                  </Link>
                </div>

                {product.discount == 0 ? (
                  <div className="box-price-data">
                    <h3>{product.price}</h3>
                  </div>
                ) : (
                  <div className="box-price-data">
                    <h3>{product.priceWithDiscount}</h3>
                    <h4>{product.price}</h4>
                    <h5>{product.discount + "%OFF"}</h5>{" "}
                  </div>
                )}
              </div>
              <hr />
              <div className="delivery-details-data">
                <div>
                  <span>Delivery Details</span>
                  <span>Check estimated delivery date/pickup option.</span>
                </div>
                <div>
                  <input
                    type="text"
                    name="Pincode input"
                    id="pincodeInputID"
                    placeholder="Apply Valid Pincode"
                  />
                  <label>CHECK</label>
                </div>
              </div>

              <div className="box-quantity-data">
                <span>Quantity:</span>
                <div>
                  <button
                    onClick={() => {
                      (qtd < product.qty && qtd != 1) || qtd == product.qty
                        ? setQtd(qtd - 1)
                        : null;
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    name="Quantity"
                    id="inputQuantityID"
                    value={qtd}
                    onChange={(e) => {
                      qtd < product.qty && qtd != 0
                        ? setQtd(e.target.value)
                        : null;
                    }}
                    disabled
                  />
                  <button
                    onClick={() => {
                      qtd < product.qty ? setQtd(qtd + 1) : null;
                    }}
                  >
                    +
                  </button>
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

              <div className="box-btns-data">
                <BagButton product={product} qty={qtd} />
                <WishlistButton
                  className="add-fav"
                  product={product}
                  text="Add to Wishlist"
                />
              </div>
            </div>
          </div>

          <div className="container-content-data">
            <div className="btns-box-content-data">
              <button
                className={
                  container == "Product Description" ? "active-btn-data" : ""
                }
                style={
                  container != "Product Description" ? { color: "#626262" } : {}
                }
                onClick={() => setContainer("Product Description")}
              >
                Product Description
              </button>
              <button
                className={
                  container == "Related Products" ? "active-btn-data" : ""
                }
                style={
                  container != "Related Products" ? { color: "#626262" } : {}
                }
                onClick={() => setContainer("Related Products")}
              >
                Related Products
              </button>
              <Link to={`/review/${product.id}`}>
                <button
                  className={
                    container == "Ratings and Reviews" ? "active-btn-data" : ""
                  }
                  style={
                    container != "Ratings and Reviews"
                      ? { color: "#626262" }
                      : {}
                  }
                  onClick={() => setContainer("Ratings and Reviews")}
                >
                  Ratings and Reviews
                </button>
              </Link>
            </div>

            <div className="box-content-btns-data">
              {container == "Product Description" && (
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat, ad corporis ipsum explicabo provident doloremque
                    omnis? Tempore, quis ducimus possimus optio dolorum ut eaque
                    rem rerum architecto recusandae, officia nisi.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat, ad corporis ipsum explicabo provident doloremque
                    omnis? Tempore, quis ducimus possimus optio dolorum ut eaque
                    rem rerum architecto recusandae, officia nisi.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat, ad corporis ipsum explicabo provident doloremque
                    omnis? Tempore, quis ducimus possimus optio dolorum ut eaque
                    rem rerum architecto recusandae, officia nisi.
                  </p>
                </div>
              )}
              {container == "Related Products" && <RelatedProducts />}
              {container == "Ratings and Reviews" && <RatingsAndReviews />}
            </div>
          </div>
        </section>
        <Footer />
        <NavMob page="/#" />
      </>
    );
  }
};

export default ProductData;
