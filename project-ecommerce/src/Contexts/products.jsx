import { collection, getDocs, query } from "@firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db, storage } from "../../firebaseConnection";
import { getDownloadURL, ref } from "@firebase/storage";

export const ProductContext = createContext({});

var productsArray = [];

function ProductProvider({ children }) {
  const [products, setProducts] = useState("");

  useEffect(() => {
    async function handleProducts() {
      const q = query(collection(db, "products"));

      await getDocs(q).then((value) => {
        value.forEach((doc) => {
          let product = {
            name: doc.data().name,
            description: doc.data().description,
            price: doc.data().price,
            qty: doc.data().qty,
            starts: doc.data().stars,
            discount: doc.data().discount,
            id: doc.data().id,
          };
          productsArray.push(product);
        });
      });

      setProducts(productsArray);
    }

    handleProducts();
  }, []);

  if (products) {
    return (
      <ProductContext.Provider value={{ products }}>
        {children}
      </ProductContext.Provider>
    );
  }
}

export default ProductProvider;