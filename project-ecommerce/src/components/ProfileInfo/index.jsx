import React from "react";

//Style
import "./ProfileInfo.css";

//images
import userPicture from "../../assets/HeaderModal/user-sem-foto.png";

const ProfileInfo = () => {
  return (
    <div className="page-wrapper-info">
      <p>Personal Information</p>
      <hr />

      <div className="user-picture-info">
        <img src={userPicture} alt="usuario sem foto" />
      </div>
    </div>
  );
};

export default ProfileInfo;
