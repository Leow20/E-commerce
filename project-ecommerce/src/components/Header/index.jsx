import "./header.css";
import search from "../../assets/search(1).svg";
import wishlist from "../../assets/wishlist.svg";
import perfil from "../../assets/profile.svg";
import sacola from "../../assets/bag.svg";
import logo from "../../assets/logo.png";
import notificacao from "../../assets/notification.svg";
import menu from "../../assets/leadingIcon.svg";
import addHome from "../../assets/addHomes.svg";
import { Link } from "react-router-dom";
import HeaderModal from "../HeaderModal";
import { useState } from "react";

function Header() {
	const [modal, setModal] = useState(false);
	return (
		<>
			<HeaderModal isOpen={modal} setIsOpen={setModal} />
			<div className="page-wrapper-header">
				<header className="Header">
					<div className="logo-header">
						<Link to="/">
							<img src={logo} alt="logo" />
						</Link>
					</div>
					<nav className="nav-category-header">
						<ul>
							<li>
								<Link to="/handbags">Handbags</Link>
							</li>
							<li>
								<Link to="/watches">Watches</Link>
							</li>
							<li>
								<Link to="/skincare">Skincare</Link>
							</li>
							<li>
								<Link to="/jewellery">Jewellery</Link>
							</li>
							<li>
								<Link to="/apparels">Apparels</Link>
							</li>
						</ul>
					</nav>
					<div className="search-bar-header">
						<input
							type="text"
							placeholder="Search for products or brands....."
						/>
						<img src={search} alt="lupa" id="lupa-id" />
					</div>
					<div className="icons">
						<img src={wishlist} alt="coracao" />
						<img src={perfil} alt="perfil" />
						<img src={sacola} alt="sacola" />
					</div>

					<div className="container-header-responsivo">
						<div className="logo-menu">
							<h1>Home</h1>
							<button onClick={() => setModal(true)}>
								<img src={menu} alt="menu" id="menu" />
							</button>
						</div>
						<div className="icons-responsivo">
							<img src={addHome} alt="addHome" />
							<img src={search} alt="lupa" />
							<img src={notificacao} alt="notificacao" />
						</div>
					</div>
				</header>
			</div>
		</>
	);
}

export default Header;
