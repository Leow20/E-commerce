//Style
import "./header.css";

//Router-dom
import { Link } from "react-router-dom";
import HeaderModal from "../HeaderModal";
import { useState } from "react";

//Images
import search from "../../assets/imgHeader/search(1).svg";
import wishlist from "../../assets/imgHeader/wishlist.svg";
import perfil from "../../assets/imgHeader/profile.svg";
import sacola from "../../assets/imgHeader/bag.svg";
import logo from "../../assets/imgHeader/logo.png";
import notificacao from "../../assets/imgHeader/notification.svg";
import menu from "../../assets/imgHeader/leadingIcon.svg";
import addHome from "../../assets/imgHeader/addHomes.svg";
import arrow from "../../assets/icons/arroBlue.svg";
import bolsa from "../../assets/Img/bolsa_rosa.jpg";
import cross from "../../assets/icons/cross-small.svg";

function Header({ Page }) {
  const [modal, setModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <HeaderModal isOpen={modal} setIsOpen={setModal} />

      <div className="page-wrapper-header">
        <header className="Header">
          <div className="logo-header">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <nav className="nav-category-header">
            <ul>
              <li>
                <Link to="/handbags">Handbags</Link>
              </li>
              <li>
                <Link to="/watches">Watches</Link>
              </li>
              <li>
                <Link to="/skincare">Skincare</Link>
              </li>
              <li>
                <Link to="/jewellery">Jewellery</Link>
              </li>
              <li>
                <Link to="/apparels">Apparels</Link>
              </li>
            </ul>
          </nav>
          <div className="search-bar-header">
            <input
              type="search"
              name="searchInput"
              id="searchId"
              placeholder="Search for products or brands....."
            />
          </div>
          <div className="icons">
            <Link to="/wishlist">
              <img src={wishlist} alt="coracao" />
            </Link>

            <Link to="/profile">
              <img src={perfil} alt="perfil" />
            </Link>

            <Link to="/mybag">
              <img src={sacola} alt="sacola" onMouseEnter={handleHover} />
            </Link>
          </div>

          {isHovered && (
            <div className="modal-mybag-header">
              <div className="mybag-btnh2-header">
                <button onClick={handleMouseLeave}>
                  <img src={arrow} alt="Back" />
                </button>
                <h2>Back</h2>
              </div>

              <div className="max-product-header">
                <div className="mybag-container-product-header">
                  <div className="img-product-mybag-header">
                    <img src={bolsa} />
                  </div>

                  <div className="desc-product-mybag-header">
                    <p>Coach</p>
                    <p>Leather Coach Bag</p>
                    <div className="box-counter-product-header">
                      <button>-</button>
                      <p>1</p>
                      <button>+</button>
                    </div>
                  </div>

                  <div className="price-product-header">
                    <button>
                      <img src={cross} alt="" />
                    </button>
                    <p>R$54.69</p>
                  </div>
                </div>
                <hr className="line-product-header" />

                <div className="mybag-container-product-header">
                  <div className="img-product-mybag-header">
                    <img src={bolsa} />
                  </div>

                  <div className="desc-product-mybag-header">
                    <p>Coach</p>
                    <p>Leather Coach Bag</p>
                    <div className="box-counter-product-header">
                      <button>-</button>
                      <p>1</p>
                      <button>+</button>
                    </div>
                  </div>

                  <div className="price-product-header">
                    <button>
                      <img src={cross} alt="" />
                    </button>
                    <p>R$54.69</p>
                  </div>
                </div>
                <hr className="line-product-header" />

                <div className="mybag-container-product-header">
                  <div className="img-product-mybag-header">
                    <img src={bolsa} />
                  </div>

                  <div className="desc-product-mybag-header">
                    <p>Coach</p>
                    <p>Leather Coach Bag</p>
                    <div className="box-counter-product-header">
                      <button>-</button>
                      <p>1</p>
                      <button>+</button>
                    </div>
                  </div>

                  <div className="price-product-header">
                    <button>
                      <img src={cross} alt="" />
                    </button>
                    <p>R$54.69</p>
                  </div>
                </div>
                <hr className="line-product-header" />
              </div>

              <div className="total-price-header">
                <div className="txt-price-header">
                  <p className="sub-tax-header">Subtotal:</p>
                  <p className="sub-tax-header">Tax:</p>
                  <p className="final-price-header">Total:</p>
                </div>

                <div className="prices-header">
                  <p className="sub-tax-header">$109.38</p>
                  <p className="sub-tax-header">$2.00</p>
                  <p className="final-price-header">$111.38</p>
                </div>
              </div>

              <div className="container-btns-header">
                <div className="coupon-header">
                  <input type="text" placeholder="Apply Coupon Code" />
                  <button>CHECK</button>
                </div>

                <button className="order-btn-header">Place Order</button>

                <p>Continue Shopping</p>

              </div>
            </div>
          )}

          <div className="container-header-responsivo">
            <div className="logo-menu">
              <h1>{Page}</h1>
              <button onClick={() => setModal(true)}>
                <img src={menu} alt="menu" id="menu" />
              </button>
            </div>
            <div className="icons-responsivo">
              <Link to="/">
                <img src={addHome} alt="addHome" />
              </Link>

              <button>
                <img src={search} alt="lupa" />
              </button>

              <Link to="/notification">
                <img src={notificacao} alt="notificacao" />
              </Link>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;
