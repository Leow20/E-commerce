import React, { useState } from "react";

//Style
import "./login.css";

//Router-dom
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../../../firebaseConnection";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

//React Icons
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate("");
	const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	async function handleLogin(e) {
		e.preventDefault();
		if (email === "" || password == "") {
			setError("Fill in all fields");
		} else if (!regexEmail.test(email)) {
			setError("Invalid email address");
		} else {
			await signInWithEmailAndPassword(auth, email, password)
				.then(async (user) => {
					const userUid = user.user.uid;
					const q = query(collection(db, "users"), where("uid", "==", userUid));

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
					setError("");
					navigate("/");
				})
				.catch((error) => {
					if (error.code === "auth/wrong-password") {
						setError("Wow, invalid email or password. Please, try again!");
					} else if (error.code === "auth/user-not-found") {
						setError("User not found");
					}
				});
		}
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

	return (
		<main className="login-page">
			<div className="container-login">
				<div className="box-login">
					<div className="box-text-login">
						<h1>Welcome!</h1>
						<p>Please enter your credentials to access your account.</p>
					</div>
					<form onSubmit={handleLogin}>
						<div>
							<input
								className="input-login"
								type="text"
								name="emailInput"
								id="emailId"
								style={
									error == "User not found" ||
									(error ==
										"Wow, invalid email or password. Please, try again!" &&
										email != "") ||
									(error == "Fill in all fields" && email == "") ||
									(email != "" && error == "Invalid email address")
										? { border: "1px solid red" }
										: {}
								}
								placeholder="Email"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									if (error != "Fill in all fields" && email != "")
										setError("");
								}}
							/>
							<span
								style={
									error == "User not found" ||
									(error ==
										"Wow, invalid email or password. Please, try again!" &&
										email != "")
										? {
												borderLeft: "1px solid red",
												borderRight: "1px solid red",
										  }
										: {}
								}
							>
								Email
							</span>
						</div>
						<div>
							<input
								className="input-login"
								type={showPassword ? "text" : "password"}
								name="passwordInput"
								id="passwordId"
								style={
									(error ==
										"Wow, invalid email or password. Please, try again!" &&
										password != "") ||
									(error == "Fill in all fields" && password == "")
										? { border: "1px solid red" }
										: {}
								}
								value={password}
								placeholder="Password"
								onChange={(e) => {
									setPassword(e.target.value);
									if (
										error ==
											"Wow, invalid email or password. Please, try again!" &&
										password != ""
									)
										setError("");
								}}
							/>
							<span
								style={
									error ==
										"Wow, invalid email or password. Please, try again!" &&
									password != ""
										? {
												borderLeft: "1px solid red",
												borderRight: "1px solid red",
										  }
										: {}
								}
							>
								Password
							</span>
							<div
								className="showPassword"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <BsEyeSlash /> : <BsEye />}
							</div>
						</div>
						{error != "" && (
							<p className={error ? "error-login" : ""}>{error}</p>
						)}
						<button type="submit">Login</button>
						<label className="have-acount-login">
							Don't have an account yet? <Link to="/signup">Register</Link>
						</label>
					</form>
				</div>
			</div>
		</main>
	);
};

export default Login;
