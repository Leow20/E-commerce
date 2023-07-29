import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebaseConnection";
import { collection, getDocs, query, where } from "@firebase/firestore";

export const UserContext = createContext({});

function UserProvider({ children }) {
	const [user, setUser] = useState("");

	const fetchUserInfoAndUpdateState = async (uid) => {
		try {
			const q = query(collection(db, "users"), where("uid", "==", uid));

			await getDocs(q).then((value) => {
				value.forEach(async (valueInfo) => {
					const userData = valueInfo.data();
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
		<UserContext.Provider value={{ user, fetchUserInfoAndUpdateState }}>
			{children}
		</UserContext.Provider>
	);
}

export default UserProvider;
