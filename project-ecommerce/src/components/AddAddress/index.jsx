import "./AddAddress.css";

import arrow from "../../assets/icons/arrowProfile.svg";

function AddAddress() {
  return (
    <div>
      <header className="header-add-address">
        <img src={arrow} />
        <h1>Add New Address</h1>
      </header>

      <div className="info-add-address">
        <p>Contact Information</p>
        <hr className="line-add-address" />
        <div className="info-add-address">
          <input className="inputs-info-add-address" type="text" placeholder="Full Name" />
          <div className="container-phone-add-address">
            <input className="small-input-add-address" type="number" placeholder="+11" />
            <input type="number" placeholder="Contact Number" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
