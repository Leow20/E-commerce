//Style
import "./header.css";

//Router-dom
import { Link } from "react-router-dom";
import HeaderModal from "../HeaderModal";
import { useState } from "react";

//Images
import search from "../../assets/imgHeader/search(1).svg";
import wishlist from "../../assets/imgHeader/wishlist.svg";
import perfil from "../../assets/imgHeader/profile.svg";
import sacola from "../../assets/imgHeader/bag.svg";
import logo from "../../assets/imgHeader/logo.png";
import notificacao from "../../assets/imgHeader/notification.svg";
import menu from "../../assets/imgHeader/leadingIcon.svg";
import addHome from "../../assets/imgHeader/addHomes.svg";

function Header({ Page }) {
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
							type="search"
							name="searchInput"
							id="searchId"
							placeholder="Search for products or brands....."
						/>
					</div>
					<div className="icons">
						<Link to="/wishlist">
							<img src={wishlist} alt="coracao" />
						</Link>

						<Link to="/profile">
							<img src={perfil} alt="perfil" />
						</Link>

						<button>
							<img src={sacola} alt="sacola" />
						</button>
					</div>

					<div className="container-header-responsivo">
						<div className="logo-menu">
							<h1>{Page}</h1>
							<button onClick={() => setModal(true)}>
								<img src={menu} alt="menu" id="menu" />
							</button>
						</div>
						<div className="icons-responsivo">
							<Link to="/">
								<img src={addHome} alt="addHome" />
							</Link>

							<button>
								<img src={search} alt="lupa" />
							</button>

							<Link to="/notification">
								<img src={notificacao} alt="notificacao" />
							</Link>
						</div>
					</div>
				</header>
			</div>
		</>
	);
}

export default Header;
