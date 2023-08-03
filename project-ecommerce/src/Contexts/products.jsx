import { collection, getDocs, query } from "@firebase/firestore";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { db, storage } from "../../firebaseConnection";
import { getDownloadURL, ref } from "@firebase/storage";

export const ProductContext = createContext({});

var productsArray = [];

function ProductProvider({ children }) {
  const [products, setProducts] = useState("");

  const handleProducts = useMemo(async () => {
    const q = query(collection(db, "products"));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let product = {
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
          qty: doc.data().qty,
          stars: doc.data().stars,
          discount: doc.data().discount,
          id: doc.data().id,
          category: doc.data().category,
          color: doc.data().color,
          brand: doc.data().brand,
        };
        productsArray.push(product);
      });

      await Promise.all(
        productsArray.map(async (doc) => {
          const storageRef = storage;
          const imageRef = ref(storageRef, `images/products/${doc.id}`);
          try {
            const downloadURL = await getDownloadURL(imageRef);
            doc.url = downloadURL;
            if (doc.discount != 0) {
              calculatePriceWithDiscount(doc);
            }
          } catch (error) {
            console.error("Error obtaining image URL:", error);
          }
        })
      );

      setProducts(productsArray);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    handleProducts();
  }, []);

  function calculatePriceWithDiscount(product) {
    if ("price" in product && "discount" in product) {
      const originalPrice = parseFloat(
        product.price.replace("$", "").replace(",", ".")
      );
      const discount = parseFloat(product.discount);

      const priceWithDiscount = originalPrice * (1 - discount / 100);

      product.priceWithDiscount = `$${priceWithDiscount.toFixed(2)}`;
    } else {
      console.log(
        "The product object does not contain the 'price' and/or 'discount' keys."
      );
    }
  }

  if (products) {
    return (
      <ProductContext.Provider value={{ products }}>
        {children}
      </ProductContext.Provider>
    );
  }
}

export default ProductProvider;
