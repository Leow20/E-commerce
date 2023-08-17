import "./AddAddress.css";

import arrow from "../../assets/icons/arrowProfile.svg";

import ButtonBigMob from "../../components/ButtonBigMobile";

import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { db } from "../../../firebaseConnection";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserContext } from "../../Contexts/user";
import { toast } from "react-toastify";

function AddAddress() {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedButton, setSelectedButton] = useState("Home");
  const { user } = useContext(UserContext);

  const [apiError, setApiError] = useState(null);
  const [pre, setPre] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [pincode, setPincode] = useState("");
  const [addressData, setAddressData] = useState({
    street: "",
    city: "",
    state: "",
    selectedButton: selectedButton,
  });
  const [address, setAddress] = useState([]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  function handleButtonSelect(buttonName) {
    setSelectedButton(buttonName);
  }
  async function loadLocationUser() {
    const locationSnapshot = await getDoc(doc(db, "locationUser", user.uid));
    if (user) {
      if (locationSnapshot.exists()) {
        setAddress(locationSnapshot.data().data);
      }
    }
  }

  const fullnumber = `${pre}-${phone}`;

  async function handleSubmit() {
    if (
      pre === "" ||
      phone === "" ||
      addressData.city === "" ||
      addressData.street === "" ||
      addressData.state === "" ||
      pincode === "" ||
      apiError || // Adicionar verificação para erro da API
      addressData.city === "" ||
      addressData.street === "" ||
      addressData.state === ""
    ) {
      toast.warn("Fill all the fields and ensure address data is valid");
      return;
    } else {
      console.log(name);
      console.log(fullnumber);

      const pinCode = pincode.replace(/\D/g, "");
      console.log(pinCode);
      console.log(addressData.street);
      console.log(addressData.city);
      console.log(addressData.state);
      console.log(selectedButton);
      loadLocationUser();

      address.push({
        name,
        fullnumber,
        pinCode,
        street: addressData.street,
        city: addressData.city,
        state: addressData.state,
        selectedButton,
      });

      const location = await setDoc(doc(db, "locationUser", user?.uid), {
        data: address,
      }).then(() => {
        toast.success("Address successfully registered");
        setPincode("");
        setAddressData({
          street: "",
          city: "",
          state: "",
        });
      });

      console.log(location);
    }
  }

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch address information");
        }
        return res.json();
      })
      .then((data) => {
        setAddressData({
          street: data.logradouro || address.street,
          city: data.localidade || "",
          state: data.uf || "",
        });
        setApiError(null); // Limpar erro se a requisição for bem-sucedida
      })
      .catch((error) => {
        setApiError("Invalid CEP or failed to fetch data"); // Configurar erro de requisição
        toast.error("An error occurred while fetching address data");
      });
  };

  return (
    <>
      <header className="header-add-address">
        <Link to="/profile/Personal Infomartion">
          <img src={arrow} />
        </Link>
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
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <div className="container-phone-add-address">
            <input
              className="small-input-add-address"
              type="number"
              placeholder="+11"
              onChange={(e) => {
                setPre(e.target.value);
              }}
            />
            <input
              className="medium-input-add-address"
              type="number"
              placeholder="Contact Number"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="info-add-address space-add-address">
        <p>Delivery Address</p>
        <hr className="line-add-address" />
        <div className="info-add-address">
          <input
            className="inputs-info-add-address"
            type="text"
            placeholder="CEP"
            onBlur={checkCEP}
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value);
            }}
          />
          <input
            className="inputs-info-add-address"
            type="text"
            placeholder="Street Address"
            value={addressData.street}
            onChange={(e) =>
              setAddressData({ ...addressData, street: e.target.value })
            }
          />
          <input
            className="inputs-info-add-address"
            type="text"
            placeholder="City"
            value={addressData.city}
            onChange={(e) =>
              setAddressData({ ...addressData, city: e.target.value })
            }
          />

          <input
            className="inputs-info-add-address"
            type="text"
            placeholder="State: SP"
            value={addressData.state}
            onChange={(e) =>
              setAddressData({ ...addressData, state: e.target.value })
            }
          />
        </div>

        <div className="div-buttons-add-address">
          <button
            className={`${
              selectedButton === "Home" ? "selected-button" : ""
            } button-style-add-address`}
            onClick={() => handleButtonSelect("Home")}
          >
            Home
          </button>
          <button
            className={`${
              selectedButton === "Office" ? "selected-button" : ""
            } button-style-add-address`}
            onClick={() => handleButtonSelect("Office")}
          >
            Office
          </button>
          <button
            className={`${
              selectedButton === "Other" ? "selected-button" : ""
            } button-style-add-address`}
            onClick={() => handleButtonSelect("Other")}
          >
            Other
          </button>
        </div>
      </div>

      <div className="checkbox-add-address">
        <div className="aling-checkbox-add-address">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <p>Use as default delivery address.</p>
        </div>
      </div>

      <div className="button-save-add-address">
        <div onClick={handleSubmit}>
          <ButtonBigMob>Save Address</ButtonBigMob>
        </div>
      </div>
    </>
  );
}

export default AddAddress;
