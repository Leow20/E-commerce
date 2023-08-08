import React from "react";
import "./erro404.css";

import erro from "../../assets/Img/Error.jpg";

import ButtonBigMob from "../../components/ButtonBigMobile";
import { Link } from "react-router-dom";

function Erro404() {
  return (
    <div className="windown">
      <div className="container-page404">
        <img src={erro} alt="" />
        <h2>Ops... this page is not found</h2>
        <h4>click the button to go Back to Home</h4>

        <Link to="/" className="button-page404">
          <ButtonBigMob>Back to Home</ButtonBigMob>
        </Link>
      </div>
    </div>
  );
}

export default Erro404;
