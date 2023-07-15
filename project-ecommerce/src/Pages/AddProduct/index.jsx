import { useState } from "react";
import { db } from "../../../firebaseConnection";
import { addDoc, collection } from "firebase/firestore";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [discount, setDescount] = useState("");
  const [stars, setStars] = useState("");
  const [image, setImage] = useState("");

  async function addProduct(e) {
    e.preventDefault();
    await addDoc(collection(db, "products"), {
      name: name,
      description: description,
      price: price,
      qty: qty,
      discount: discount,
      stars: stars,
    })
      .then(() => {
        console.log("Produto Cadastrado");
        setPrice("");
        setStars("");
        setImage("");
        setDescount("");
        setName("");
        setDescription("");
        setQty("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="cadastro-container">
      <div>
        <h2>Insira um novo produto</h2>
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome do Produto:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição do Produto:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Preço do Produto:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="qty">Quantidade:</label>
          <input
            type="number"
            id="qty"
            name="qty"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="discount">Desconto do Produto:</label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={discount}
            onChange={(e) => setDescount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stars">Avaliação do Produto:</label>
          <input
            type="text"
            id="stars"
            name="stars"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Imagem do produto:</label>
          <input
            type="file"
            id="image"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit" onClick={(e) => addProduct(e)}>
          Cadastre
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
