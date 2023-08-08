import { useState, useEffect } from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import FB from "../../assets/imgFooter/fbLogo.svg";
import Insta from "../../assets/imgFooter/instaLogo.svg";
import Twitter from "../../assets/imgFooter/twitter.svg";
import Youtube from "../../assets/imgFooter/youtube.svg";
import Point from "../../assets/imgFooter/location.svg";
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
      {tamanhoTela < 841 ? (
        <div
          id="boxFunction"
          className="box-button-footer"
          style={
            open ? { marginBottom: 0 + "px" } : { marginBottom: 80 + "px" }
          }
        >
          <h3 className="coral-footer">More about CORA’L</h3>
          <button onClick={handleButtonFooter} className="icon-button-footer">
            {" "}
            <img
              src={ArrowDown}
              style={{ transform: `rotate(${open ? "180deg" : "0deg"})` }}
              alt=""
            />{" "}
          </button>
        </div>
      ) : null}

      {tamanhoTela < 841 && open === true ? (
        <footer
          className="footer"
          style={open ? { marginBottom: 20 + "px" } : ""}
        >
          <div className="container-footer container-footer-mobal">
            <div className="coluna-footer mob-footer">
              <h4>Shop by Category</h4>
              <Link to="/results/skincare">Skincare</Link>
              <Link to="/results/personal care">Personal Care</Link>
              <Link to="/results/handbags">Handbags</Link>
              <Link to="/results/apparels">Apparels</Link>
              <Link to="/results/watches">Watches</Link>
              <Link to="/results/eyewear">Eyewear</Link>
              <Link to="/results/jewellery">Jewellery</Link>
            </div>

            {tamanhoTela < 841 && open === true ? (
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
            ) : tamanhoTela < 841 && open === false ? null : (
              <div className="coluna-footer about-footer">
                <h4>About</h4>
                <Link to="/">Contact Us</Link>
                <Link to="/about">About Us</Link>
                <Link to="/">Careers</Link>
                <Link to="/">Press</Link>
              </div>
            )}

            {tamanhoTela < 841 ? <hr className="linha-footer" /> : null}

            {tamanhoTela < 841 ? (
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
              <a href="https://pt-br.facebook.com/" target="_blank">
                <img src={FB} alt="" />
              </a>
              <a href="https://instagram.com/" target="_blank">
                <img src={Insta} alt="" />
              </a>
              <a href="https://twitter.com/" target="_blank">
                <img src={Twitter} alt="" />
              </a>
              <a href="https://youtube.com/" target="_blank">
                <img src={Youtube} alt="" />
              </a>
            </div>

            <div className="location-footer">
              <img src={Point} alt="" />
              <p className="">United States</p>
            </div>

            <p className="RightsReserved">
              © 2021 | Cora Leviene All Rights Reserved
            </p>
          </div>
        </footer>
      ) : tamanhoTela < 841 && open === false ? null : (
        <footer className="footer">
          <div className="container-footer container-footer-mobal">
            <div className="coluna-footer mob-footer">
              <h4>Shop by Category</h4>
              <Link to="/results/skincare">Skincare</Link>
              <Link to="/results/Personal Care">Personal Care</Link>
              <Link to="/results/handbags">Handbags</Link>
              <Link to="/results/Apparels">Apparels</Link>
              <Link to="/results/watches">Watches</Link>
              <Link to="/results/eyewear">Eyewear</Link>
              <Link to="/results/jewellery">Jewellery</Link>
            </div>

            {tamanhoTela < 841 && open === true ? (
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
            ) : tamanhoTela < 841 && open === false ? null : (
              <div className="coluna-footer about-footer">
                <h4>About</h4>
                <Link to="/">Contact Us</Link>
                <Link to="/about">About Us</Link>
                <Link to="/">Careers</Link>
                <Link to="/">Press</Link>
              </div>
            )}

            {tamanhoTela < 841 ? <hr className="linha-footer" /> : null}

            {tamanhoTela < 841 ? (
              <div className="coluna-footer policy-footer">
                <h4>Policy</h4>
                <div className="mob-policy">
                  <p>
                    <Link to="">Return</Link> | <Link to="">Terms of use</Link>{" "}
                    |<Link to="">Sitemap</Link> | <Link to="">Security</Link> |
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
              <a href="https://pt-br.facebook.com/" target="_blank">
                <img src={FB} alt="" />
              </a>
              <a href="https://instagram.com/" target="_blank">
                <img src={Insta} alt="" />
              </a>
              <a href="https://twitter.com/" target="_blank">
                <img src={Twitter} alt="" />
              </a>
              <a href="https://youtube.com/" target="_blank">
                <img src={Youtube} alt="" />
              </a>
            </div>

            <div className="location-footer">
              <img src={Point} alt="" />
              <p className="">United States</p>
            </div>

            <p className="RightsReserved">
              © 2021 | Cora Leviene All Rights Reserved
            </p>
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
