//React
import { useState } from "react";

//Style
import "./signup.css";

//Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebaseConnection";
import { addDoc, collection } from "firebase/firestore";

const SignUp = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [mobileNumber, setMobileNumber] = useState("");
	const [dddNumber, setdddNumber] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [showError, setShowError] = useState("");

	function validateFields() {
		if (
			firstName === "" ||
			dateOfBirth === "" ||
			lastName === "" ||
			email === "" ||
			mobileNumber === "" ||
			password === "" ||
			confirmPassword === ""
		) {
			setShowError("Fill in all fields");
			return false;
		}

		// Verificar se o email é válido utilizando uma expressão regular
		const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
		if (!emailRegex.test(email)) {
			setShowError("Enter a valid email address");
			return false;
		}

		if (!checkBiggerAge(dateOfBirth)) {
			setShowError("User must be over 18 years old");
			return false;
		}

		//Verificando a senha tem os campos para senha forte
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
		if (!passwordRegex.test(password)) {
			setShowError(
				"Password must contain one capital letter, one special character and 6 numbers"
			);
			return false;
		}

		if (password !== confirmPassword) {
			setShowError("Passwords do not match");
			return false;
		}

		return true;
	}
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

	const handleSignUp = async (e) => {
		e.preventDefault();
		// Validação dos campos antes de prosseguir
		if (!validateFields()) {
			return;
		} else {
			await createUserWithEmailAndPassword(auth, email, password)
				.then((user) => {
					addUser(user.user.uid);
					setEmail("");
					setPassword("");
					setConfirmPassword("");
					setDateOfBirth("");
					setFirstName("");
					setLastName("");
					setMobileNumber("");
					setdddNumber("");
				})
				.catch((error) => {
					if (error.code === "auth/email-already-in-use") {
						setShowError("Email already exists");
					}
				});
		}
	};

	async function addUser(id) {
		await addDoc(collection(db, "users"), {
			firstName: firstName,
			lastName: lastName,
			email: email,
			ddd: dddNumber,
			mobileNumber: mobileNumber,
			dateOfBirth: dateOfBirth,
			password: password,
			uid: id,
		})
			.then(() => {
				console.log("cadastrou");
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<div className="cadastro-container">
			<div>
				<h2>Faça o seu cadastro</h2>
			</div>
			<form onSubmit={handleSignUp}>
				<div className="form-group">
					<label htmlFor="firstName">First Name:</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						value={firstName}
						onChange={(e) => {
							setShowError("");
							setFirstName(e.target.value);
						}}
						style={
							firstName == "" && showError == "Fill in all fields"
								? { border: "1px solid red" }
								: {}
						}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="lastName">Last Name:</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						value={lastName}
						onChange={(e) => {
							setShowError("");
							setLastName(e.target.value);
						}}
						style={
							lastName == "" && showError == "Fill in all fields"
								? { border: "1px solid red" }
								: {}
						}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={(e) => {
							setShowError("");
							setEmail(e.target.value);
						}}
						style={
							(email == "" && showError == "Fill in all fields") ||
							(email != "" && showError == "Enter a valid email address") ||
							(email != "" && showError == "Email already exists")
								? { border: "1px solid red" }
								: {}
						}
					/>
					<p>
						{(email != "" && showError == "Enter a valid email address") ||
						(email != "" && showError == "Email already exists")
							? showError
							: ""}
					</p>
				</div>
				<div className="form-group">
					<label htmlFor="mobileNumber">DDD:</label>
					<input
						type="ddd"
						id="mobileNumberDDD"
						name="mobileNumberDDD"
						pattern="[0-9]{2}"
						maxLength="2"
						value={dddNumber}
						onChange={(e) => {
							setShowError("");
							setdddNumber(e.target.value);
						}}
						style={
							dddNumber == "" && showError == "Fill in all fields"
								? { border: "1px solid red" }
								: {}
						}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="mobileNumber">Mobile Number:</label>
					<input
						type="tel"
						id="mobileNumber"
						name="mobileNumber"
						value={mobileNumber}
						onChange={(e) => {
							setShowError("");
							setMobileNumber(e.target.value);
						}}
						style={
							mobileNumber == "" && showError == "Fill in all fields"
								? { border: "1px solid red" }
								: {}
						}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="dateOfBirth">Date of Birth:</label>
					<input
						type="date"
						id="dateOfBirth"
						name="dateOfBirth"
						value={dateOfBirth}
						onChange={(e) => {
							setShowError("");
							setDateOfBirth(e.target.value);
						}}
						style={
							(dateOfBirth == "" && showError == "Fill in all fields") ||
							(dateOfBirth != "" &&
								showError == "User must be over 18 years old")
								? { border: "1px solid red" }
								: {}
						}
					/>
					<p>
						{dateOfBirth != "" &&
							showError == "User must be over 18 years old" &&
							showError}
					</p>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(e) => {
							setShowError("");
							setPassword(e.target.value);
						}}
						style={
							(password == "" && showError == "Fill in all fields") ||
							(password != "" &&
								showError ==
									"Password must contain one capital letter, one special character and 6 numbers") ||
							(password != "" && showError == "Passwords do not match")
								? { border: "1px solid red" }
								: {}
						}
					/>
					<p>
						{password != "" &&
							showError ==
								"Password must contain one capital letter, one special character and 6 numbers" &&
							showError}
					</p>
				</div>
				<div className="form-group">
					<label htmlFor="confirmPassword">Confirm Password:</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						value={confirmPassword}
						onChange={(e) => {
							setShowError("");
							setConfirmPassword(e.target.value);
						}}
						style={
							(confirmPassword == "" && showError == "Fill in all fields") ||
							(confirmPassword != "" && showError == "Passwords do not match")
								? { border: "1px solid red" }
								: {}
						}
					/>
					<p>
						{confirmPassword != "" &&
							password != "" &&
							showError == "Passwords do not match" &&
							showError}
					</p>
				</div>
				<p>
					{(firstName == "" ||
						lastName == "" ||
						dateOfBirth == "" ||
						mobileNumber == "" ||
						dddNumber == "" ||
						password == "" ||
						confirmPassword == "" ||
						email == "") &&
						showError == "Fill in all fields" &&
						showError}
				</p>
				<button type="submit">Cadastre-se</button>
			</form>
		</div>
	);
};

export default SignUp;
