import { useState, useEffect } from "react";
import "./footer.css";
import Router from "../../Routes/routes";
import { Link } from "react-router-dom";
import FB from "../../assets/imgFooter/fbLogo.svg";
import Insta from "../../assets/imgFooter/instaLogo.svg";
import Twitter from "../../assets/imgFooter/twitter.svg";
import Youtube from "../../assets/imgFooter/youtube.svg";
import Point from "../../assets/imgFooter/location.svg";
import ArrowUp from "../../assets/imgFooter/seta.svg";
import ArrowDown from "../../assets/imgFooter/ArrowDown.svg";

function Footer() {
  const [tamanhoTela, setTamanhoTela] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);

  function handleButtonFooter(e) {
    e.preventDefault();

    setOpen(!open);

    var box = document.getElementById("boxFunction");

    if (open) {
      box.classList.remove("button-active");
    } else {
      box.classList.add("button-active");
    }
    console.log(open);
  }

  useEffect(() => {
    const atualizarTamanhoTela = () => {
      setTamanhoTela(window.innerWidth);
    };

    window.addEventListener("resize", atualizarTamanhoTela);

    return () => {
      window.removeEventListener("resize", atualizarTamanhoTela);
    };
  }, []);

  return (
    <>
      {tamanhoTela < 1077 ? (
        <div id="boxFunction" className="box-button-footer">
          <h3 className="coral-footer">More about CORA’L</h3>
          <button onClick={handleButtonFooter} className="icon-button-footer">
            {" "}
            <img src={open === true ? ArrowUp : ArrowDown} alt="" />{" "}
          </button>
        </div>
      ) : null}

      {tamanhoTela < 1077 && open === true ? (
        <>
          <div className="container-footer container-footer-mobal">
            <div className="coluna-footer mob-footer">
              <h4>Shop by Category</h4>
              <Link to="/skincare">Skincare</Link>
              <Link to="/">Personal Care</Link>
              <Link to="/handbags">Handbags</Link>
              <Link to="/">Appareis</Link>
              <Link to="/watches">Watches</Link>
              <Link to="/">Eye Wear</Link>
              <Link to="/jewellery">Jewellery</Link>
            </div>

            {tamanhoTela < 1077 && open === true ? (
              <div className="coluna-footer about-footer">
                <h4>About</h4>
                <div className="mob-policy">
                  <p>
                    {" "}
                    <Link to="/">Contact Us</Link> |{" "}
                    <Link to="/about">About Us</Link> |{" "}
                    <Link to="/">Careers</Link> | <Link to="/">Press</Link>{" "}
                  </p>
                </div>
              </div>
            ) : tamanhoTela < 1077 && open === false ? null : (
              <div className="coluna-footer about-footer">
                <h4>About</h4>
                <Link to="/">Contact Us</Link>
                <Link to="/about">About Us</Link>
                <Link to="/">Careers</Link>
                <Link to="/">Press</Link>
              </div>
            )}

            {tamanhoTela < 1077 ? <hr className="linha-footer" /> : null}

            {tamanhoTela < 1077 ? (
              <div className="coluna-footer policy-footer">
                <h4>Policy</h4>
                <div className="mob-policy">
                  <p>
                    {" "}
                    <Link to="">Return</Link> | <Link to="">Terms of use</Link>{" "}
                    | <Link to="">Sitemap</Link> | <Link to="">Security</Link> |{" "}
                    <Link to="">Privacy</Link> |{" "}
                    <Link to="">EPR Compliance</Link>
                  </p>
                </div>
              </div>
            ) : (
              <div className="coluna-footer">
                <h4>Policy</h4>
                <Link to="/">Return Policy</Link>
                <Link to="/">Terms of Use</Link>
                <Link to="/">Sitemap</Link>
                <Link to="/">Security</Link>
                <Link to="/">Security</Link>
                <Link to="/">EPR Compliance</Link>
              </div>
            )}

            <div className="Logos-footer">
              <img src={FB} alt="" />
              <img src={Insta} alt="" />
              <img src={Twitter} alt="" />
              <img src={Youtube} alt="" />
            </div>

            <div className="location-footer">
              <img src={Point} alt="" />
              <p className="">United States</p>
            </div>

            <p className="RightsReserved">
              © 2021 | Cora Leviene All Rights Reserved
            </p>
          </div>
        </>
      ) : tamanhoTela < 1077 && open === false ? null : (
        <div className="container-footer container-footer-mobal">
          <div className="coluna-footer mob-footer">
            <h4>Shop by Category</h4>
            <Link to="/skincare">Skincare</Link>
            <Link to="/">Personal Care</Link>
            <Link to="/handbags">Handbags</Link>
            <Link to="/">Appareis</Link>
            <Link to="/watches">Watches</Link>
            <Link to="/">Eye Wear</Link>
            <Link to="/jewellery">Jewellery</Link>
          </div>

          {tamanhoTela < 1077 && open === true ? (
            <div className="coluna-footer about-footer">
              <h4>About</h4>
              <div className="mob-policy">
                <p>
                  {" "}
                  <Link to="/">Contact Us</Link> |{" "}
                  <Link to="/about">About Us</Link> |{" "}
                  <Link to="/">Careers</Link> | <Link to="/">Press</Link>{" "}
                </p>
              </div>
            </div>
          ) : tamanhoTela < 1077 && open === false ? null : (
            <div className="coluna-footer about-footer">
              <h4>About</h4>
              <Link to="/">Contact Us</Link>
              <Link to="/about">About Us</Link>
              <Link to="/">Careers</Link>
              <Link to="/">Press</Link>
            </div>
          )}

          {tamanhoTela < 1077 ? <hr className="linha-footer" /> : null}

          {tamanhoTela < 1077 ? (
            <div className="coluna-footer policy-footer">
              <h4>Policy</h4>
              <div className="mob-policy">
                <p>
                  {" "}
                  <Link to="">Return</Link> | <Link to="">Terms of use</Link> |{" "}
                  <Link to="">Sitemap</Link> | <Link to="">Security</Link> |{" "}
                  <Link to="">Privacy</Link> | <Link to="">EPR Compliance</Link>
                </p>
              </div>
            </div>
          ) : (
            <div className="coluna-footer">
              <h4>Policy</h4>
              <Link to="/">Return Policy</Link>
              <Link to="/">Terms of Use</Link>
              <Link to="/">Sitemap</Link>
              <Link to="/">Security</Link>
              <Link to="/">Security</Link>
              <Link to="/">EPR Compliance</Link>
            </div>
          )}

          <div className="Logos-footer">
            <img src={FB} alt="" />
            <img src={Insta} alt="" />
            <img src={Twitter} alt="" />
            <img src={Youtube} alt="" />
          </div>

          <div className="location-footer">
            <img src={Point} alt="" />
            <p className="">United States</p>
          </div>

          <p className="RightsReserved">
            © 2021 | Cora Leviene All Rights Reserved
          </p>
        </div>
      )}
    </>
  );
}

export default Footer;
