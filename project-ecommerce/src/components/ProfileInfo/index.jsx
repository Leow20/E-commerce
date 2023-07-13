import React from "react";

//Style
import "./ProfileInfo.css";

//images
import userPicture from "../../assets/HeaderModal/user-sem-foto.png";

//Icons
import trashIcon from "../../assets/icons/trashIcon.svg";

const ProfileInfo = () => {
  return (
    <div className="page-wrapper-info">
      <p>Personal Information</p>
      <hr />

      <div className="user-picture-info">
        <img src={userPicture} alt="usuario sem foto" />
        <div>
          <button className="upload-button-info">Upload</button>
          <button className="delete-button-info">
            <img src={trashIcon} alt="icone de lixeira" />
            Delete
          </button>
        </div>
      </div>
      <form className="form-info">
        <div className="content-name-info">
          <div className="container-input-info name-info">
            <label>First Name</label>
            <input type="text" />
          </div>
          <div className="container-input-info name-info">
            <label>Last Name</label>
            <input type="text" />
          </div>
        </div>
        <div className="container-input-info">
          <label>Email</label>
          <input type="email" />
        </div>
        <div>
          <div className="container-input-info container-number-info">
            <label>Mobile Number</label>
            <div>
              <input
                type="tel"
                id="ddd"
                name="ddd"
                pattern="[0-9]{2}"
                maxlength="2"
              />
              <input
                type="tel"
                id="numero"
                name="numero"
                pattern="[0-9]{8,9}"
                maxlength="9"
              />
            </div>
          </div>
          <div className="container-input-info">
            <label>Date of Birth</label>
            <input type="date" />
          </div>
        </div>
        <h3>Change Password</h3>
        <hr />
        <div className="container-input-info">
          <label>Current Password</label>
          <input type="password" />
        </div>
        <div className="container-input-info">
          <label>New Password</label>
          <input type="password" />
        </div>
        <div className="container-input-info">
          <label>Confirm Password</label>
          <input type="password" />
        </div>
        <div className="button-save-info">
          <button>Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfo;
