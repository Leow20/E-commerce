import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate, useParams } from "react-router-dom";

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
import Wishlist from "../../components/Wishlist";
import ReferAndEarn from "../../components/ReferAndEarn";
import AddressBook from "../../components/AddressBook";
import { signOut } from "firebase/auth";
import { auth, storage } from "../../../firebaseConnection";
import { toast } from "react-toastify";

//Context
import MyOrders from "../../components/MyOrders";
import { useContext } from "react";
import { UserContext } from "../../Contexts/user";
import MyReviews from "../../components/MyReviews";

const Profile = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState(id);
  const [translate, setTranslate] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 820 });
  const [show, setShow] = useState("page-wrapper-modal-info");
  const [orderCode, setOrderCode] = useState("");

  const navigate = useNavigate();

  function handleTabChange(tab) {
    setSelectedTab(tab);

    switch (tab) {
      case "Personal Information":
        setTranslate("translateY(0px)");
        break;
      case "Refer and Earn":
        setTranslate("translateY(60px)");
        break;
      case "My Orders":
        setTranslate("translateY(120px)");
        break;
      case "My Wishlist":
        setTranslate("translateY(180px)");
        break;
      case "My Reviews":
        setTranslate("translateY(240px)");
        break;
      case "My Address Book":
        setTranslate("translateY(300px)");
        break;
      case "My Saved Cards":
        setTranslate("translateY(360px)");
        break;
      default:
        setSelectedTab("Personal Information");
        setTranslate("translateY(0px)");
        break;
    }
  }

  useEffect(() => {
    handleTabChange(id);
  }, [id]);

  useEffect(() => {
    if (isMobile) {
      setSelectedTab("");
    } else if (selectedTab == "" && !isMobile) {
      setSelectedTab("Personal Information");
      setTranslate("translateY(0px)");
    }
  }, [isMobile]);

  function handleModalState() {
    setShow("page-wrapper-modal-info animate-modal-info");

    setTimeout(() => {
      setSelectedTab("");
      setShow("page-wrapper-modal-info");
    }, 400);
  }

  const handleLogout = async () => {
    await signOut(auth).then(() => {
      localStorage.removeItem("userLogado");
      toast.success("User logged out successfully");
    });
  };

  useEffect(() => {
    var orderData = localStorage.getItem("orderData");
    setOrderCode(JSON.stringify(orderData));
  }, [selectedTab]);

  return (
    <>
      {selectedTab !== "" && isMobile && (
        <div className={show}>
          <header>
            <div onClick={() => handleModalState()}>
              <img src={arrowProfile} alt="icone seta" />
            </div>

            <h1>{orderCode}</h1>
          </header>
          {selectedTab == "Personal Information" && <ProfileInfo />}
          {selectedTab == "My Wishlist" && <Wishlist />}
          {selectedTab == "Refer and Earn" && <ReferAndEarn />}
          {selectedTab == "My Reviews" && <MyReviews />}
          {selectedTab == "My Address Book" && <AddressBook />}
          {selectedTab == "My Orders" && <MyOrders user={user} />}
        </div>
      )}
      <>
        {!isMobile && <Header Page="Profile" />}
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
                onClick={handleLogout}
                className="button-logout-profile "
                id="button-logout-desktop-profile"
              >
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
                <img
                  src={user && user.url ? user.url : userNotPicture}
                  alt="User Picture"
                />
                <div>
                  {user ? (
                    <>
                      <p>{user.firstName}</p>
                      <p>{user.email}</p>
                      <p>{"+" + user.ddd + "-" + user.mobileNumber}</p>
                    </>
                  ) : (
                    <h1>Hello</h1>
                  )}
                </div>
                <img src={arrowGray} alt="icone seta" />
              </div>
              <nav className="categories-page-profile">
                {!isMobile && (
                  <div
                    className="tag-profile"
                    style={{ transform: translate }}
                  ></div>
                )}
                <ul>
                  <li>
                    <Link to="/profile/Personal Information">
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
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile/Refer and Earn">
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
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile/My Orders">
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
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile/My Wishlist">
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
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile/My Reviews">
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
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile/My Address Book">
                      <button
                        onClick={() => handleTabChange("My Address Book")}
                      >
                        <label
                          style={
                            selectedTab == "My Address Book" && !isMobile
                              ? { color: "#1B4B66" }
                              : { color: "#13101E" }
                          }
                        >
                          My Address Book
                        </label>
                        <img
                          src={
                            selectedTab == "My Address Book" && !isMobile
                              ? greenArrow
                              : arrowProfile
                          }
                          alt="arrow-icon"
                        />
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile/My Saved Cards">
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
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="container-button-profile">
                {selectedTab == "" && (
                  <button
                    onClick={handleLogout}
                    className="button-logout-profile"
                    id="button-logout-mob-profile"
                  >
                    {" "}
                    <img src={logoutIcon} alt="icone de logout" />
                    Logout
                  </button>
                )}
              </div>
              <div></div>
            </main>
            <div className="content-profile">
              {selectedTab == "Personal Information" && <ProfileInfo />}
              {selectedTab == "My Wishlist" && <Wishlist />}
              {selectedTab == "Refer and Earn" && <ReferAndEarn />}
              {selectedTab == "My Reviews" && <MyReviews />}
              {selectedTab == "My Address Book" && <AddressBook />}
              {selectedTab == "My Orders" && <MyOrders user={user} />}
            </div>
          </div>
        </div>
        {selectedTab == "" && (
          <>
            {" "}
            <Footer />
            <NavMob page="/profile" />
          </>
        )}
        {!isMobile && (
          <>
            {" "}
            <Footer />
            <NavMob page="/profile" />
          </>
        )}
      </>
    </>
  );
};

export default Profile;
