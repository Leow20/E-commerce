import React from "react";

import "./navMob.css";
import { Link, useParams } from "react-router-dom";

//Icons
import iconShop from "../../assets/icons/bag.svg";
import iconProfile from "../../assets/icons/profile(1).svg";
import iconHome from "../../assets/icons/home.svg";
import iconCategory from "../../assets/icons/categories(1).svg";
import iconShopFill from "../../assets/icons/trailing-icon.svg";
import iconProfileFill from "../../assets/icons/profile.svg";
import iconHomeFill from "../../assets/icons/home(1).svg";
import iconCategoryFill from "../../assets/icons/categories.svg";

const NavMob = ({ page }) => {
  return (
    <nav>
      {page === "/" && (
        <div className="container-nav">
          <div className="category-selected-nav">
            <Link to="/">
              <img src={iconHomeFill} alt="Icone Home" />
              <span>Home</span>
            </Link>
          </div>
          <Link to="/categories">
            <img src={iconCategory} alt="Icone Categorias" />
          </Link>
          <Link to="/profile/Personal Information">
            <img src={iconProfile} alt="Icone Perfil" />
          </Link>
          <Link to="/mybag">
            <img src={iconShop} alt="Icone Mybag" />
          </Link>
        </div>
      )}
      {page === "/categories" && (
        <div className="container-nav">
          <Link to="/">
            <img src={iconHome} alt="Icone Home" />
          </Link>
          <div className="category-selected-nav">
            <Link to="/categories">
              <img src={iconCategoryFill} alt="Icone Categorias" />
              <span>Categories</span>
            </Link>
          </div>
          <Link to="/profile/Personal Information">
            <img src={iconProfile} alt="Icone Perfil" />
          </Link>
          <Link to="/mybag">
            <img src={iconShop} alt="Icone Mybag" />
          </Link>
        </div>
      )}
      {page == `/profile` && (
        <div className="container-nav">
          <Link to="/">
            <img src={iconHome} alt="Icone Home" />
          </Link>

          <Link to="/categories">
            <img src={iconCategory} alt="Icone Categorias" />
          </Link>
          <div className="category-selected-nav">
            <Link to="/profile/Personal Information">
              <img src={iconProfileFill} alt="Icone Perfil" />
              <span>Profile</span>
            </Link>
          </div>
          <Link to="/mybag">
            <img src={iconShop} alt="Icone Mybag" />
          </Link>
        </div>
      )}
      {page === "/mybag" && (
        <div className="container-nav">
          <Link to="/">
            <img src={iconHome} alt="Icone Home" />
          </Link>

          <Link to="/categories">
            <img src={iconCategory} alt="Icone Categorias" />
          </Link>
          <Link to="/profile/Personal Information">
            <img src={iconProfile} alt="Icone Perfil" />
          </Link>
          <div className="category-selected-nav">
            <Link to="/mybag">
              <img src={iconShopFill} alt="Icone Mybag" />
              <span>MyBag</span>
            </Link>
          </div>
        </div>
      )}
      {page === "/#" && (
        <div className="container-nav">
          <Link to="/">
            <img src={iconHome} alt="Icone Home" />
          </Link>

          <Link to="/categories">
            <img src={iconCategory} alt="Icone Categorias" />
          </Link>
          <Link to="/profile/Personal Information">
            <img src={iconProfile} alt="Icone Perfil" />
          </Link>
          <div className="category-selected-nav">
            <Link to="/mybag">
              <img src={iconShop} alt="Icone Mybag" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavMob;
