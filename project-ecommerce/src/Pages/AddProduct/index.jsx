import { useEffect, useState, useRef } from "react";
import { db, storage } from "../../../firebaseConnection";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { toast } from "react-toastify";

import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";

import "./addProduct.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [discount, setDescount] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [ID, setID] = useState("");
  const [file, setFile] = useState("");
  var myArray = [];

  async function handleProducts() {
    const q = query(collection(db, "products"));

    await getDocs(q).then((value) => {
      value.forEach((doc) => {
        const userData = doc.data().name;
        myArray.push(userData);
        localStorage.setItem("teste", JSON.stringify(myArray));
      });
    });
  }

  useEffect(() => {
    handleProducts();
    if (ID == "") {
      generateRandomID();
    }
  }, [myArray]);

  function handleImage(e) {
    console.log(file);
    if (!file) {
      toast.warning("Nenhuma foto Cadastrada");
      return;
    }

    const storageRef = ref(storage, `images/products/${ID}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  }

  async function addProduct(e) {
    e.preventDefault();

    if (
      name == "" ||
      description == "" ||
      price == "" ||
      qty == "" ||
      discount == "" ||
      selectedBrand == "" ||
      selectedColor == ""
    ) {
      return toast.warning("Preencha todos os campos");
    }
    await handleImage();

    await addDoc(collection(db, "products"), {
      name: name,
      description: description,
      price: price,
      qty: qty,
      discount: discount,
      stars: 0,
      brand: selectedBrand,
      color: selectedColor,
      category: selectedCategory,
      id: ID,
    })
      .then(() => {
        toast.success("Produto Cadastrado");
        setPrice("");
        setFile("");
        setDescount("");
        setName("");
        setDescription("");
        setQty("");
        setSelectedBrand("");
        setSelectedColor("");
        setSelectedCategory("");
        setID("");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao cadastrar");
      });
  }
  function generateRandomID() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";

    for (let i = 0; i < 32; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      id += chars.charAt(randomIndex);
    }

    console.log(id);
    setID(id);
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
        <div>
          <label>Marca</label>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">Selecione uma marca</option>
            <option value="zara">Zara</option>
            <option value="d&g">D&G</option>
            <option value="h&m">H&M</option>
            <option value="chanel">Chanel</option>
            <option value="prada">Prada</option>
            <option value="biba">Biba</option>
          </select>
        </div>

        <div>
          <label>Cor</label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="">Selecione uma cor</option>
            <option value="blue">Blue</option>
            <option value="teal">Teal</option>
            <option value="aquamarine">Aquamarine</option>
            <option value="off-white">Off-White</option>
            <option value="marron-red">Marron Red</option>
            <option value="crimson-red">Crimson Red</option>
            <option value="seinna-pink">Seinna Pink</option>
            <option value="muave-orange">Muave Orange</option>
          </select>
        </div>

        <div>
          <label>Categoria</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            <option value="handbags">Handbags</option>
            <option value="jewllery">Jewllery</option>
            <option value="watches">Watches</option>
            <option value="skincare">Skincare</option>
            <option value="personal-care">Personal Care</option>
            <option value="eyewear">Eyewear</option>
            <option value="apparels">Apparels</option>
            <option value="fragrance">Fragrance</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Imagem do produto:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => setFile(e.target.files[0])}
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
