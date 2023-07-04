import React from 'react'
import "./footer.css"


function Footer() {
  return (
    <div className='container-footer'>
      <div className='coluna'>
        <h4>Shop by Category</h4>
        <Link to="/skincare">Skincare</Link>
        <a href="#">Personal Care</a>
        <a href="#">Handbags</a>
        <a href="#">Appareis</a>
        <a href="#">Watches</a>
        <a href="#">Eye Wear</a>
        <a href="#">Jewellery</a>
      </div>

      <div className='coluna'>
        <h4>About</h4>
        <a href="#">Contact Us</a>
        <a href="#">About Us</a>
        <a href="#">Careers</a>
        <a href="#">Press</a>
      </div>

      <div className='coluna'>
        <h4>Policy</h4>
        <a href="#">Return Policy</a>
        <a href="#">Terms of Use</a>
        <a href="#">Sitemap</a>
        <a href="#">Security</a>
        <a href="#">Security</a>
        <a href="#">EPR Compliance</a>
      </div>

      <div className='logos'>
        
      </div>
    </div>
  )
}

export default Footer