import React, { useContext, useEffect, useState } from "react";
import Bag from "../../assets/icons/bag-white.svg";
import BagIcon from "../../assets/imgHeader/bag.svg";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConnection";
import { UserContext } from "../../Contexts/user";
import { toast } from "react-toastify";

const BagButton = ({ product, className = "add-bag", qty = 1, img = true }) => {
  const { user } = useContext(UserContext);
  const [bag, setBag] = useState([]);
  if (product) {
    product.qtyBag = qty;
  }

  const loadBag = async () => {
    
    const bagSnapshot = await getDoc(doc(db, "bag", user.uid));
    if (user) {
      if (bagSnapshot.exists()) {
        setBag(bagSnapshot.data().data);
      } else {
        setBag([]);
        await setDoc(doc(db, "bag", user.uid), { data: bag });
      }
    }
  };

  const handleBag = async () => {
    if (!user || !product) return;
    const bagtSnapshot = await getDoc(doc(db, "bag", user.uid));
    const updatedBag = bagtSnapshot.data().data;
    updatedBag.push(product);

    setBag(updatedBag);
    console.log(updatedBag);

    await setDoc(doc(db, "bag", user.uid), { data: updatedBag }).then(() =>
      toast.success("Product added to bag")
    );
  };

  useEffect(() => {
    
    loadBag();
  }, [user]);

  const isProductInBag = bag.some((item) => item.id === product.id);
  if (className == "add-bag") {
    return (
      <div>
        <button className={className} onClick={handleBag}>
          <img src={Bag} alt="Bag" />
          <span>Add to Bag</span>
        </button>
      </div>
    );
  } else {
    return (
      <button className={className} onClick={handleBag}>
        {img && <img src={BagIcon} alt="Bag" />}Add to bag
      </button>
    );
  }
};

export default BagButton;
