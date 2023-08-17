//React
import { useRef, useState } from "react";

//Style
import "./signup.css";

//Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../../../firebaseConnection";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";

//Router-dom
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//React Icons
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

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
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const inputRef = useRef(null);
	const [image, setImage] = useState(null);

	const navigate = useNavigate();

	if (
		firstName != "" &&
		lastName != "" &&
		dateOfBirth != "" &&
		mobileNumber != "" &&
		dddNumber != "" &&
		password != "" &&
		confirmPassword != "" &&
		email != "" &&
		showError == "Fill in all fields"
	) {
		setShowError("");
	}

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

		const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
		if (!emailRegex.test(email)) {
			setShowError("Enter a valid email address");
			return false;
		}

		if (!checkBiggerAge(dateOfBirth)) {
			setShowError("User must be over 18 years old");
			return false;
		}

		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*()_+])[A-Za-z\d@#$!%^&*()_+]{6,}$/;
		if (!passwordRegex.test(password)) {
			setShowError(
				"Password must have at least 6 characters, 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character."
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
					toast.success("Successfully registered user");
					navigate("/login");
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
			uid: id,
		})
			.then(() => { })
			.catch((error) => {
				console.log(error);
			});
		if (image) {
			const storageRef = ref(storage, `images/users/${id}`);
			const uploadTask = uploadBytesResumable(storageRef, image);
		}
	}
	return (
		<main className="signup-page">
			<div className="container-signup">
				<div className="box-text-signup">
					<h1>Welcome!</h1>
					<p>Please enter your credentials to create your account.</p>
				</div>
				<form onSubmit={handleSignUp}>
					<div className="box-one-signup">
						<div className="container-img-upload">
							<div
								className="img-input"
								onClick={() => inputRef.current.click()}
							>
								{image ? (
									<img src={URL.createObjectURL(image)} alt="" />
								) : (
									<img src="./user-sem-foto.png" alt="" />
								)}
								<input
									type="file"
									name="inputFileFoto"
									id="perfilID"
									ref={inputRef}
									onChange={(e) => setImage(e.target.files[0])}
								/>
								<div className="icon-edit-signup">
									<BiEditAlt color="#1b4b66" />
								</div>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="firstName">First Name:</label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								value={firstName}
								onChange={(e) => {
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
									if (
										(email != "" &&
											showError == "Enter a valid email address") ||
										(email != "" && showError == "Email already exists")
									)
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
							{(email != "" && showError == "Enter a valid email address") ||
								(email != "" && showError == "Email already exists") ? (
								<p>{showError}</p>
							) : null}
						</div>
					</div>
					<div className="box-two-signup">
						<div className="form-group">
							<label htmlFor="mobileNumber">Mobile Number</label>
							<div>
								<input
									type="ddd"
									id="mobileNumberDDD"
									name="mobileNumberDDD"
									pattern="[0-9]{2}"
									maxLength="2"
									value={dddNumber}
									onChange={(e) => {
										setdddNumber(e.target.value);
									}}
									style={
										dddNumber == "" && showError == "Fill in all fields"
											? { border: "1px solid red" }
											: {}
									}
								/>
								<input
									type="tel"
									id="mobileNumber"
									name="mobileNumber"
									value={mobileNumber}
									onChange={(e) => {
										setMobileNumber(e.target.value);
									}}
									style={
										mobileNumber == "" && showError == "Fill in all fields"
											? { border: "1px solid red" }
											: {}
									}
								/>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="dateOfBirth">Date of Birth:</label>
							<input
								type="date"
								id="dateOfBirth"
								name="dateOfBirth"
								value={dateOfBirth}
								onChange={(e) => {
									if (
										dateOfBirth != "" &&
										showError == "User must be over 18 years old"
									)
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
							{dateOfBirth != "" &&
								showError == "User must be over 18 years old" && (
									<p>{showError}</p>
								)}
						</div>
						<div className="form-group">
							<label htmlFor="password">Password:</label>
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								name="password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								style={
									(password == "" && showError == "Fill in all fields") ||
										(password != "" &&
											showError ==
											"Password must have at least 6 characters, 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character.") ||
										(password != "" && showError == "Passwords do not match")
										? { border: "1px solid red" }
										: {}
								}
							/>
							<div
								className="showPassword-signup"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <BsEyeSlash /> : <BsEye />}
							</div>
							{password != "" &&
								showError ==
								"Password must have at least 6 characters, 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character." && (
									<p>{showError}</p>
								)}
						</div>
						<div className="form-group">
							<label htmlFor="confirmPassword">Confirm Password:</label>
							<input
								type={showConfirmPassword ? "text" : "password"}
								id="confirmPassword"
								name="confirmPassword"
								value={confirmPassword}
								onChange={(e) => {
									setConfirmPassword(e.target.value);
								}}
								style={
									(confirmPassword == "" &&
										showError == "Fill in all fields") ||
										(confirmPassword != "" &&
											showError == "Passwords do not match")
										? { border: "1px solid red" }
										: {}
								}
							/>
							<div
								className="showPassword-signup"
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							>
								{showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
							</div>

							{confirmPassword != "" &&
								password != "" &&
								showError == "Passwords do not match" && <p>{showError}</p>}
						</div>
					</div>

					{(firstName == "" ||
						lastName == "" ||
						dateOfBirth == "" ||
						mobileNumber == "" ||
						dddNumber == "" ||
						password == "" ||
						confirmPassword == "" ||
						email == "") &&
						showError == "Fill in all fields" && <p>{showError} </p>}

					<div className="btn-and-link-signup">
						<button type="submit" id="submitSignupId">
							Sign Up
						</button>
						<span>
							Already have an account? <Link to="/login">Login now</Link>
						</span>
					</div>
				</form>
			</div>
		</main>
	);
};

export default SignUp;
