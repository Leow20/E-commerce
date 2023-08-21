import React from "react";
import NavMob from "../../components/NavMob";
import "./categories.css";
import Skin from "../../assets/imgCategories/skincare.jpg";
import Frag from "../../assets/imgCategories/fragrance.jpg";
import Bags from "../../assets/imgCategories/handbags.jpg";
import Eye from "../../assets/imgCategories/eyewear.jpg";
import Apparels from "../../assets/imgCategories/apparels.jpg";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Header from "../../components/Header";

const Categories = () => {
  const isMobile = useMediaQuery({ maxWidth: 820 });

  return (
    <>
      {!isMobile && <Header Page={"Categories"} />}
      <h1 className="title">Categories</h1>
      <div className="container-category">
        <Link to="/results/Skincare">
          <div className="sub-category">
            <img src={Skin} alt="Skincare" />
            <h2 className="color-title">Skincare</h2>
          </div>
        </Link>
        <Link to="/results/Fragrance">
          <div className="sub-category">
            <img src={Frag} alt="Fragrance" />
            <h2 className="color-title-pink">Fragrance</h2>
          </div>
        </Link>
        <Link to="/results/Handbags">
          <div className="sub-category">
            <img src={Bags} alt="Handbags" />
            <h2 className="color-title">Handbags</h2>
          </div>
        </Link>
        <Link to="/results/Eyewear">
          <div className="sub-category">
            <img src={Eye} alt="Eyewear" />
            <h2 className="color-title">Eyewear</h2>
          </div>
        </Link>
        <Link to="/results/apparels">
          <div className="sub-category">
            <img src={Apparels} alt="Apparels" />
            <h2 className="color-title">Apparels</h2>
          </div>
        </Link>
      </div>
      <NavMob page="/categories" />
    </>
  );
};

export default Categories;
