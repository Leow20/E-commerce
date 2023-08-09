//React
import { useContext, useState } from "react";

//Style
import "./headerModal.css";

//Router-dom
import { Link, useNavigate } from "react-router-dom";

//Images
import arrowBlack from "../../assets/HeaderModal/arrow-right-black.svg";
import arrowGray from "../../assets/HeaderModal/arrow-right-gray.svg";
import userNotPicture from "../../assets/HeaderModal/user-sem-foto.png";
import { UserContext } from "../../Contexts/user";

const HeaderModal = ({ isOpen, setIsOpen, id = "headerModalId" }) => {
  const [animation, setAnimation] = useState(
    "content-header-modal animation-header-modal"
  );

  const { user } = useContext(UserContext);
  const navigate = useNavigate("");

  const handleBackClick = (e) => {
    e.preventDefault();

    if (e.target.id !== id) {
      return;
    } else {
      handleModalState();
    }
  };
  addEventListener("scroll", () => handleModalState());

  function handleModalState() {
    setAnimation("content-header-modal animate-modal-info");

    setTimeout(() => {
      setIsOpen(false);
      setAnimation("content-header-modal animation-header-modal");
    }, 300);
  }

  if (isOpen) {
    return (
      <div id={id} className="header-modal" onClick={handleBackClick}>
        <div className={animation}>
          <div className="profile-header-modal">
            <button onClick={() => navigate("/profile/Personal Information")}>
              <div>
                <img
                  src={user && user.URLfoto ? user.URLfoto : userNotPicture}
                  alt="User"
                  id="imgUserId"
                />
                <h1>
                  Hello
                  {user && user.firstName && user.lastName
                    ? ", " + user.firstName + " " + user.lastName
                    : ""}
                </h1>
              </div>
              <img src={arrowBlack} alt="arrow-icon" />
            </button>
          </div>
          <hr />
          <nav className="categories-header-modal">
            <h2>Top Categories</h2>
            <ul>
              <li>
                <Link to="/results/skincare">
                  <label>Skincare</label>
                  <img src={arrowGray} alt="arrow-icon" />
                </Link>
              </li>
              <li>
                <Link to="/results/apparels">
                  <label>Apparels</label>
                  <img src={arrowGray} alt="arrow-icon" />
                </Link>
              </li>
              <li>
                <Link to="/results/jewellery">
                  <label>Jewellery</label>
                  <img src={arrowGray} alt="arrow-icon" />
                </Link>
              </li>
              <li>
                <Link to="/results/handbags">
                  <label>Handbags</label>
                  <img src={arrowGray} alt="arrow-icon" />
                </Link>
              </li>
              <li>
                <Link to="/results/eyeware">
                  <label>Eyeware</label>
                  <img src={arrowGray} alt="arrow-icon" />
                </Link>
              </li>
              <li>
                <Link to="/results/fragrance">
                  <label>Fragrance</label>
                  <img src={arrowGray} alt="arrow-icon" />
                </Link>
              </li>
              <li>
                <Link to="/results/watches">
                  <label>Watches</label>
                  <img src={arrowGray} alt="arrow-icon" />
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <label>About</label>
                  <img src={arrowGray} alt="arrow-icon" />
                </Link>
              </li>
            </ul>
          </nav>
          <hr />
          <nav className="contact-header-mobile">
            <h2>Contact Us</h2>
            <ul>
              <li>
                <Link>
                  <label>Help & Support</label>
                  <img src={arrowBlack} alt="arrow-icon" />
                </Link>
              </li>
              <li>
                <Link>
                  <label>Feedback & Suggestions</label>
                  <img src={arrowBlack} alt="arrow-icon" />
                </Link>
              </li>
              <li>
                <Link>
                  <label>Visit Websites</label>
                  <img src={arrowBlack} alt="arrow-icon" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
};

export default HeaderModal;
