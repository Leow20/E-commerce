//Style
import "./headerModal.css";

//Router-dom
import { Link } from "react-router-dom";

//Images
import arrowBlack from "../../assets/HeaderModal/arrow-right-black.svg";
import arrowGray from "../../assets/HeaderModal/arrow-right-gray.svg";
import userNotPicture from "../../assets/HeaderModal/user-sem-foto.png";

const HeaderModal = ({ isOpen, setIsOpen, id = "headerModalId" }) => {
	const handleBackClick = (e) => {
		if (e) e.preventDefault();
		if (e.target.id !== id) {
			return;
		} else {
			addEventListener("scroll", () => setIsOpen(false));
			setIsOpen(false);
		}
	};
	if (isOpen) {
		return (
			<div id={id} className="header-modal" onClick={handleBackClick}>
				<div className="content-header-modal">
					<div className="profile-header-modal">
						<button>
							<div>
								<img src={userNotPicture} alt="User" id="imgUserId" />
								<h1>Hello </h1>
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
