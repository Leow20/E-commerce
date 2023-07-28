import React from "react";
import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams();
  return (
    <div>
      <h2>Detalhes do Produto {id}</h2>
    </div>
  );
}

export default Product;
