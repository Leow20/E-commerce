import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

//Icons
import arrowProfile from "../../assets/icons/arrowProfile.svg";
import { Link } from "react-router-dom";

const ResultCategories = () => {
  const isMobile = useMediaQuery({ maxWidth: 820 });

  return (
    <div>
      {" "}
      {isMobile && (
        <div className="page-wrapper-modal-info">
          <header>
            <Link to="/">
              {" "}
              <div>
                <img src={arrowProfile} alt="icone seta" />
              </div>
            </Link>

            <h1>Busca</h1>
          </header>
        </div>
      )}
    </div>
  );
};

export default ResultCategories;
