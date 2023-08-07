import React from "react";
import "./erro404.css";

import erro from "../../assets/Img/noAddress.jpg";

import ButtonBigMob from "../../components/ButtonBigMobile";
import { Link } from "react-router-dom";

function Erro404() {
  return (
    <div >
      <div>
        <img src={erro} alt="" />
        <h2>Ops... this page is not found</h2>
        <h4>click the button to go back to home</h4>

        <Link to="/" >
          <ButtonBigMob>back to home</ButtonBigMob>
        </Link>
      </div>
    </div>
  );
}

export default Erro404;
