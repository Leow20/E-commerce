import React from "react";
import "./myBag.css";

import ButtonBigMob from "../../components/ButtonBigMobile";
import arrow from "../../assets/icons/arrowProfile.svg";
import empty from "../../assets/Img/emptyBag.png";

const MyBag = () => {
  return (
    <div className="window-mybag">
      <div className="container-title-mybag">
        <img src={arrow} />
        <h3>My Bag</h3>
      </div>

      <div className="empty-mybag">
        <img src={empty} />
        <h2>Uh Oh....!</h2>
        <p>
          You haven’t added any any items. Start shopping to make your bag bloom
        </p>
      </div>

      <div className="button-mybag">
        <ButtonBigMob>Continue Shopping</ButtonBigMob>
      </div>
    </div>
  );
};

export default MyBag;
