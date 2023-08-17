import React from "react";
import "./addressBook.css";
import { useMediaQuery } from "react-responsive";
import imgAddress from "../../assets/imgAddressBook.png";
import { Link } from "react-router-dom";

const AddressBook = () => {
  const isMobile = useMediaQuery({ maxWidth: 820 });
  return (
    <>
      {!isMobile && <h1 className="address-h1">My Address Book</h1>}
      {!isMobile && <hr />}
      <div className="container-address-book">
        <div className="image-address-book">
          <img src={imgAddress} alt="imgAddress" />
        </div>
        <div className="title-address-book">
          <h1>No Address</h1>
        </div>
        <div className="text-address-book">
          <p>It seems you have not updated your address yet.</p>
        </div>
        <Link to="/addaddress">
          <button className="address-button">Add Address</button>
        </Link>
      </div>
    </>
  );
};

export default AddressBook;
