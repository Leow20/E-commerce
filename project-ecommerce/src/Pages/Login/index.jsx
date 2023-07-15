import React, { useState } from "react";

//Style
import "./login.css";

//Router-dom
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebaseConnection";
import { collection, getDocs, query, where } from "@firebase/firestore";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const navigate = useNavigate("");

	async function handleLogin(e) {
		e.preventDefault();
		if (email === "" || password == "") {
			setPasswordError("Fill in all fields");
		} else {
			await signInWithEmailAndPassword(auth, email, password)
				.then(async (user) => {
					const userUid = user.user.uid;
					const q = query(collection(db, "users"), where("uid", "==", userUid));

					await getDocs(q).then((value) => {
						value.forEach((doc) => {
							const userData = doc.data();
							localStorage.setItem("userLogado", JSON.stringify(userData));
						});
					});
					setPasswordError("");
					navigate("/");
				})
				.catch((error) => {
					if (error.code === "auth/wrong-password") {
						setPasswordError(
							"Wow, invalid username or password. Please, try again!"
						);
					} else if (error.code === "auth/user-not-found") {
						setPasswordError("User not found");
					}
				});
		}
	}

	return (
		<main className="login-page">
			<div className="gradient-top-login"></div>
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
								type="email"
								name="emailInput"
								id="emailId"
								style={
									passwordError == "User not found" ||
									(passwordError ==
										"Wow, invalid username or password. Please, try again!" &&
										email != "") ||
									(passwordError == "Fill in all fields" && email == "")
										? { border: "1px solid red" }
										: {}
								}
								placeholder="Email"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									setPasswordError("");
								}}
							/>
							<span
								style={
									passwordError == "User not found" ||
									(passwordError ==
										"Wow, invalid username or password. Please, try again!" &&
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
								type="password"
								name="passwordInput"
								id="passwordId"
								style={
									(passwordError ==
										"Wow, invalid username or password. Please, try again!" &&
										password != "") ||
									(passwordError == "Fill in all fields" && password == "")
										? { border: "1px solid red" }
										: {}
								}
								value={password}
								placeholder="Password"
								onChange={(e) => {
									setPassword(e.target.value);
									setPasswordError("");
								}}
							/>
							<span
								style={
									passwordError ==
										"Wow, invalid username or password. Please, try again!" &&
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
						</div>
						{passwordError != "" && (
							<p className={passwordError ? "error-login" : ""}>
								{passwordError}
							</p>
						)}
						<button type="submit">Login</button>
						<label className="have-acount-login">
							Don't have an account yet? <Link to="/signup">Register</Link>
						</label>
					</form>
				</div>
			</div>
			<div className="gradient-bottom-login"></div>
		</main>
	);
};

export default Login;
