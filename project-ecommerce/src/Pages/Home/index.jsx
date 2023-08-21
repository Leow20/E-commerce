import NavMob from "../../components/NavMob";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

//Images
import funkMob from "../../assets/Img/funk.jpg";
import funkDesk from "../../assets/Img/heroFunk.jpg";
import perfume from "../../assets/Img/perfume.jpg";
import bolsa from "../../assets/Img/bolsa.png";
import relogio from "../../assets/Img/relogio.png";
import oculos from "../../assets/Img/oculos.png";
import zara from "../../assets/Img/Zara_Logo 1.png";
import HM from "../../assets/Img/H&M.jpg";
import DG from "../../assets/Img/D&G.jpg";
import CHANEL from "../../assets/Img/CHANEL.jpg";
import BIBA from "../../assets/Img/BIBA.png";
import PRADA from "../../assets/Img/PRADA.jpg";
import shortcut from "../../assets/Img/PWA-CTA.jpg";
import spring from "../../assets/Img/spring.jpg";

//Icons
import arrow from "../../assets/icons/Vector 1.svg";
import skinCare from "../../assets/icons/icon-fill.svg";
import watches from "../../assets/icons/watche.svg";
import jewellery from "../../assets/icons/jewellery.svg";
import handbag from "../../assets/icons/handbag.svg";

import arrowOrange from "../../assets/icons/arrowOrange.svg";
import arrowBlue from "../../assets/icons/arroBlue.svg";
import arrowPink from "../../assets/icons/arrowPink.svg";
import arrowView from "../../assets/icons/viewAll.svg";
import shortcutIcon from "../../assets/icons/shortcutIcon.svg";
import { BsEyeglasses } from "react-icons/bs";
import { GiPerfumeBottle } from "react-icons/gi";

//Styles
import "./home.css";

