import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCiIfd2XGh0dlwHiwYuSFUQADXLeMXe2Rw",
  authDomain: "e-commerce-b5c15.firebaseapp.com",
  projectId: "e-commerce-b5c15",
  storageBucket: "e-commerce-b5c15.appspot.com",
  messagingSenderId: "95494243001",
  appId: "1:95494243001:web:07543fedf6da705135d168",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { db, auth, storage };
