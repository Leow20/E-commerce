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
import { db, storage } from "../../../firebaseConnection";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { UserContext } from "../../Contexts/user";
import { collection, getDocs, query } from "firebase/firestore";

const Review = () => {
  const { id } = useParams();
  const { products, review, reviewImg, user } = useContext(ProductContext);

  const [product, setProduct] = useState("");
  const [currentReviews, setCurrentReviews] = useState([]);
  const [imgReview, setImgReview] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);

  useEffect(() => {
    const snapProduct = products.filter((product) => product.id == id);
    setProduct(snapProduct[0]);
    if (review) {
      const snapReview = review.filter((review) => review.product == id);
      const reviewsWithUserNames = snapReview.map((review) => {
        const currentUser = user.find((user) => user.uid === review.user);

        if (currentUser) {
          const userName = `${currentUser.firstName} ${currentUser.lastName}`;
          return { ...review, userName };
        }

        return review;
      });
      setCurrentReviews(reviewsWithUserNames);
    }
    if (reviewImg) {
      const snapReview = reviewImg.filter((review) => review.product == id);
      setImgReview(snapReview);
    }
  }, [products, review, reviewImg, user]);

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
        {currentReviews.length > 0 && imgReview.length > 0 && (
          <div className="container-review-product">
            <div className="container-info-review">
              <p>{product.name}</p>
              <p>{product.description}</p>
            </div>
            <div className="container-all-reviews">
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
                  {imgReview.map((doc) => {
                    if (product.id == doc.product) {
                      return (
                        <div key={doc.url}>
                          <img src={doc.url} alt="fotos dos usuarios" />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="separator-review"></div>
            </div>

            <section className="section-users-reviews">
              {currentReviews.map((review) => (
                <div key={review.user} className="card-review">
                  <div className="infos-user-review">
                    <div className="stars-review-user">
                      <span>{review.rating}</span>
                      <img src={StarFill} alt="icone de estrela " />
                    </div>
                    <div className="content-info-user">
                      <span>{review.userName}</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                  <div className="description-review">
                    <p>{review.title}</p>
                    <p>{review.description}</p>
                  </div>
                  <div className="content-photos-costumer">
                    {reviewImg.map((doc) => {
                      if (
                        doc.user == review.user &&
                        doc.product == product.id
                      ) {
                        return (
                          <div key={doc.url}>
                            <img src={doc.url} alt="fotos dos usuarios" />
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              ))}
            </section>
          </div>
        )}
        {currentReviews.length == 0 ||
          (!imgReview && (
            <div className="content-noreviews">
              <span>
                Oops... Looks like there are no reviews yet. Be the pioneer and
                share your thoughts!
              </span>
            </div>
          ))}
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
