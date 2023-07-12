import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConnection = {
    apiKey: "AIzaSyCiIfd2XGh0dlwHiwYuSFUQADXLeMXe2Rw",
    authDomain: "e-commerce-b5c15.firebaseapp.com",
    projectId: "e-commerce-b5c15",
    storageBucket: "e-commerce-b5c15.appspot.com",
    messagingSenderId: "95494243001",
    appId: "1:95494243001:web:07543fedf6da705135d168"

};

const firebaseApp = initializeApp(firebaseConnection);

const auth = getAuth(firebaseApp);

export { auth };