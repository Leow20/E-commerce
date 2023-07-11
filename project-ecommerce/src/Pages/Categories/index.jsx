import React from "react";
import NavMob from "../../components/NavMob";
import "./categories.css"
import Skin from "../../assets/imgCategories/skincare.jpg"
import Frag from "../../assets/imgCategories/fragrance.jpg"
import Bags from "../../assets/imgCategories/handbangs.jpg"
import Eye from "../../assets/imgCategories/eyewear.jpg"
import Apparels from "../../assets/imgCategories/apparels.jpg"

const Categories = () => {
  return (
    <>
      <h1 className="title">Categories</h1>
      <div className="container-category">
        <div className="sub-category">
          <img src={Skin} alt="Skincare" />
          <h2 className="color-title">Skincare</h2>
        </div>
        <div className="sub-category">
          <img src={Frag} alt="Fragrance" />
          <h2 className="color-title-pink">Fragrance</h2>
        </div>
        <div className="sub-category">
          <img src={Bags} alt="Handbags" />
          <h2 className="color-title">Handbags</h2>
        </div>
        <div className="sub-category">
          <img src={Eye} alt="Eyewear" />
          <h2 className="color-title">Eyewear</h2>
        </div>
        <div className="sub-category">
          <img src={Apparels} alt="Apparels" />
          <h2 className="color-title">Apparels</h2>
        </div>
      </div>
      <NavMob />
    </>
  );
};

export default Categories;
