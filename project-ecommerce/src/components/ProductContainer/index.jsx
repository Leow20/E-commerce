import React from "react";
import heart from "../../assets/icons/Vector.svg";

//Styles
import "./productContainer.css";

const ProductContainer = ({ product, page }) => {
  //  const [loading, setLoading] = useState(true);
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
          <span>{truncateDescription(product.name, 2)}</span>
          <span>{truncateDescription(product.description, 2)}</span>
          {page != "result" && <span>{product.price}</span>}
          {page == "result" && (
            <div className="container-product-price">
              <span>{product.price}</span>
              <span>{product.priceWithDiscount}</span>
              {product.discount > 0 && <span>{product.discount}%</span>}
            </div>
          )}
        </div>
        <img src={heart} alt="icone coração" width={16} height={16} />
      </div>
    </div>
  );
};

export default ProductContainer;
