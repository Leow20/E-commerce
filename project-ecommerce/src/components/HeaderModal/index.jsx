//React
import { useState } from "react";

//Style
import "./headerModal.css";

//Router-dom
import { Link, useNavigate } from "react-router-dom";

//Images
import arrowBlack from "../../assets/HeaderModal/arrow-right-black.svg";
import arrowGray from "../../assets/HeaderModal/arrow-right-gray.svg";
import userNotPicture from "../../assets/HeaderModal/user-sem-foto.png";

const HeaderModal = ({ isOpen, setIsOpen, id = "headerModalId" }) => {
	const [animation, setAnimation] = useState(
		"content-header-modal animation-header-modal"
	);
	const user = JSON.parse(localStorage.getItem("userLogado"));
	const navigate = useNavigate("");

	const handleBackClick = (e) => {
		e.preventDefault();

		if (e.target.id !== id) {
			return;
		} else {
			setIsOpen(false);
		}
	};
	addEventListener("scroll", () => setIsOpen(false));

	if (isOpen) {
		return (
			<div id={id} className="header-modal" onClick={handleBackClick}>
				<div className={animation}>
					<div className="profile-header-modal">
						<button onClick={() => navigate("/profile")}>
							<div>
								<img
									src={user && user.URLfoto ? user.URLfoto : userNotPicture}
									alt="User"
									id="imgUserId"
								/>
								<h1>
									Hello
									{user && user.firstName && user.lastName
										? ", " + user.firstName + " " + user.lastName
										: ""}
								</h1>
							</div>
							<img src={arrowBlack} alt="arrow-icon" />
						</button>
					</div>
					<hr />
					<nav className="categories-header-modal">
						<h2>Top Categories</h2>
						<ul>
							<li>
								<Link to="/skincare">
									<label>Skincare</label>
									<img src={arrowGray} alt="arrow-icon" />
								</Link>
							</li>
							<li>
								<Link to="/apparels">
									<label>Apparels</label>
									<img src={arrowGray} alt="arrow-icon" />
								</Link>
							</li>
							<li>
								<Link to="/jewellery">
									<label>Jewellery</label>
									<img src={arrowGray} alt="arrow-icon" />
								</Link>
							</li>
							<li>
								<Link to="/handbags">
									<label>Handbags</label>
									<img src={arrowGray} alt="arrow-icon" />
								</Link>
							</li>
							<li>
								<Link to="">
									<label>Eyeware</label>
									<img src={arrowGray} alt="arrow-icon" />
								</Link>
							</li>
							<li>
								<Link to="">
									<label>Fragrance</label>
									<img src={arrowGray} alt="arrow-icon" />
								</Link>
							</li>
							<li>
								<Link to="/watches">
									<label>Watches</label>
									<img src={arrowGray} alt="arrow-icon" />
								</Link>
							</li>
							<li>
								<Link to="/about">
									<label>About</label>
									<img src={arrowGray} alt="arrow-icon" />
								</Link>
							</li>
						</ul>
					</nav>
					<hr />
					<nav className="contact-header-mobile">
						<h2>Contact Us</h2>
						<ul>
							<li>
								<Link>
									<label>Help & Support</label>
									<img src={arrowBlack} alt="arrow-icon" />
								</Link>
							</li>
							<li>
								<Link>
									<label>Feedback & Suggestions</label>
									<img src={arrowBlack} alt="arrow-icon" />
								</Link>
							</li>
							<li>
								<Link>
									<label>Visit Websites</label>
									<img src={arrowBlack} alt="arrow-icon" />
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		);
	}
};

export default HeaderModal;
