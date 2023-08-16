import React from "react";

//Images
import heroImg from "../../assets/Img/hero.jpg";
import storyImg from "../../assets/Img/Rectangle 531.jpg";
import objImg from "../../assets/Img/Rectangle 532.jpg";
import visionImg from "../../assets/Img/Rectangle 533.jpg";

//Styles
import "./about.css";

//Components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NavMob from "../../components/NavMob";

const About = () => {
  return (
    <>
      <Header Page="About" />
      <main className="main-about">
        <div className="page-wrapper-about">
          <div className="hero-about">
            <div className="text-hero-about">
              <h1>ABOUT</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing. Lorem Ipsum is
                simply dummy text of the printing.
              </p>
              <img src={heroImg} alt="imagem hero" className="hero-img-about" />
            </div>
          </div>

          <div className="text-wrapper-about">
            <div className="text-about">
              <h5>Cora'l</h5>
              <p>
                Lorem Ipsum is simply dummy text of the printing. Lorem Ipsum is
                simply dummy text of the printing. Lorem Ipsum is simply dummy
                text of the printing. Lorem Ipsum is simply dummy text of the
                printing. Lorem Ipsum is simply dummy text of the printing.
                Lorem Ipsum is simply dummy text of the printing.
              </p>
            </div>
            <div className="subtitle-about">
              <img src={storyImg} alt="Imagem de Sacolas" />
              <h5>Our Story</h5>
              <p>
                Lorem Ipsum is simply dummy text of the printing. Lorem Ipsum is
                simply dummy text of the printing. Lorem Ipsum is simply dummy
                text of the printing. Lorem Ipsum is simply dummy text of the
                printing. Lorem Ipsum is simply dummy text of the printing.
                Lorem Ipsum is simply dummy text of the printing.
              </p>
            </div>
            <div className="subtitle-about">
              <img src={objImg} alt="Imagem Relogio" id="img-left-about" />
              <h5 id="title-about">Our Objective</h5>
              <p id="p-about">
                {" "}
                Lorem Ipsum is simply dummy text of the printing. Lorem Ipsum is
                simply dummy text of the printing. Lorem Ipsum is simply dummy
                text of the printing. Lorem Ipsum is simply dummy text of the
                printing. Lorem Ipsum is simply dummy text of the printing.
                Lorem Ipsum is simply dummy text of the printing.
              </p>
              <span>
                Lorem Ipsum is simply dummy text of the printing. Lorem Ipsum is
                simply dummy text of the printing. Lorem Ipsum is simply dummy
                text of the printing. Lorem Ipsum is simply dummy text of the
                printing. Lorem Ipsum is simply dummy text of the printing.
                Lorem Ipsum is simply dummy text of the printing.
              </span>
            </div>
            <div className="subtitle-about">
              <img src={visionImg} alt="Imagem Oculos" />
              <h5 id="vision-about">Our Vision</h5>
              <p>
                Lorem Ipsum is simply dummy text of the printing. Lorem Ipsum is
                simply dummy text of the printing. Lorem Ipsum is simply dummy
                text of the printing. Lorem Ipsum is simply dummy text of the
                printing. Lorem Ipsum is simply dummy text of the printing.
                Lorem Ipsum is simply dummy text of the printing.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <NavMob page="/#" />
    </>
  );
};

export default About;
