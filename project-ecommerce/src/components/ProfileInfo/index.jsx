import React, { useContext, useEffect, useRef, useState } from "react";

//Style
import "./ProfileInfo.css";

//images
import userPicture from "../../assets/HeaderModal/user-sem-foto.png";

//Icons
import trashIcon from "../../assets/icons/trashIcon.svg";

//Firebase
import "firebase/auth";
import { auth, storage, db } from "../../../firebaseConnection";
import {
  collection,
  getDocs,
  query,
  setDoc,
  where,
  doc,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

//Toast
import { toast } from "react-toastify";

//Context
import { UserContext } from "../../Contexts/user";

const ProfileInfo = () => {
  const { user } = useContext(UserContext);
  const { fetchUserInfoAndUpdateState } = useContext(UserContext);
  const inputRef = useRef(null);
  const storageRef = ref(storage, `images/users/${user?.uid}`);
  const [image, setImage] = useState();
  const [firstName, setFirstName] = useState(user ? user.firstName : "");
  const [lastName, setLastName] = useState(user ? user.lastName : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [ddd, setDDD] = useState(user ? user.ddd : "");

  const [mobileNumber, setMobileNumber] = useState(
    user ? user.mobileNumber : ""
  );

  const [dateOfBirth, setDateOfBirth] = useState(user ? user.dateOfBirth : "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*()_+])[A-Za-z\d@#$!%^&*()_+]{6,}$/;

  const handleUploadImage = async () => {
    const storageRef = storage;
    const imagemRef = ref(storageRef, `images/users/${user.uid}`);

    const returnURL = await getDownloadURL(imagemRef)
      .then((url) => {
        setImage(url);
      })
      .catch((error) => {
        if (error.code === "storage/object-not-found") {
          setImage("");
        }
      });
    return returnURL;
  };
  if (typeof image == "undefined") {
    handleUploadImage();
  }

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setDDD(user.ddd);
      setMobileNumber(user.mobileNumber);
      setDateOfBirth(user.dateOfBirth);
      setImage(user.url);
    }
  }, [user]);

  async function handlePassword() {
    if (newPassword != "" && confirmPassword != "" && currentPassword != "") {
      const userAuth = auth.currentUser;

      const credential = EmailAuthProvider.credential(
        userAuth.email,
        currentPassword
      );

      await reauthenticateWithCredential(userAuth, credential)
        .then(async () => {})

        .catch((error) => {
          if (error.code == "auth/wrong-password") {
            setError("Incorrect current password");
          }
        });

      await updatePassword(userAuth, newPassword)
        .then(async () => {
          await handleEdit();
          setConfirmPassword("");
          setCurrentPassword("");
          setNewPassword("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  async function handleEdit() {
    if (error !== "") {
      return;
    } else {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));

      await getDocs(q).then((value) => {
        value.forEach(async (valueInfo) => {
          const userData = valueInfo.data();

          if (
            userData.uid == user.uid &&
            user.email == userData.email &&
            error == ""
          ) {
            let userInfo = {
              dateOfBirth: dateOfBirth ? dateOfBirth : userData.dateOfBirth,
              ddd: ddd ? ddd : userData.ddd,
              firstName: firstName ? firstName : userData.firstName,
              lastName: lastName ? lastName : userData.lastName,
              mobileNumber: mobileNumber ? mobileNumber : userData.mobileNumber,
              email: userData.email,
              uid: userData.uid,
            };

            await setDoc(doc(db, "users", valueInfo.id), userInfo)
              .then(() => {
                toast.success("Successfully updated user information");
              })
              .catch((error) => {
                toast.error("Error updating information");
                console.log(error);
              });
          }
        });
      });
    }
  }

  const handleChange = async (e) => {
    e.preventDefault();

    if (validations() == true) {
      await handlePassword();
      if (currentPassword == "" && newPassword == "" && confirmPassword == "") {
        await handleEdit();
      }

      //ALTERAÇÃO DA IMAGEM
      if (typeof image == "object") {
        const uploadTask = uploadBytesResumable(storageRef, image);
      } else if (image.length > 0) {
        console.log(image);
      } else {
        const deletion = deleteObject(storageRef);
      }
      fetchUserInfoAndUpdateState(user.uid);
    }
  };

  const validations = () => {
    if (
      firstName === "" ||
      dateOfBirth === "" ||
      lastName === "" ||
      ddd === "" ||
      mobileNumber === ""
    ) {
      setError("Fill in all fields");
      return false;
    }

    if (!checkBiggerAge(dateOfBirth)) {
      setError("User must be over 18 years old");
      return false;
    }

    if (
      (newPassword != "" || confirmPassword != "" || currentPassword != "") &&
      (newPassword == "" || confirmPassword == "" || currentPassword == "")
    ) {
      setError("Fill in all password fields");
      return false;
    }
    if (newPassword != "" && confirmPassword != "" && currentPassword != "") {
      if (!passwordRegex.test(newPassword)) {
        setError(
          "Password must have at least 6 characters, 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character."
        );
        return false;
      }
      if (newPassword != confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
    }

    return true;
  };

  function checkBiggerAge(data) {
    const dataAtual = new Date();
    const dataNascimento = new Date(data);
    const idadeEmMilissegundos = dataAtual - dataNascimento;
    const idadeEmAnos = idadeEmMilissegundos / (1000 * 60 * 60 * 24 * 365.25);

    if (idadeEmAnos < 18) {
      return false;
    }
    return true;
  }

  return (
    <div className="page-wrapper-info">
      <p>Personal Information</p>
      <hr />

      <div className="user-picture-info">
        <div className="input-picture" onClick={() => inputRef.current.click()}>
          {image ? (
            <img
              src={
                typeof image === "object" ? URL.createObjectURL(image) : image
              }
            />
          ) : (
            <img src={userPicture} />
          )}
          <input
            type="file"
            name="picture"
            id="pictureID"
            style={{ display: "none" }}
            ref={inputRef}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="btns-picture-info">
          <button
            className="upload-button-info"
            onClick={() => inputRef.current.click()}
          >
            Upload
          </button>
          <button
            className="delete-button-info"
            onClick={() => {
              setImage("");
              document.getElementById("pictureID").value = "";
            }}
          >
            <img src={trashIcon} alt="icone de lixeira" />
            Delete
          </button>
        </div>
      </div>
      <form className="form-info" onSubmit={handleChange}>
        <div className="content-name-info">
          <div className="container-input-info name-info">
            <label>First Name</label>
            <input
              value={firstName}
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              onFocus={(e) => setError("")}
              style={
                firstName === "" && error == "Fill in all fields"
                  ? { border: "1px solid red" }
                  : {}
              }
            />
          </div>
          <div className="container-input-info name-info">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onFocus={(e) => setError("")}
              style={
                lastName === "" && error == "Fill in all fields"
                  ? { border: "1px solid red" }
                  : {}
              }
            />
          </div>
        </div>
        <div className="container-input-info">
          <label>Email</label>
          <input
            type="email"
            value={email}
            disabled
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <div className="container-input-info container-number-info">
            <label>Mobile Number</label>
            <div>
              <input
                type="number"
                id="dddID"
                name="ddd"
                pattern="[0-9]{2}"
                maxLength="2"
                value={ddd}
                onChange={(e) => setDDD(e.target.value)}
                onFocus={(e) => setError("")}
                style={
                  ddd === "" && error == "Fill in all fields"
                    ? { border: "1px solid red" }
                    : {}
                }
              />
              <input
                type="number"
                id="numeroID"
                name="numero"
                pattern="[0-9]{8,9}"
                maxLength="9"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                onFocus={(e) => setError("")}
                style={
                  mobileNumber === "" && error == "Fill in all fields"
                    ? { border: "1px solid red" }
                    : {}
                }
              />
            </div>
          </div>
          <div className="container-input-info">
            <label>Date of Birth</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              onFocus={(e) => setError("")}
              style={
                (dateOfBirth === "" && error == "Fill in all fields") ||
                (dateOfBirth !== "" &&
                  error == "User must be over 18 years old")
                  ? { border: "1px solid red" }
                  : {}
              }
            />
            <p className="error-p">
              {error === "User must be over 18 years old" ||
              error === "Fill in all fields"
                ? error
                : ""}
            </p>
          </div>
        </div>
        <h3>Change Password</h3>
        <hr />
        <div className="container-input-info">
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onFocus={(e) => setError("")}
            onChange={(e) => setCurrentPassword(e.target.value)}
            style={
              (currentPassword === "" &&
                error == "Fill in all password fields") ||
              (currentPassword != "" && error === "Incorrect current password")
                ? { border: "1px solid red" }
                : {}
            }
          />
          <p className="error-p">
            {currentPassword != "" && error === "Incorrect current password"
              ? error
              : ""}
          </p>
        </div>
        <div className="container-input-info">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onFocus={(e) => setError("")}
            onChange={(e) => setNewPassword(e.target.value)}
            style={
              (newPassword === "" && error == "Fill in all password fields") ||
              (newPassword != "" &&
                error ===
                  "Password must have at least 6 characters, 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character.") ||
              (newPassword != "" && error === "Passwords do not match")
                ? { border: "1px solid red" }
                : {}
            }
          />
          <p className="error-p">
            {error ===
            "Password must have at least 6 characters, 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character."
              ? error
              : ""}
          </p>
        </div>
        <div className="container-input-info">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onFocus={(e) => setError("")}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={
              (confirmPassword === "" &&
                error == "Fill in all password fields") ||
              (confirmPassword != "" && error === "Passwords do not match")
                ? { border: "1px solid red" }
                : {}
            }
          />
          <p className="error-p">
            {error === "Fill in all password fields" ||
            error === "Passwords do not match"
              ? error
              : ""}
          </p>
        </div>

        <div className="button-save-info">
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfo;
