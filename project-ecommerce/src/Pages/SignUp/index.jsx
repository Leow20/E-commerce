import React, { useState } from "react";
import "./signup.css";



const SignUp = () => {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [mobileNumber, setMobileNumber] = useState("")
	const [dateOfBirth, setDateOfBirth] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")





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
			<button type="submit">Save</button>
		</form>


	</div >;
};

export default SignUp;
