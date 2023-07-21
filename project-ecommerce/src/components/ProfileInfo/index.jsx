import React, { useState } from "react";

//Style
import "./ProfileInfo.css";

//images
import userPicture from "../../assets/HeaderModal/user-sem-foto.png";

//Icons
import trashIcon from "../../assets/icons/trashIcon.svg";

const ProfileInfo = () => {
	const userData = localStorage.getItem("userLogado");
	const user = JSON.parse(userData);

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

	return (
		<div className="page-wrapper-info">
			<p>Personal Information</p>
			<hr />

			<div className="user-picture-info">
				<img
					src={user && user.URLfoto ? user.URLfoto : userPicture}
					alt="usuario sem foto"
				/>
				<div>
					<button className="upload-button-info">Upload</button>
					<button className="delete-button-info">
						<img src={trashIcon} alt="icone de lixeira" />
						Delete
					</button>
				</div>
			</div>
			<form className="form-info">
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
					<button>Save Changes</button>
				</div>
			</form>
		</div>
	);
};

export default ProfileInfo;
