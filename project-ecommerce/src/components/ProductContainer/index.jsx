import React from "react";
import heart from "../../assets/icons/Vector.svg";
import bag from "../../assets/Img/image.jpg";
import { useState, useEffect } from "react";

const ProductContainer = ({ product }) => {
  const truncateDescription = (description, maxWords) => {
    const words = description.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return description;
  };

  return (
    <div key={product.id} className="img-product-home">
      <img src={product.url} alt="Imagem Produto" />
      <div className="arrival-content-home">
        <div className="text-product-home">
          <span>{product.name}</span>
          <span>{truncateDescription(product.description, 2)}</span>
          <span>{product.price}</span>
        </div>
        <img src={heart} alt="icone coração" width={16} height={16} />
      </div>
    </div>
  );
};

export default ProductContainer;
