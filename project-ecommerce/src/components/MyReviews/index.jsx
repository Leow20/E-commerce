import React, { useContext } from "react";

import Arrow from "../../assets/imgFooter/ArrowDown.svg";
import { useMediaQuery } from "react-responsive";

//Style
import "./myReview.css";
import { ProductContext } from "../../Contexts/products";

import StarFill from "../../assets/icons/star-fill.svg";
import Star from "../../assets/icons/star.svg";
import { Link } from "react-router-dom";
import { UserContext } from "../../Contexts/user";

const MyReviews = () => {
  const isMobile = useMediaQuery({ maxWidth: 820 });
  const { review, products } = useContext(ProductContext);
  const { user } = useContext(UserContext);

  const truncateDescription = (text) => {
    const words = text.split(" ");

    if (words.length > 6) {
      return words.slice(0, 6).join(" ") + "...";
    } else {
      return text;
    }
  };

  return (
    <div className="page-wrapper-myreviews">
      {!isMobile && (
        <>
          <div className="wishlist-head">
            <div>
              <img src={Arrow} alt="Arrow" />
            </div>
            <h1 className="wishlist-h1">My Reviews</h1>
          </div>
          <hr />
        </>
      )}
      {review && (
        <div className="container-myreviews">
          {review.map((review) => {
            const produto = products.find((p) => p.id === review.product);

            if (review.user == user.uid) {
              return (
                <Link to={`/review/${review.product}`}>
                  <div key={review.product} className="card-myreview">
                    <div className="content-myreview-date">
                      <span>{review.date}</span>
                      <div>
                        <img src={Arrow} alt="" />
                      </div>
                    </div>
                    <div className="box-stars-data">
                      <div className="content-stars-data">
                        <img
                          src={
                            review.rating > 0 && review.rating >= 1
                              ? StarFill
                              : Star
                          }
                          alt="Stars"
                        />
                        <img
                          src={
                            review.rating > 1 && review.rating >= 2
                              ? StarFill
                              : Star
                          }
                          alt="Stars"
                        />
                        <img
                          src={
                            review.rating > 2 && review.rating >= 3
                              ? StarFill
                              : Star
                          }
                          alt="Stars"
                        />
                        <img
                          src={
                            review.rating > 3 && review.rating >= 4
                              ? StarFill
                              : Star
                          }
                          alt="Stars"
                        />
                        <img
                          src={
                            review.rating > 4 && review.rating >= 5
                              ? StarFill
                              : Star
                          }
                          alt="Stars"
                        />
                      </div>
                    </div>
                    <div className="content-info-product-myreview">
                      <span>{produto.name}</span>
                      <span>{review.title}</span>
                    </div>
                    <p>{truncateDescription(review.description)}</p>
                  </div>
                </Link>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
