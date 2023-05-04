import React from 'react';
import './Hero.css';
import { Carousel } from 'react-bootstrap';

const Hero = () => {
  return (
    <Carousel
    //  fade={true} interval={4000} className='custom-carousel'
    >
      <Carousel.Item>
        <div className='hero' style={{
          backgroundImage: `url(${require('../assests/299934016_606137061154381_4926188596946588395_n.jpg')})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center "
        }}>
          <div className='overlay'></div>
          <div className='content'>
            <p>Live In</p>
            <p>Linen Shirts</p>
            <p>Defy Lifestyle</p>
            <p>Made By Rebels For All Rebels</p>
            <button className='button'>Shop Now</button>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className='hero' style={{
          backgroundImage: `url(${require('../assests/281779478_293827942840968_522703434417999603_n.jpg')})`
        }}>
          <div className="overlay"></div>
          <div className='content'>
            <p>Live In</p>
            <p>Cotton Pants</p>
            <p>Embrace Simplicity</p>
            <p>Made For Comfort And Style</p>
            <button className='button'>Shop Now</button>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className='hero' style={{
          backgroundImage: `url(${require("../assests/174304971_162941172375004_4470709580256700664_n.jpg")})`
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
  );
};

export default Hero;
