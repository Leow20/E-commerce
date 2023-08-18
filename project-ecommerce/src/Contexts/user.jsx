import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "../../firebaseConnection";
import {
	collection,
	getDocs,
	query,
	where,
	setDoc,
	doc,
	getDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import Loading from "../components/Loading";

export const UserContext = createContext({});

function UserProvider({ children }) {
	const [user, setUser] = useState("");
	const [loading, setLoading] = useState(true);

	const fetchUserInfoAndUpdateState = async (uid) => {
		const q = query(collection(db, "users"), where("uid", "==", uid));
		try {
			await getDocs(q).then((value) => {
				value.forEach(async (valueInfo) => {
					const userData = valueInfo.data();
					handleUploadImage(userData);
				});
			});
		} catch (error) {
			console.error("Erro ao obter dados do Firestore:", error);
		}
	};

	const handleUploadImage = async (user) => {
		const storageRef = storage;
		const imagemRef = ref(storageRef, `images/users/${user.uid}`);

		try {
			const url = await getDownloadURL(imagemRef);
			user.url = url;
		} catch (error) {
			if (error.code === "storage/object-not-found") {
				user.url = "";
			}
		}
		setUser(user);
		setLoading(false);
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

	if (!loading) {
		return (
			<UserContext.Provider
				value={{
					user,
					fetchUserInfoAndUpdateState,
					handleUploadImage,
				}}
			>
				{children}
			</UserContext.Provider>
		);
	} else {
		return <Loading page={"modal"} />;
	}
}

export default UserProvider;
