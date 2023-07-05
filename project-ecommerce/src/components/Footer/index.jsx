import { useState, useEffect } from 'react'
import "./footer.css"
import Router from '../../Routes/routes'
import { Link, BrowserRouter } from 'react-router-dom'
import FB from "./imgFooter/fbLogo.svg"
import Insta from "./imgFooter/instaLogo.svg"
import Twitter from "./imgFooter/twitter.svg"
import Youtube from "./imgFooter/youtube.svg"
import Point from "./imgFooter/location.svg"

function Footer() {

  const [tamanhoTela, setTamanhoTela] = useState(window.innerWidth);

  useEffect(() => {
    const atualizarTamanhoTela = () => {
      setTamanhoTela(window.innerWidth);
    };

    window.addEventListener('resize', atualizarTamanhoTela);

    return () => {
      window.removeEventListener('resize', atualizarTamanhoTela);
    };
  }, []);

  return (
    <div className='container-footer'>

      <div className='coluna-footer mob-footer'>
        <h4>Shop by Category</h4>
        <Link to="/skincare">Skincare</Link>
        <Link href="/">Personal Care</Link>
        <Link href="/">Handbags</Link>
        <Link href="/">Appareis</Link>
        <Link href="/">Watches</Link>
        <Link href="/">Eye Wear</Link>
        <Link href="/">Jewellery</Link>
      </div>

      {tamanhoTela < 1077 ? (
        <div className='coluna-footer about-footer'>
          <h4>About</h4>
          <div className='mob-policy'>
            <p> <Link to="/">Contact Us</Link> | <Link to="/">About Us</Link> | <Link to="/">Careers</Link> | <Link to="/">Press</Link> </p>
          </div>
        </div>
      ) : (
        <div className='coluna-footer about-footer'>
          <h4>About</h4>
          <Link href="/">Contact Us</Link>
          <Link href="/">About Us</Link>
          <Link href="/">Careers</Link>
          <Link href="/">Press</Link>
        </div >
      )
      }

      {tamanhoTela < 1077 ? (
        <hr className='linha-footer' />
      ) : null}

      {
        tamanhoTela < 1077 ? (
          <div className='coluna-footer policy-footer'>
            <h4>Policy</h4>
            <div className='mob-policy'>
              <p> <Link href="">Return</Link> | <Link href="">Terms of use</Link> | <Link href="">Sitemap</Link> | <Link href="">Security</Link> | <Link href="">Privacy</Link> | <Link href="">EPR Compliance</Link></p>
            </div>
          </div>
        ) : (
          <div className='coluna-footer'>
            <h4>Policy</h4>
            <Link href="/">Return Policy</Link>
            <Link href="/">Terms of Use</Link>
            <Link href="/">Sitemap</Link>
            <Link href="/">Security</Link>
            <Link href="/">Security</Link>
            <Link href="/">EPR Compliance</Link>
          </div>
        )
      }

      <div className='Logos-footer'>
        <img src={FB} alt="" />
        <img src={Insta} alt="" />
        <img src={Twitter} alt="" />
        <img src={Youtube} alt="" />
      </div>

      <div className='location-footer'>
        <img src={Point} alt="" />
        <p className=''>United States</p>
      </div>

      <p className='RightsReserved'>© 2021 | Cora Leviene All Rights Reserved</p>

    </div >
  )
}

export default Footer