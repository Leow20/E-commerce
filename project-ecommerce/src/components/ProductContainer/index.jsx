import React from "react";
import heart from "../../assets/icons/Vector.svg";
import bag from "../../assets/Img/image.jpg";
import { useState, useEffect } from "react";
import { storage } from "../../../firebaseConnection";
import { getDownloadURL, ref } from "firebase/storage";

//Styles
import "./productContainer.css";

const ProductContainer = ({ product }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const truncateDescription = (description, maxWords) => {
    const words = description.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return description;
  };

  async function handleImg() {
    setLoading(true);
    const storageRef = storage;
    const imageRef = ref(storageRef, `images/products/${product.id}`);

    const downloadURL = await getDownloadURL(imageRef);
    setUrl(downloadURL);
    setLoading(false);
  }

  useEffect(() => {
    handleImg();
  }, [product]);

  return (
    <div key={product.id} className="img-product-home">
      <img src={url} alt="Imagem Produto" />
      <div className="arrival-content-home">
        <div className="text-product-home">
          <span>{truncateDescription(product.name, 2)}</span>
          <span>{truncateDescription(product.description, 2)}</span>
          <span>{product.price}</span>
        </div>
        <img src={heart} alt="icone coração" width={16} height={16} />
      </div>
    </div>
  );
};

export default ProductContainer;
