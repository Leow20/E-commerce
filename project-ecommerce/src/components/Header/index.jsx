//Style
import "./header.css";

//Router-dom
import { Link } from "react-router-dom";
import HeaderModal from "../HeaderModal";
import SearchModal from "../SearchModal";
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
import MyBagModal from "../myBagModal";

function Header({ Page }) {
  const [modal, setModal] = useState(false);
  const [isHovered, setIsHovered] = useState();
  const [searchMod, setSearchMod] = useState();

  const urlCompleta = window.location.href;
  const dominio = window.location.origin;
  const page = urlCompleta.replace(dominio, "");

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  const handleSearch = () => {
    setSearchMod(!searchMod);
    document.body.style.overflowY = "hidden";
  };

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
                <Link to="/results/handbags">Handbags</Link>
              </li>
              <li>
                <Link to="/results/watches">Watches</Link>
              </li>
              <li>
                <Link to="/results/skincare">Skincare</Link>
              </li>
              <li>
                <Link to="/results/jewellery">Jewellery</Link>
              </li>
              <li>
                <Link to="/results/apparels">Apparels</Link>
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
          <div className="icons-header">
            <Link to="/profile/My Wishlist">
              <img src={wishlist} alt="coracao" />
            </Link>

            <Link to="/profile/Personal Information">
              <img src={perfil} alt="perfil" />
            </Link>

            {page != "/mybag" && (
              <Link to="/mybag">
                <img src={sacola} alt="sacola" />
                <div className="container-bag-icon" onMouseEnter={handleHover}>
                  {" "}
                  <img src={sacola} alt="sacola" />
                </div>
              </Link>
            )}

            {page == "/mybag" && (
              <Link to="/mybag">
                <img src={sacola} alt="sacola" />
                <div className="container-bag-icon">
                  {" "}
                  <img src={sacola} alt="sacola" />
                </div>
              </Link>
            )}
          </div>

          <MyBagModal hover={isHovered} />

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

              <button onClick={handleSearch}>
                <img src={search} alt="lupa" />
              </button>

              <Link to="/notification">
                <img src={notificacao} alt="notificacao" />
              </Link>
            </div>
          </div>
        </header>
        {searchMod && <SearchModal closeModal={setSearchMod} />}
      </div>
    </>
  );
}

export default Header;
