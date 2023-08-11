import "./AddAddress.css";

import arrow from "../../assets/icons/arrowProfile.svg";

import ButtonBigMob from "../ButtonBigMobile";

function AddAddress() {
  return (
    <>
      <header className="header-add-address">
        <img src={arrow} />
        <h1>Add New Address</h1>
      </header>

      <div className="info-add-address">
        <p>Contact Information</p>
        <hr className="line-add-address" />
        <div className="info-add-address">
          <input
            className="inputs-info-add-address"
            type="text"
            placeholder="Full Name"
          />
          <div className="container-phone-add-address">
            <input
              className="small-input-add-address"
              type="number"
              placeholder="+11"
            />
            <input
              className="medium-input-add-address"
              type="number"
              placeholder="Contact Number"
            />
          </div>
        </div>
      </div>

      <div className="info-add-address">
        <p>Delivery Address</p>
        <hr className="line-add-address" />
        <div className="info-add-address">
          <input
            className="inputs-info-add-address"
            type="text"
            placeholder="Pin Code"
          />
          <input
            className="inputs-info-add-address"
            type="text"
            placeholder="Pin Code"
          />
          <input
            className="inputs-info-add-address"
            type="text"
            placeholder="Pin Code"
          />
          <select name="" id="">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>

        <div className="div-buttons-add-address">
          <button>Home</button>
          <button>Office</button>
          <button>Other </button>
        </div>
      </div>

      <div className="checkbox-add-address">
        <button>asdf</button>
        <p>Use as default delivery address.</p>
      </div>

      <ButtonBigMob>Save Address</ButtonBigMob>
    </>
  );
}

export default AddAddress;
