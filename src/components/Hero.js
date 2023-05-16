import React from 'react';
import './Hero.css';
import { Carousel } from 'react-bootstrap';
import { Link } from "react-router-dom"
import { base_url } from '../utils/axiosConfig';
import axios from "axios"
// const handleShopNowClick2 = async () => {
//   try {
//     const response = await axios.get(`${base_url}product?category=Pant`);
//     const products = response.data;
//     // Sort the products by category "Shirt"
//     const sortedProducts = products.filter(product => product.category === 'Pant');
//     // Handle the sorted products as needed
//     console.log(sortedProducts);
//   } catch (error) {
//     // Handle any errors
//     console.error(error);
//   }
// };

const Hero = () => {
  return (
    <Carousel pause={false} interval={5000}
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

            <Link to="product?category=Pant">
              <button className='button'>Shop Now
              </button></Link>
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
