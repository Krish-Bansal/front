import React from 'react';
import './Hero.css';
import { Carousel } from 'react-bootstrap';
import { Link } from "react-router-dom"


const Hero = () => {
  return (
    <div className='first-carousel'>
      <Carousel pause={false} interval={4000}
      //  fade={true} interval={4000} className='custom-carousel'
      >
        <Carousel.Item>
          <div className='hero' style={{
            backgroundImage: `url(${require('../assests/343291640_225935870131192_731814446337725818_n.jpg')})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom"
          }}>
            <div className='overlay'></div>
            <div className='content'>
              <p>Live In</p>
              <p>Linen Shirts</p>
              <p>Defy Lifestyle</p>
              <p>Made By Rebels For All Rebels</p>
              <Link to="shirt">
                <button className='button'>Shop Now
                </button></Link>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className='hero' style={{
            backgroundImage: `url(${require('../assests/350631947_1645595579201241_5208089084256699578_n.jpg')})`
          }}>
            <div className="overlay"></div>
            <div className='content'>
              <p>Live In</p>
              <p>Cotton Pants</p>
              <p>Embrace Simplicity</p>
              <p>Made For Comfort And Style</p>

              <Link to="pant">
                <button className='button'>Shop Now
                </button></Link>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className='hero' style={{
            backgroundImage: `url(${require("../assests/342396065_782557766760089_2525745211323850467_n.jpg")})`
          }}>
            <div className="overlay"></div>
            <div className='content'>
              <p>Live In</p>
              <p>Denim Shirts</p>
              <p>Rebel Spirit</p>
              <p>Made To Stand Out</p>
              <button className='button'>Shop Now</button>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>

  );
};

export default Hero;
