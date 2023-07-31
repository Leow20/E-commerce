import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "../../firebaseConnection";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

export const UserContext = createContext({});

function UserProvider({ children }) {
  const [user, setUser] = useState("");
  const [url, setUrl] = useState("");

  const fetchUserInfoAndUpdateState = async (uid) => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", uid));

      const storageRef = storage;
      const imageRef = ref(storageRef, `images/users/${uid}`);
      try {
        const downloadURL = await getDownloadURL(imageRef);
        setUrl(downloadURL);
        console.log(downloadURL);
      } catch (error) {
        console.error("Error obtaining image URL:", error);
      }

      await getDocs(q).then((value) => {
        value.forEach(async (valueInfo) => {
          const userData = valueInfo.data();
          userData.url = Promise.url;
          setUser(userData);
        });
      });
    } catch (error) {
      console.error("Erro ao obter dados do Firestore:", error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfoAndUpdateState(user.uid);
      } else {
        console.log("Não Autorizado");
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export default UserProvider;
