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

const Home = () => {
	const { products } = useContext(ProductContext);
	const [tamanhoTela, setTamanhoTela] = useState(window.innerWidth - 37);
	const [loading, setLoading] = useState(true);

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
			setLoading(false);
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
							<button className="button-hero-home">
								<img src={arrow}></img>
								<span>See More</span>
							</button>
						</div>
						<div className="categories-home">
							<span>Top Categories</span>
							<div
								className="categories-select-home"
								style={{ width: tamanhoTela }}
							>
								<button className="container-categories-home">
									<div className="content-categorie-home">
										<img src={skinCare} alt="skincare icon" />
									</div>
									<span>Skincare</span>
								</button>
								<button className="container-categories-home">
									<div className="content-categorie-home">
										<img src={jewellery} alt="skincare icon" />
									</div>
									<span>Jewellery</span>
								</button>
								<button className="container-categories-home">
									<div className="content-categorie-home">
										<img src={handbag} alt="skincare icon" />
									</div>
									<span>Handbags</span>
								</button>
								<button className="container-categories-home">
									<div className="content-categorie-home">
										<img src={watches} alt="skincare icon" />
									</div>
									<span>Watches</span>
								</button>
								<button className="container-categories-home">
									<div className="content-categorie-home">
										<BsEyeglasses color="#1b4b64" fontSize="32px" />
									</div>
									<span>Eyewera</span>
								</button>
								<button className="container-categories-home">
									<div className="content-categorie-home">
										<GiPerfumeBottle color="#1b4b64" fontSize="32px" />
									</div>
									<span>Fragrance</span>
								</button>
							</div>
						</div>
						<div className="container-arrival-title-home">
							<div className="arrival-title-home">
								<span>New Arrivals</span>
								<span>
									<a>
										View All <img src={arrowView} alt="icone seta" />
									</a>
								</span>
							</div>

							{!loading && products.length > 0 ? (
								<div
									className="container-arrival-home"
									style={{ width: tamanhoTela }}
								>
									{products.slice(0, 8).map((product) => (
										<Link to={`/product/${product.id}`} key={product.id}>
											<ProductContainer product={product} />
										</Link>
									))}
								</div>
							) : (
								<div>Loading</div>
							)}
						</div>
					</section>
					<section className="second-section">
						<p>Handpicked Collections</p>
						<div className="container-grid-home">
							<button className="content-grid-home">
								<img src={perfume} alt="imagem perfume" />
								<span>Personal Care</span>
							</button>
							<button className="content-grid-home">
								<img src={bolsa} alt="imagem perfume" />
								<span>Handbags</span>
							</button>
							<button className="content-grid-home">
								<img src={relogio} alt="imagem perfume" />
								<span>Wrist Watches</span>
							</button>
							<button className="content-grid-home">
								<img src={oculos} alt="imagem perfume" />
								<span>Sunglasses</span>
							</button>
						</div>
					</section>
					<section>
						<div>
							<div className="title-brand-home">
								<span>Shop by Brands</span>
								<span>
									<a>
										View All <img src={arrowView} alt="icone seta" />
									</a>
								</span>{" "}
							</div>
							<div className="container-brand-home">
								<div className="content-brand-home">
									<img src={zara} alt="ZARA" />
								</div>
								<div className="content-brand-home">
									<img src={DG} alt="D&G" />
								</div>
								<div className="content-brand-home">
									<img src={HM} alt="H&m" />
								</div>
								<div className="content-brand-home">
									<img src={BIBA} alt="BIBA" />
								</div>
								<div className="content-brand-home">
									<img src={CHANEL} alt="CHANEL" />
								</div>
								<div className="content-brand-home">
									<img src={PRADA} alt="PRADA" />
								</div>
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
						<span className="trending-title-home">Trending Deals</span>
						<div className="container-trending-home">
							<div className="hero-mobile-home" style={{ width: tamanhoTela }}>
								<img src={funkMob} alt="Carry your funk" />
								<img src={spring} alt="Carry your funk" />
								<img src={funkMob} alt="Carry your funk" />
							</div>
						</div>
					</section>
				</div>
			</main>

			<NavMob />
			<Footer />
		</div>
	);
};

export default Home;
