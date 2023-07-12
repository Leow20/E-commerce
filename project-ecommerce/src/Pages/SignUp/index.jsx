import React, { useState } from "react";
import "./signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConnection";


const SignUp = () => {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [mobileNumber, setMobileNumber] = useState("")
	const [dateOfBirth, setDateOfBirth] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	async function cadastro() {
		await createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				console.log("Cadastro realizado com sucesso!");

				setEmail('')
				setPassword('')
			})
			.catch((error) => {
				if (error.code === 'auth/wake-password') {
					alert("Senha muito fraca.")

				} else if (error.code === 'auth/email-already-in-use') {
					alert("Email já existente.")
				}
			})
	}



	return <div>
		<div className="cadastro-container">
			<h2>Faça o seu cadastro</h2>
		</div>
		<form onSubmit>

			<div className="form-group">
				<label htmlFor="firstName">First Name:</label>
				<input
					type="text"
					id="firstName"
					name="firstName"
					onChange={(e) => setFirstName(e.target.value)}
					required
				/>
			</div>
			<div className="form-group">
				<label htmlFor="lastName">Last Name:</label>
				<input
					type="text"
					id="lastName"
					name="lastName"
					onChange={(e) => setLastName(e.target.value)}
					required
				/>
			</div>
			<div className="form-group">
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					id="email"
					name="email"
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>
			<div className="form-group">
				<label htmlFor="mobileNumber">Mobile Number:</label>
				<input
					type="tel"
					id="mobileNumber"
					name="mobileNumber"
					onChange={(e) => setMobileNumber(e.target.value)}
					required
				/>
			</div>
			<div className="form-group">
				<label htmlFor="dateOfBirth">Date of Birth:</label>
				<input
					type="date"
					id="dateOfBirth"
					name="dateOfBirth"
					onChange={(e) => setDateOfBirth(e.target.value)}
					required
				/>
			</div>
			<div className="form-group">
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					name="password"
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</div>
			<div className="form-group">
				<label htmlFor="confirmPassword">Confirm Password:</label>
				<input
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
			</div>
			<button onClick={cadastro}>Cadastre-se</button>
		</form>


	</div >;
};

export default SignUp;
