import React from "react";

import "./navMob.css";
import { Link } from "react-router-dom";

//Icons
import iconShop from "../../assets/icons/bag.svg";
import iconProfile from "../../assets/icons/profile(1).svg";
import iconHome from "../../assets/icons/home.svg";
import iconCategory from "../../assets/icons/categories(1).svg";
import iconShopFill from "../../assets/icons/trailing-icon.svg";
import iconProfileFill from "../../assets/icons/profile.svg";
import iconHomeFill from "../../assets/icons/home(1).svg";
import iconCategoryFill from "../../assets/icons/categories.svg";

const NavMob = () => {
  const urlCompleta = window.location.href;
  const dominio = window.location.origin;
  const page = urlCompleta.replace(dominio, "");

  return (
    <div>
      {page === "/" && (
        <div className="container-nav">
          <div className="category-selected-nav">
            <img src={iconHomeFill} alt="Icone Home" />

            <span>Home</span>
          </div>
          <img src={iconCategory} alt="Icone Home" />
          <a to="/profile">
            <img src={iconHome} alt="Icone Home" />
          </a>
          <img src={iconShop} alt="Icone Home" />
        </div>
      )}
      {page === "/categories" && (
        <div className="container-nav">
          <img src={iconHome} alt="Icone Home" />
          <div className="category-selected-nav">
            <img src={iconCategoryFill} alt="Icone Home" />
            <span>Categories</span>
          </div>
          <img src={iconProfile} alt="Icone Home" />
          <img src={iconShop} alt="Icone Home" />
        </div>
      )}
      {page === "/profile" && (
        <div className="container-nav">
          <Link to="/profile">
            <img src={iconHome} alt="Icone Home" />
          </Link>

          <img src={iconCategory} alt="Icone Home" />
          <div className="category-selected-nav">
            <img src={iconProfileFill} alt="Icone Home" />
            <span>Profile</span>
          </div>
          <img src={iconShop} alt="Icone Home" />
        </div>
      )}
      {page === "/mybag" && (
        <div className="container-nav">
          <img src={iconHome} alt="Icone Home" />
          <img src={iconCategory} alt="Icone Home" />
          <img src={iconProfile} alt="Icone Home" />
          <div className="category-selected-nav">
            <img src={iconShopFill} alt="Icone Home" />

            <span>MyBag</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavMob;