import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../Contexts/products";
import ProductContainer from "../../components/ProductContainer";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const Home = () => {
  const { products } = useContext(ProductContext);
  const [tamanhoTela, setTamanhoTela] = useState(window.innerWidth - 37);
  const [loading, setLoading] = useState(true);
  const [animation, setAnimation] = useState("");

  useEffect(() => {
    const atualizarTamanhoTela = () => {
      setTamanhoTela(window.innerWidth - 37);
    };

    window.addEventListener("resize", atualizarTamanhoTela);

    return () => {
      window.removeEventListener("resize", atualizarTamanhoTela);
    };
  }, []);

  useEffect(() => {
    console.log(products);
    if (products) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setLoading(true);
    }
  }, [ProductContext]);

  return (
    <div>
      <Header Page="Home" />
      <main className="main-home">
        <div className="page-wrapper-home">
          <section className="first-section-home">
            <div className="warning-home">
              <p>
                We are currently experiencing local customs clearance delays.
                For the latest updates, please check your order status{" "}
                <a>here</a>
              </p>
            </div>
            <div className="hero-mobile-home" style={{ width: tamanhoTela }}>
              <img src={funkMob} alt="Carry your funk" />
              <img src={spring} alt="Carry your funk" />
              <img src={funkMob} alt="Carry your funk" />
            </div>
            <div className="hero-web-home">
              <img src={funkDesk} alt="Carry your funk" />
              <Link to="/results/handbags">
                <button className="button-hero-home">
                  <img src={arrow}></img>
                  <span>See More</span>
                </button>
              </Link>
            </div>
            <div className="categories-home">
              <span>Top Categories</span>
              <div
                className="categories-select-home"
                style={{ width: tamanhoTela }}
              >
                <Link to="/results/Skincare">
                  <button className="container-categories-home">
                    <div className="content-categorie-home">
                      <img src={skinCare} alt="skincare icon" />
                    </div>
                    <span>Skincare</span>
                  </button>
                </Link>
                <Link to="/results/Jewellery">
                  <button className="container-categories-home">
                    <div className="content-categorie-home">
                      <img src={jewellery} alt="skincare icon" />
                    </div>
                    <span>Jewellery</span>
                  </button>
                </Link>
                <Link to="/results/Handbags">
                  <button className="container-categories-home">
                    <div className="content-categorie-home">
                      <img src={handbag} alt="skincare icon" />
                    </div>
                    <span>Handbags</span>
                  </button>
                </Link>
                <Link to="/results/Watches">
                  <button className="container-categories-home">
                    <div className="content-categorie-home">
                      <img src={watches} alt="skincare icon" />
                    </div>
                    <span>Watches</span>
                  </button>
                </Link>
                <Link to="/results/Eyewear">
                  <button className="container-categories-home">
                    <div className="content-categorie-home">
                      <BsEyeglasses color="#1b4b64" fontSize="32px" />
                    </div>
                    <span>Eyewear</span>
                  </button>
                </Link>
                <Link to="/results/Fragrance">
                  <button className="container-categories-home">
                    <div className="content-categorie-home">
                      <GiPerfumeBottle color="#1b4b64" fontSize="32px" />
                    </div>
                    <span>Fragrance</span>
                  </button>
                </Link>
              </div>
            </div>
            <div className="container-arrival-title-home">
              <div className="arrival-title-home">
                <span>New Arrivals</span>
                <span>
                  <Link to="/results/viewall">
                    View All <img src={arrowView} alt="icone seta" />
                  </Link>
                </span>
              </div>

              {!loading ? (
                <div
                  className="container-arrival-home"
                  style={{ width: tamanhoTela }}
                >
                  {products.slice(0, 8).map((product) => (
                    <div key={product.id}>
                      <ProductContainer product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="container-arrival-home"
                  style={{ marginRight: "0" }}
                >
                  <Loading page={"container"} />
                </div>
              )}
            </div>
          </section>
          <section className="second-section">
            <p>Handpicked Collections</p>
            <div className="container-grid-home">
              <Link to="/results/personal-care">
                <button className="content-grid-home">
                  <img src={perfume} alt="imagem perfume" />
                  <span>Personal Care</span>
                </button>
              </Link>
              <Link to="/results/Handbags">
                <button className="content-grid-home">
                  <img src={bolsa} alt="imagem perfume" />
                  <span>Handbags</span>
                </button>
              </Link>
              <Link to="/results/Watches">
                <button className="content-grid-home">
                  <img src={relogio} alt="imagem perfume" />
                  <span>Wrist Watches</span>
                </button>
              </Link>
              <Link to="/results/sunglasses">
                <button className="content-grid-home">
                  <img src={oculos} alt="imagem perfume" />
                  <span>Sunglasses</span>
                </button>
              </Link>
            </div>
          </section>
          <section>
            <div>
              <div className="title-brand-home">
                <span>Shop by Brands</span>
                <span>
                  <Link to="/results/viewall">
                    View All <img src={arrowView} alt="icone seta" />
                  </Link>
                </span>{" "}
              </div>
              <div className="container-brand-home">
                <Link to="/results/zara">
                  <div className="content-brand-home">
                    <img src={zara} alt="ZARA" />
                  </div>
                </Link>
                <Link to="/results/d&g">
                  <div className="content-brand-home">
                    <img src={DG} alt="D&G" />
                  </div>
                </Link>
                <Link to="/results/h&m">
                  <div className="content-brand-home">
                    <img src={HM} alt="H&m" />
                  </div>
                </Link>
                <Link to="/results/biba">
                  <div className="content-brand-home">
                    <img src={BIBA} alt="BIBA" />
                  </div>
                </Link>
                <Link to="/results/chanel">
                  <div className="content-brand-home">
                    <img src={CHANEL} alt="CHANEL" />
                  </div>
                </Link>
                <Link to="/results/prada">
                  <div className="content-brand-home">
                    <img src={PRADA} alt="PRADA" />
                  </div>
                </Link>
              </div>
            </div>
          </section>
          <div className="container-shortcut-home">
            <img src={shortcut} alt="card" />
            <div className="text-shortcut-home">
              <span>
                Discover your favrouite products faster with CORA’L web app.
              </span>
              <span>
                Add Shortcut <img src={shortcutIcon} alt="icone seta" />
              </span>
            </div>
          </div>
          <section className="fourth-section-home">
            <span className="title-makeup-home">Makeup & Skincare</span>
            <div className="container-makeup-home">
              <span>LIFESTYLE</span>
              <span>Makeup Accessories from Top Brands</span>
              <div className="button-makeup-home">
                <img src={arrowOrange} alt="icone seta" />
              </div>
            </div>
            <div className="grid-images-home">
              <div className="container-skincare-home">
                <span>Skincare Essentials</span>
                <div className="button-makeup-home">
                  <img src={arrowPink} alt="icone seta" />
                </div>
              </div>
              <div className="container-face-home">
                <span>Facepacks & Peels</span>
                <div className="button-makeup-home">
                  <img src={arrowBlue} alt="icone seta" />
                </div>
              </div>
            </div>
          </section>
          <section className="fifth-section-home">
            <span className="Trending-title-home">Trending Deals</span>
            <div className="container-Trending-home">
              <div className="hero-mobile-home" style={{ width: tamanhoTela }}>
                <img src={funkMob} alt="Carry your funk" />
                <img src={spring} alt="Carry your funk" />
                <img src={funkMob} alt="Carry your funk" />
              </div>
            </div>
          </section>
        </div>
      </main>

      <NavMob page="/" />
      <Footer />
    </div>
  );
};

export default Home;
