import { useState } from "react";
import "./signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebaseConnection";
import { addDoc, collection } from "firebase/firestore";

const SignUp = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [mobileNumber, setMobileNumber] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	function validateFields() {
		if (firstName.trim() === "") {
			alert("Preencha o campo de primeiro nome.");
			return false;
		}

		if (lastName.trim() === "") {
			alert("Preencha o campo de sobrenome.");
			return false;
		}

		if (email.trim() === "") {
			alert("Preencha o campo de email.");
			return false;
		}

		// Verificar se o email é válido utilizando uma expressão regular
		const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			alert("Insira um email válido.");
			return false;
		}

		if (mobileNumber.trim() === "") {
			alert("Preencha o campo de número de telefone.");
			return false;
		}

		// Verificar se o número de telefone possui apenas dígitos
		const mobileNumberRegex = /^\d+$/;
		if (!mobileNumberRegex.test(mobileNumber)) {
			alert("Insira um número de telefone válido.");
			return false;
		}

		if (dateOfBirth.trim() === "") {
			alert("Preencha o campo de data de nascimento.");
			return false;
		}

		if (password === "") {
			alert("Preencha o campo de senha.");
			return false;
		}
		//Verificando a senha tem os campos para senha forte
		const passwordRegex =
			/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;
		if (!passwordRegex.test(password)) {
			alert(
				"A senha deve conter uma letra maúscula, e um caracter e pelo menos 6 digitos."
			);
			return false;
		}

		if (confirmPassword === "") {
			alert("Preencha o campo de confirmação de senha.");
			return false;
		}

		if (password !== confirmPassword) {
			alert("As senhas não coincidem.");
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
				})
				.catch((error) => {
					if (error.code === "auth/weak-password") {
						alert("Senha muito fraca.");
					} else if (error.code === "auth/email-already-in-use") {
						alert("Email já existente.");
					}
				});
		}
	};

	async function addUser(id) {
		await addDoc(collection(db, "users"), {
			firstName: firstName,
			lastName: lastName,
			email: email,
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
		<div>
			<div className="cadastro-container">
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
						value={lastName}
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
						value={email}
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
						value={mobileNumber}
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
						value={dateOfBirth}
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
						value={password}
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
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Cadastre-se</button>
			</form>
		</div>
	);
};

export default SignUp;
