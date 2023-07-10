import NavMob from "../../components/NavMob";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

//Images
import funkMob from "../../assets/Img/funk.jpg";
import funkDesk from "../../assets/Img/heroFunk.jpg";
import bag from "../../assets/Img/image.jpg";
import perfume from "../../assets/Img/perfume.jpg";
import zara from "../../assets/Img/Zara_Logo 1.png";
import shortcut from "../../assets/Img/PWA-CTA.jpg";
import spring from "../../assets/Img/spring.jpg";

//Icons
import arrow from "../../assets/icons/Vector 1.svg";
import heart from "../../assets/icons/Vector.svg";
import skinCare from "../../assets/icons/icon-fill.svg";
import arrowOrange from "../../assets/icons/arrowOrange.svg";
import arrowBlue from "../../assets/icons/arroBlue.svg";
import arrowPink from "../../assets/icons/arrowPink.svg";
import arrowView from "../../assets/icons/viewAll.svg";
import shortcutIcon from "../../assets/icons/shortcutIcon.svg";

//Styles
import "./home.css";
import { useState, useEffect } from "react";

const Home = () => {
	const [tamanhoTela, setTamanhoTela] = useState(window.innerWidth - 15);
	useEffect(() => {
		const atualizarTamanhoTela = () => {
			setTamanhoTela(window.innerWidth - 15);
		};

		window.addEventListener("resize", atualizarTamanhoTela);

		return () => {
			window.removeEventListener("resize", atualizarTamanhoTela);
		};
	}, []);

	return (
		<div>
			<Header />

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
								<div className="container-categories-home">
									<div className="content-categorie-home">
										<img src={skinCare} alt="skincare icon" />
									</div>
									<span>Skincare</span>
								</div>
								<div className="container-categories-home">
									<div className="content-categorie-home">
										<img src={skinCare} alt="skincare icon" />
									</div>
									<span>Skincare</span>
								</div>
								<div className="container-categories-home">
									<div className="content-categorie-home">
										<img src={skinCare} alt="skincare icon" />
									</div>
									<span>Skincare</span>
								</div>
								<div className="container-categories-home">
									<div className="content-categorie-home">
										<img src={skinCare} alt="skincare icon" />
									</div>
									<span>Skincare</span>
								</div>
								<div className="container-categories-home">
									<div className="content-categorie-home">
										<img src={skinCare} alt="skincare icon" />
									</div>
									<span>Skincare</span>
								</div>
								<div className="container-categories-home">
									<div className="content-categorie-home">
										<img src={skinCare} alt="skincare icon" />
									</div>
									<span>Skincare</span>
								</div>
								<div className="container-categories-home">
									<div className="content-categorie-home">
										<img src={skinCare} alt="skincare icon" />
									</div>
									<span>Skincare</span>
								</div>
								<div className="container-categories-home">
									<div className="content-categorie-home">
										<img src={skinCare} alt="skincare icon" />
									</div>
									<span>Skincare</span>
								</div>
								<div className="container-categories-home">
									<div className="content-categorie-home">
										<img src={skinCare} alt="skincare icon" />
									</div>
									<span>Skincare</span>
								</div>
								<div className="container-categories-home">
									<div className="content-categorie-home">
										<img src={skinCare} alt="skincare icon" />
									</div>
									<span>Skincare</span>
								</div>
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

							<div
								className="container-arrival-home"
								style={{ width: tamanhoTela }}
							>
								<div>
									<img src={bag} alt="bolsa" />
									<div className="arrival-content-home">
										<div className="text-product-home">
											<span>Grande</span>
											<span>Blossom Pouch</span>
											<span>$39.49</span>
										</div>
										<img
											src={heart}
											alt="icone coração"
											width={16}
											height={16}
										/>
									</div>
								</div>
								<div>
									<img src={bag} alt="bolsa" />
									<div className="arrival-content-home">
										<div className="text-product-home">
											<span>Grande</span>
											<span>Blossom Pouch</span>
											<span>$39.49</span>
										</div>
										<img
											src={heart}
											alt="icone coração"
											width={16}
											height={16}
										/>
									</div>
								</div>
								<div>
									<img src={bag} alt="bolsa" />
									<div className="arrival-content-home">
										<div className="text-product-home">
											<span>Grande</span>
											<span>Blossom Pouch</span>
											<span>$39.49</span>
										</div>
										<img
											src={heart}
											alt="icone coração"
											width={16}
											height={16}
										/>
									</div>
								</div>
								<div>
									<img src={bag} alt="bolsa" />
									<div className="arrival-content-home">
										<div className="text-product-home">
											<span>Grande</span>
											<span>Blossom Pouch</span>
											<span>$39.49</span>
										</div>
										<img
											src={heart}
											alt="icone coração"
											width={16}
											height={16}
										/>
									</div>
								</div>
								<div>
									<img src={bag} alt="bolsa" />
									<div className="arrival-content-home">
										<div className="text-product-home">
											<span>Grande</span>
											<span>Blossom Pouch</span>
											<span>$39.49</span>
										</div>
										<img
											src={heart}
											alt="icone coração"
											width={16}
											height={16}
										/>
									</div>
								</div>
								<div>
									<img src={bag} alt="bolsa" />
									<div className="arrival-content-home">
										<div className="text-product-home">
											<span>Grande</span>
											<span>Blossom Pouch</span>
											<span>$39.49</span>
										</div>
										<img
											src={heart}
											alt="icone coração"
											width={16}
											height={16}
										/>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section className="second-section">
						<p>Handpicked Collections</p>
						<div className="container-grid-home">
							<div className="content-grid-home">
								<img src={perfume} alt="imagem perfume" />{" "}
								<span>Personal Care</span>
							</div>
							<div className="content-grid-home">
								<img src={perfume} alt="imagem perfume" />{" "}
								<span>Personal Care</span>
							</div>
							<div className="content-grid-home">
								<img src={perfume} alt="imagem perfume" />{" "}
								<span>Personal Care</span>
							</div>
							<div className="content-grid-home">
								<img src={perfume} alt="imagem perfume" />{" "}
								<span>Personal Care</span>
							</div>
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
									<img src={zara} alt="marca zara" />
								</div>
								<div className="content-brand-home">
									<img src={zara} alt="marca zara" />
								</div>
								<div className="content-brand-home">
									<img src={zara} alt="marca zara" />
								</div>
								<div className="content-brand-home">
									<img src={zara} alt="marca zara" />
								</div>
								<div className="content-brand-home">
									<img src={zara} alt="marca zara" />
								</div>
								<div className="content-brand-home">
									<img src={zara} alt="marca zara" />
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
