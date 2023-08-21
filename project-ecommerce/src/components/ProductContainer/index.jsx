import React, { useEffect, useState } from "react";

//Styles
import "./productContainer.css";

//Router dom
import { Link } from "react-router-dom";

//Components
import WishlistButton from "../WishlistButton";
import { useMediaQuery } from "react-responsive";
import SlideUpModal from "../SlideUpModal";

const ProductContainer = ({ product }) => {
  //  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 820 });
  const [showModal, setShowModal] = useState(false);

  const truncateDescription = (description, maxWords) => {
    const words = description.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return description;
  };

  return (
    <div key={product.id} className="img-product-home">
      <SlideUpModal
        page={"Product Details"}
        isOpen={showModal}
        product={product}
      />
      {isMobile ? (
        <>
          <button
            className="btn-up-modal"
            onClick={() => setShowModal(!showModal)}
            key={product.id}
          >
            <img src={product.url} alt="Imagem Produto" />
            {product.stars >= 4.5 ? (
              <h5 className="Trending-product-home">Trending</h5>
            ) : null}
          </button>
          <div
            className="arrival-content-home"
            style={{ position: "relative", width: "100%" }}
          >
            <button
              className="btn-up-modal"
              onClick={() => setShowModal(!showModal)}
              key={product.id}
            >
              <div className="text-product-home" style={{ width: "100%" }}>
                <span style={{ width: "100%" }}>
                  {truncateDescription(product.name, 2)}
                </span>
                <span style={{ width: "100%" }}>
                  {truncateDescription(product.description, 2)}
                </span>
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
            </button>
            <WishlistButton product={product} className="button-wishlist" />
          </div>
        </>
      ) : (
        <>
          <Link to={`/product/${product.id}`} key={product.id}>
            <img src={product.url} alt="Imagem Produto" />
            {product.stars >= 4.5 ? (
              <h5 className="Trending-product-home">Trending</h5>
            ) : null}
          </Link>
          <div
            className="arrival-content-home"
            style={{ position: "relative", width: "100%" }}
          >
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="text-product-home" style={{ width: "100%" }}>
                <span style={{ width: "100%" }}>
                  {truncateDescription(product.name, 2)}
                </span>
                <span style={{ width: "100%" }}>
                  {truncateDescription(product.description, 2)}
                </span>
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
            </Link>
            <WishlistButton product={product} className="button-wishlist" />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductContainer;
