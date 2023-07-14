import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

//Styles
import "./profile.css";

//Images
import userNotPicture from "../../assets/HeaderModal/user-sem-foto.png";

//Icons
import logoutIcon from "../../assets/icons/logout.svg";
import blackArrow from "../../assets/icons/blackArrow.svg";
import arrowProfile from "../../assets/icons/arrowProfile.svg";
import greenArrow from "../../assets/icons/greenArrow.svg";
import arrowGray from "../../assets/HeaderModal/arrow-right-gray.svg";

//components
import NavMob from "../../components/NavMob";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProfileInfo from "../../components/ProfileInfo";

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("Personal Information");
  const [tranlate, setTranlate] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 820 });
  const [show, setShow] = useState("page-wrapper-modal-info");

  function handleTabChange(tab) {
    setSelectedTab(tab);

    switch (tab) {
      case "Personal Information":
        setTranlate("translateY(0px)");
        break;
      case "Refer and Earn":
        setTranlate("translateY(60px)");
        break;
      case "My Orders":
        setTranlate("translateY(120px)");
        break;
      case "My Wishlist":
        setTranlate("translateY(180px)");
        break;
      case "My Reviews":
        setTranlate("translateY(240px)");
        break;
      case "My Addres Book":
        setTranlate("translateY(300px)");
        break;
      case "My Saved Cards":
        setTranlate("translateY(360px)");
        break;
      default:
        setTranlate("translateY(0px)");
        break;
    }
  }

  useEffect(() => {
    if (isMobile) {
      setSelectedTab("");
    } else {
      setSelectedTab("Personal Information");
      setTranlate("translateY(0px)");
    }
  }, [isMobile]);

  function handleModalState() {
    setShow("page-wrapper-modal-info animate-modal-info");

    setTimeout(() => {
      setSelectedTab("");
      setShow("page-wrapper-modal-info");
    }, 400);
  }

  return (
    <>
      {selectedTab !== "" && isMobile && (
        <div className={show}>
          <header>
            <div onClick={() => handleModalState()}>
              <img src={arrowProfile} alt="icone seta" />
            </div>
            <h1>{selectedTab}</h1>
          </header>
          {selectedTab == "Personal Information" && <ProfileInfo />}
        </div>
      )}

      <>
        <Header Page="Profile" />
        <div className="page-wrapper-profile">
          <div className="container-addres-profile">
            <span>Home</span>
            <img src={blackArrow} alt="icone seta" />
            <span>User Profile</span>
          </div>
          <h1>Profile</h1>
          <div className="title-profile">
            <span>{selectedTab}</span>
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
          <div className="container-profile">
            <main className="main-profile">
              <div
                className="container-info-profile"
                onClick={() => handleTabChange("Personal Information")}
              >
                <img src={userNotPicture} alt="usuario sem foto" />
                <div>
                  <p>Tina Vargayee</p>
                  <p>tinavar@vinho.com</p>
                  <p>+85-5478564</p>
                </div>
                <img src={arrowGray} alt="icone seta" />
              </div>
              <nav className="categories-page-profile">
                {!isMobile && (
                  <div
                    className="tag-profile"
                    style={{ transform: tranlate }}
                  ></div>
                )}
                <ul>
                  <li>
                    <button
                      onClick={() => handleTabChange("Personal Information")}
                    >
                      <label
                        style={
                          selectedTab == "Personal Information" && !isMobile
                            ? { color: "#1B4B66" }
                            : { color: "#13101E" }
                        }
                      >
                        Personal Information
                      </label>
                      <img
                        src={
                          selectedTab == "Personal Information" && !isMobile
                            ? greenArrow
                            : arrowProfile
                        }
                        alt="arrow-icon"
                      />
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleTabChange("Refer and Earn")}>
                      <label
                        style={
                          selectedTab == "Refer and Earn" && !isMobile
                            ? { color: "#1B4B66" }
                            : { color: "#13101E" }
                        }
                      >
                        Refer and Earn{" "}
                      </label>
                      <img
                        src={
                          selectedTab == "Refer and Earn" && !isMobile
                            ? greenArrow
                            : arrowProfile
                        }
                        alt="arrow-icon"
                      />
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleTabChange("My Orders")}>
                      <label
                        style={
                          selectedTab == "My Orders" && !isMobile
                            ? { color: "#1B4B66" }
                            : { color: "#13101E" }
                        }
                      >
                        My Orders
                      </label>
                      <img
                        src={
                          selectedTab == "My Orders" && !isMobile
                            ? greenArrow
                            : arrowProfile
                        }
                        alt="arrow-icon"
                      />
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleTabChange("My Wishlist")}>
                      <label
                        style={
                          selectedTab == "My Wishlist" && !isMobile
                            ? { color: "#1B4B66" }
                            : { color: "#13101E" }
                        }
                      >
                        My Wishlist
                      </label>
                      <img
                        src={
                          selectedTab == "My Wishlist" && !isMobile
                            ? greenArrow
                            : arrowProfile
                        }
                        alt="arrow-icon"
                      />
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleTabChange("My Reviews")}>
                      <label
                        style={
                          selectedTab == "My Reviews" && !isMobile
                            ? { color: "#1B4B66" }
                            : { color: "#13101E" }
                        }
                      >
                        My Reviews
                      </label>
                      <img
                        src={
                          selectedTab == "My Reviews" && !isMobile
                            ? greenArrow
                            : arrowProfile
                        }
                        alt="arrow-icon"
                      />
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleTabChange("My Addres Book")}>
                      <label
                        style={
                          selectedTab == "My Addres Book" && !isMobile
                            ? { color: "#1B4B66" }
                            : { color: "#13101E" }
                        }
                      >
                        My Addres Book
                      </label>
                      <img
                        src={
                          selectedTab == "My Addres Book" && !isMobile
                            ? greenArrow
                            : arrowProfile
                        }
                        alt="arrow-icon"
                      />
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleTabChange("My Saved Cards")}>
                      <label
                        style={
                          selectedTab == "My Saved Cards" && !isMobile
                            ? { color: "#1B4B66" }
                            : { color: "#13101E" }
                        }
                      >
                        My Saved Cards
                      </label>
                      <img
                        src={
                          selectedTab == "My Saved Cards" && !isMobile
                            ? greenArrow
                            : arrowProfile
                        }
                        alt="arrow-icon"
                      />
                    </button>
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
              <div></div>
            </main>
            <div className="content-profile">
              {selectedTab == "Personal Information" && <ProfileInfo />}
            </div>
          </div>
        </div>

        <NavMob />
      </>
    </>
  );
};

export default Profile;
