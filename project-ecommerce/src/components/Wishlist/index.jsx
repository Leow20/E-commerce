import React, { useContext, useEffect, useState } from "react";

//Style
import "./wishlist.css";

//Images
import Hearth from "../../assets/Hearth.png";
import bag from "../../assets/Img/image.jpg";

//Icons
import Arrow from "../../assets/imgFooter/ArrowDown.svg";

//Router dom
import { Link, Navigate } from "react-router-dom";

//React Reesponsive
import { useMediaQuery } from "react-responsive";

//Component
import ProductContainer from "../ProductContainer";

//Context
import { UserContext } from "../../Contexts/user";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConnection";
import WishlistButton from "../WishlistButton";
import BagButton from "../BagButton";
import Loading from "../Loading";

const Wishlist = () => {
  const isMobile = useMediaQuery({ maxWidth: 820 });
  const { user } = useContext(UserContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const truncateDescription = (description, maxWords) => {
    const words = description.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return description;
  };

  const loadWishlist = async () => {
    if (user) {
      const wishlistRef = doc(db, "wishlist", user.uid);
      const wishlistSnapshot = await getDoc(wishlistRef);
      if (wishlistSnapshot.exists()) {
        setWishlist(wishlistSnapshot.data().data);
        setLoading(false);
      } else {
        setWishlist([]);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    loadWishlist();
  }, []);

  if (!loading) {
    if (wishlist.length == 0) {
      return (
        <div className="wishlist">
          {!isMobile && (
            <>
              <div className="wishlist-head">
                <div>
                  <img src={Arrow} alt="Arrow" />
                </div>
                <h1 className="wishlist-h1">My Wishlist</h1>
              </div>
              <hr />
            </>
          )}
          <div className="wishlist-container">
            <img src={Hearth} alt="Hearth" id="hearthId" />
            <div className="wishlist-content">
              <h2>Well...</h2>
              <p>It seems you have not added any products to for wishlist.</p>
            </div>
          </div>
          <div className="wishlist-btn-empty-products">
            <button onClick={() => <Navigate to="/" />}>Start Shopping</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="wishlist">
          {!isMobile && (
            <>
              <div className="wishlist-head">
                <div>
                  <img src={Arrow} alt="Arrow" />
                </div>
                <h1 className="wishlist-h1">My Wishlist</h1>
              </div>
              <hr />
            </>
          )}
          {wishlist.length > 0 ? (
            wishlist.length === 1 ? (
              <p>{wishlist.length} Product</p>
            ) : (
              <p>{wishlist.length} Products</p>
            )
          ) : null}
          <div className="wishlist-container-products">
            {wishlist &&
              wishlist.map((product) => (
                <div className="card-wishlist" key={product.id}>
                  <img src={product.url} alt="bolsa" width={150} height={157} />
                  <div className="arrival-content-wishlist">
                    <div className="text-product-wishlist">
                      <span>{truncateDescription(product.name, 2)}</span>
                      <span>{truncateDescription(product.description, 2)}</span>
                      {product.discount == 0 ? (
                        <div className="box-price">
                          <h3>{product.price}</h3>
                        </div>
                      ) : (
                        <div className="box-price">
                          <h3>{product.priceWithDiscount}</h3>
                          <h4>{product.price}</h4>
                          <h5>{product.discount + "%OFF"}</h5>
                        </div>
                      )}
                    </div>
                    <WishlistButton
                      product={product}
                      className="button-wishlist"
                      onLoad={loadWishlist}
                    />
                  </div>
                  <BagButton
                    product={product}
                    className="button-bag-wishlist"
                  />
                </div>
              ))}
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="wishlist-loader">
        <Loading page={"container"} />
      </div>
    );
  }
};

export default Wishlist;
