//Router-dom
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Pages
import About from "../Pages/About";
import Home from "../Pages/Home";
import Handbags from "../Pages/Handbags";
import Watches from "../Pages/Watches";
import Skincare from "../Pages/Skincare";
import Jewellery from "../Pages/Jewellery";
import Apparels from "../Pages/Apparels";
import Categories from "../Pages/Categories";
import Profile from "../Pages/Profile";
import MyBag from "../Pages/MyBag";
import Notification from "../Pages/Notification";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import AddProduct from "../Pages/AddProduct";
import ReferAndEarn from "../Pages/ReferAndEarn";

//Routes private
import Private from "./private";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/profile" element={<Private> <Profile /> </Private>} />
        <Route path="/mybag" element={<MyBag />} />
        <Route path="/handbags" element={<Handbags />} />
        <Route path="/watches" element={<Watches />} />
        <Route path="/skincare" element={<Skincare />} />
        <Route path="/jewellery" element={<Jewellery />} />
        <Route path="/apparels" element={<Apparels />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/addproduct" element={<Private> <AddProduct /> </Private>} />
        <Route path="/referandearn" element={<ReferAndEarn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
