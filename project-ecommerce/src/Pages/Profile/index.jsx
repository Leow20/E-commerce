import React from "react";

//Styles
import "./profile.css";

//Images
import userNotPicture from "../../assets/HeaderModal/user-sem-foto.png";
import arrowBlack from "../../assets/HeaderModal/arrow-right-black.svg";
import arrowGray from "../../assets/HeaderModal/arrow-right-gray.svg";

//Icons
import logoutIcon from "../../assets/icons/logout.svg";
import blackArrow from "../../assets/icons/blackArrow.svg";

import { Link } from "react-router-dom";

//components
import NavMob from "../../components/NavMob";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Profile = () => {
  return (
    <>
      <Header />
      <div className="page-wrapper-profile">
        <div className="container-addres-profile">
          <span>Home</span>
          <img src={blackArrow} alt="icone seta" />
          <span>User Profile</span>
        </div>
        <main className="main-profile">
          <h1>Profile</h1>
          <div className="title-profile">
            <span>Selected tab</span>
            <div>
              <button
                className="button-logout-profile "
                id="button-logout-desktop-profile"
              >
                {" "}
                <img src={logoutIcon} alt="icone de logout" />
                Logout
              </button>
            </div>
          </div>

          <div className="container-info-profile">
            <img src={userNotPicture} alt="usuario sem foto" />
            <div>
              <p>Tina Vargayee</p>
              <p>tinavar@vinho.com</p>
              <p>+85-5478564</p>
            </div>
            <img src={arrowGray} alt="icone seta" />
          </div>
          <nav className="categories-page-profile">
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
                <Link to="">
                  <label>My saved Cards</label>
                  <img src={arrowGray} alt="arrow-icon" />
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <button
              className="button-logout-profile"
              id="button-logout-mob-profile"
            >
              {" "}
              <img src={logoutIcon} alt="icone de logout" />
              Logout
            </button>
          </div>
          <NavMob />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
