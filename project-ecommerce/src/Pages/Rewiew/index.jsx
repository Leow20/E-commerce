import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

//Icons
import Arrow from "../../assets/HeaderModal/arrow-right-black.svg";
import { AiOutlinePlus } from "react-icons/ai";

//Images
import StarFill from "../../assets/icons/star-fill.svg";
import Star from "../../assets/icons/star.svg";

import { ProductContext } from "../../Contexts/products";

import "./Review.css";
import ReviewBar from "../../components/ReviewBar";
import AddReview from "../../components/AddReview";

const Review = () => {
  const { id } = useParams();
  const { products, review } = useContext(ProductContext);

  console.log(review);

  const [product, setProduct] = useState("");
  const [currentReviews, setCurrentReviews] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const snapProduct = products.filter((product) => product.id == id);
    const snapReview = review.filter((review) => review.product == id);
    setProduct(snapProduct[0]);
    setCurrentReviews(snapReview);
    console.log(snapReview);
  }, []);

  const starCounts = [5, 4, 3, 2, 1];
  const starRatings = starCounts.map((star) => ({
    star,
    count: currentReviews.filter((review) => review.rating === star).length,
  }));
  const totalReviews = product.totalRating;

  const totalRating = currentReviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  const averageRating = totalRating / totalReviews;

  return (
    <>
      <AddReview isOpen={isOpen} product={product} />
      <div className="page-wrapper-modal-info">
        <header className="product-data-header">
          <Link to={`/product/${id}`}>
            <img
              src={Arrow}
              alt="Arrow-Back"
              style={{ transform: "rotate(180deg)" }}
            />
          </Link>
        </header>
        <div className="container-review-product">
          <div className="container-info-review">
            <p>{product.name}</p>
            <p>{product.description}</p>
          </div>
          <div>
            <div className="average-rating">
              <div className="total-stars">
                <span>{averageRating.toFixed(1)} </span>
                <span className="rating-icon">
                  <img src={StarFill} alt="iconde de estrela" />
                </span>
              </div>
              <h2>Average Rating</h2>
            </div>
            {starRatings.map(({ star, count }) => (
              <div className="review-bar-container" key={star}>
                <div className="rating-label">
                  <span>{star}.0</span>
                </div>
                <ReviewBar rating={count} starCount={totalReviews} />
              </div>
            ))}
            <div className="container-costumer-photos">
              <h5>Customer Photos</h5>
              <div className="content-photos-costumer">
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
              </div>
            </div>
            <div className="separator-review"></div>
          </div>

          <section className="section-users-reviews">
            <div className="card-review">
              <div className="infos-user-review">
                <div className="stars-review-user">
                  <span>4.5</span>
                  <img src={StarFill} alt="icone de estrela " />
                </div>
                <div className="content-info-user">
                  <span>Leonardo Winter</span>
                  <span>05/08/2023</span>
                </div>
              </div>
              <div className="description-review">
                <p>Must go for the class feel.</p>
                <p>
                  Totally amazing! I loved the material and the quality. It has
                  a jolly vibe in it which makes me feel happy everytime I put
                  it on.
                </p>
              </div>
              <div className="content-photos-costumer">
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
              </div>
            </div>
            <div className="card-review">
              <div className="infos-user-review">
                <div className="stars-review-user">
                  <span>4.5</span>
                  <img src={StarFill} alt="icone de estrela " />
                </div>
                <div className="content-info-user">
                  <span>Leonardo Winter</span>
                  <span>05/08/2023</span>
                </div>
              </div>
              <div className="description-review">
                <p>Must go for the class feel.</p>
                <p>
                  Totally amazing! I loved the material and the quality. It has
                  a jolly vibe in it which makes me feel happy everytime I put
                  it on.
                </p>
              </div>
              <div className="content-photos-costumer">
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
              </div>
            </div>
            <div className="card-review">
              <div className="infos-user-review">
                <div className="stars-review-user">
                  <span>4.5</span>
                  <img src={StarFill} alt="icone de estrela " />
                </div>
                <div className="content-info-user">
                  <span>Leonardo Winter</span>
                  <span>05/08/2023</span>
                </div>
              </div>
              <div className="description-review">
                <p>Must go for the class feel.</p>
                <p>
                  Totally amazing! I loved the material and the quality. It has
                  a jolly vibe in it which makes me feel happy everytime I put
                  it on.
                </p>
              </div>
              <div className="content-photos-costumer">
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
                <div>
                  <img src={product.url} alt="fotos dos usuarios" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="container-button-add-review">
        <button
          className="button-add-review"
          onClick={() => setIsOpen(!isOpen)}
        >
          <AiOutlinePlus /> Write a Review
        </button>
      </div>
    </>
  );
};

export default Review;
