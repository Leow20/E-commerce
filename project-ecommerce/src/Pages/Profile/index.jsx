import React from "react";
import NavMob from "../../components/NavMob";

//Styles
import "./profile.css";

//Images
import userNotPicture from "../../assets/HeaderModal/user-sem-foto.png";
import arrowBlack from "../../assets/HeaderModal/arrow-right-black.svg";
import arrowGray from "../../assets/HeaderModal/arrow-right-gray.svg";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="page-wrapper-profile">
      <h1>Profile</h1>
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
        <button className="button-logout-profile">Logout</button>
      </div>
      <NavMob />
    </div>
  );
};

export default Profile;
