import React from "react";

//Styles
import "./productContainer.css";

//Router dom
import { Link } from "react-router-dom";

//Components
import WishlistButton from "../WishlistButton";

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
      <Link to={`/product/${product.id}`} key={product.id}>
        <img src={product.url} alt="Imagem Produto" />
      </Link>
      <div className="arrival-content-home">
        <Link to={`/product/${product.id}`} key={product.id}>
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
        </Link>
        <WishlistButton product={product} />
      </div>
    </div>
  );
};

export default ProductContainer;
