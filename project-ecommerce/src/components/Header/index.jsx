import "./header.css";
import search from "../../assets/search.svg"
import wishlist from "../../assets/wishlist.svg";
import perfil from "../../assets/profile.svg";
import sacola from "../../assets/bag.svg";
import logo from "../../assets/logo.png";


function Header() {
    return (
        <header className="Header">
            <div className="logo-header">
                <img src={logo} alt="logo" />
            </div>
            <nav className="nav-category-header">
                <ul>
                    <li><a href="#">Handbags</a></li>
                    <li><a href="#">Watches</a></li>
                    <li><a href="#">Skincare</a></li>
                    <li><a href="#">Jewellery</a></li>
                    <li><a href="#">Apparels</a></li>
                </ul>
            </nav>
            <div className="search-bar-header">
                <input type="text" placeholder="Search for products or brands....." />
                <img src={search} alt="lupa" id="lupa-id" />
            </div>
            <div className="icons">
                <img src={wishlist} alt="coracao" />
                <img src={perfil} alt="perfil" />
                <img src={sacola} alt="sacola" />

            </div>
        </header>
    );
}

export default Header;