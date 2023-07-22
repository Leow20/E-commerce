import React, { useRef, useState } from "react";

//Style
import "./ProfileInfo.css";

//images
import userPicture from "../../assets/HeaderModal/user-sem-foto.png";

//Icons
import trashIcon from "../../assets/icons/trashIcon.svg";

//Firebase
import "firebase/auth";
import { auth, storage, db } from "../../../firebaseConnection";
import {
	collection,
	getDocs,
	query,
	setDoc,
	where,
	doc,
} from "firebase/firestore";
import {
	ref,
	uploadBytesResumable,
	deleteObject,
	getDownloadURL,
} from "firebase/storage";
import {
	AuthCredential,
	EmailAuthProvider,
	OAuthCredential,
	reauthenticateWithCredential,
	updatePassword,
} from "firebase/auth";

const ProfileInfo = () => {
	const userData = localStorage.getItem("userLogado");
	const user = JSON.parse(userData);
	const inputRef = useRef(null);
	const storageRef = ref(storage, `images/users/${user?.uid}`);
	const [image, setImage] = useState(
		user && user.URLfoto ? user.URLfoto : userPicture
	);

	const [firstName, setFirstName] = useState(user ? user.firstName : "");
	const [lastName, setLastName] = useState(user ? user.lastName : "");
	const [email, setEmail] = useState(user ? user.email : "");
	const [ddd, setDDD] = useState(user ? user.ddd : "");
	const [mobileNumber, setMobileNumber] = useState(
		user ? user.mobileNumber : ""
	);
	const [dateOfBirth, setDateOfBirth] = useState(user ? user.dateOfBirth : "");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setShowError] = useState("");

	const handleChange = async (e) => {
		e.preventDefault();

		if (validations) {
			//ALTERAÇÃO DE SENHA
			if (newPassword != "" && confirmPassword != "" && currentPassword != "") {
				const userAuth = auth.currentUser;

				console.log(userAuth);

				const credential = EmailAuthProvider.credential(
					userAuth.email,
					currentPassword
				);

				reauthenticateWithCredential(userAuth, credential)
					.then(async () => {
						updatePassword(userAuth, newPassword)
							.then(() => {
								console.log("Sua senha foi alterada com sucesso!");
								setConfirmPassword("");
								setCurrentPassword("");
								setNewPassword("");
							})
							.catch((error) => {
								console.log("Ocorreu um erro ao atualizar a senha.");
								console.error("Erro ao atualizar a senha:", error);
							});
					})
					.catch((error) => {
						setShowError(
							"Reauthentication error. Make sure the current password is correct"
						);
						console.error("Erro na reautenticação:", error);
					});
			}

			//ALTERAÇÃO DOS DADOS
			const q = query(collection(db, "users"), where("uid", "==", user?.uid));
			await getDocs(q).then((value) => {
				value.forEach(async (valueInfo) => {
					const userData = valueInfo.data();
					if (userData.uid == user.uid && user.email == userData.email) {
						let userInfo = {
							dateOfBirth: dateOfBirth ? dateOfBirth : userData.dateOfBirth,
							ddd: ddd ? ddd : userData.ddd,
							firstName: firstName ? firstName : userData.firstName,
							lastName: lastName ? lastName : userData.lastName,
							mobileNumber: mobileNumber ? mobileNumber : userData.mobileNumber,
							password: newPassword ? newPassword : userData.password,
							email: userData.email,
							uid: userData.uid,
						};
						await setDoc(doc(db, "users", valueInfo.id), userInfo)
							.then(() => {})
							.catch((error) => {
								console.log(error);
							});
					}
				});
			});

			//ALTERAÇÃO DA IMAGEM
			if (typeof image == "object") {
				const uploadTask = uploadBytesResumable(storageRef, image);
			} else {
				const deletion = deleteObject(storageRef);
			}
		}
		saveInLocalStorage();
	};
	const validations = () => {
		if (
			firstName === "" ||
			dateOfBirth === "" ||
			lastName === "" ||
			email === "" ||
			mobileNumber === ""
		) {
			setShowError("Fill in all fields");
			return false;
		}
		if (!checkBiggerAge(dateOfBirth)) {
			setShowError("User must be over 18 years old");
			return false;
		}
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*()_+])[A-Za-z\d@#$!%^&*()_+]{6,}$/;
		if (!passwordRegex.test(newPassword)) {
			setShowError(
				"Password must have at least 6 characters, 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character."
			);
			return false;
		}
		if (newPassword != confirmPassword) {
			setShowError("Passwords do not match");
			return false;
		}
	};
	async function saveInLocalStorage() {
		const q = query(collection(db, "users"), where("uid", "==", user?.uid));

		await getDocs(q).then((value) => {
			value.forEach(async (doc) => {
				const userData = doc.data();
				let user = {
					dateOfBirth: userData.dateOfBirth,
					ddd: userData.ddd,
					email: userData.email,
					firstName: userData.firstName,
					lastName: userData.lastName,
					mobileNumber: userData.mobileNumber,
					uid: userData.uid,
					URLfoto: await handleUploadImage(userData.uid),
				};

				localStorage.setItem("userLogado", JSON.stringify(user));
			});
		});
	}
	const handleUploadImage = async (id) => {
		const storageRef = storage;
		const imagemRef = ref(storageRef, `images/users/${id}`);

		const returnURL = await getDownloadURL(imagemRef)
			.then((url) => {
				return url;
			})
			.catch((error) => {
				if (error.code === "storage/object-not-found") {
					return "";
				}
			});
		return returnURL;
	};
	function checkBiggerAge(data) {
		const dataAtual = new Date();
		const dataNascimento = new Date(data);
		const idadeEmMilissegundos = dataAtual - dataNascimento;
		const idadeEmAnos = idadeEmMilissegundos / (1000 * 60 * 60 * 24 * 365.25);

		if (idadeEmAnos < 18) {
			return false;
		}
		return true;
	}
	console.log(error);
	return (
		<div className="page-wrapper-info">
			<p>Personal Information</p>
			<hr />

			<div className="user-picture-info">
				<div className="input-picture" onClick={() => inputRef.current.click()}>
					{image ? (
						<img
							src={
								typeof image === "object" ? URL.createObjectURL(image) : image
							}
						/>
					) : (
						<img src={userPicture} />
					)}
					<input
						type="file"
						name="picture"
						id="pictureID"
						style={{ display: "none" }}
						ref={inputRef}
						onChange={(e) => setImage(e.target.files[0])}
					/>
				</div>
				<div className="btns-picture-info">
					<button
						className="upload-button-info"
						onClick={() => inputRef.current.click()}
					>
						Upload
					</button>
					<button
						className="delete-button-info"
						onClick={() => {
							setImage("");
							document.getElementById("pictureID").value = "";
						}}
					>
						<img src={trashIcon} alt="icone de lixeira" />
						Delete
					</button>
				</div>
			</div>
			<form className="form-info" onSubmit={handleChange}>
				<div className="content-name-info">
					<div className="container-input-info name-info">
						<label>First Name</label>
						<input
							value={firstName}
							type="text"
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</div>
					<div className="container-input-info name-info">
						<label>Last Name</label>
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>
				</div>
				<div className="container-input-info">
					<label>Email</label>
					<input
						type="email"
						value={email}
						disabled
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<div className="container-input-info container-number-info">
						<label>Mobile Number</label>
						<div>
							<input
								type="number"
								id="dddID"
								name="ddd"
								pattern="[0-9]{2}"
								maxLength="2"
								value={ddd}
								onChange={(e) => setDDD(e.target.value)}
							/>
							<input
								type="number"
								id="numeroID"
								name="numero"
								pattern="[0-9]{8,9}"
								maxLength="9"
								value={mobileNumber}
								onChange={(e) => setMobileNumber(e.target.value)}
							/>
						</div>
					</div>
					<div className="container-input-info">
						<label>Date of Birth</label>
						<input
							type="date"
							value={dateOfBirth}
							onChange={(e) => setDateOfBirth(e.target.value)}
						/>
					</div>
				</div>
				<h3>Change Password</h3>
				<hr />
				<div className="container-input-info">
					<label>Current Password</label>
					<input
						type="password"
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
					/>
				</div>
				<div className="container-input-info">
					<label>New Password</label>
					<input
						type="password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
				</div>
				<div className="container-input-info">
					<label>Confirm Password</label>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>
				<div className="button-save-info">
					<button type="submit">Save Changes</button>
				</div>
			</form>
		</div>
	);
};

export default ProfileInfo;
