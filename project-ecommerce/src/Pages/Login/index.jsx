import React, { useState } from "react";

//Style
import "./login.css";

//Router-dom
import { Link } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleLogin = (e) => {
		e.preventDefault();
	};
	return (
		<main className="login-page">
			<div className="gradient-top-login"></div>
			<div className="container-login">
				<div className="box-login">
					<div className="box-text-login">
						<h1>Welcome!</h1>
						<p>Please enter your credentials to access your account.</p>
					</div>
					<form onSubmit={() => handleLogin}>
						<div>
							<input
								type="text"
								name="emailInput"
								id="emailId"
								onChange={(e) => setEmail(e.target.value)}
								required="requerid"
							/>
							<span>Email</span>
						</div>
						<div>
							<input
								type="password"
								name="passwordInput"
								id="passwordId"
								onChange={(e) => setPassword(e.target.value)}
								required="requerid"
							/>
							<span>Password</span>
						</div>
						<button type="submit">Login</button>
						<label className="have-acount-login">
							Don't have an account yet? <Link>Register</Link>
						</label>
					</form>
				</div>
			</div>
			<div className="gradient-bottom-login"></div>
		</main>
	);
};

export default Login;
