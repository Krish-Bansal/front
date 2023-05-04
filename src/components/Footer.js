import React, { useState } from 'react'
import { FaRegPaperPlane } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import { IoLogoInstagram, IoLogoFacebook } from "react-icons/io"
import { CiMail } from "react-icons/ci"


const Footer = () => {
  const [email, setEmail] = useState('');
  const [placeholderActive, setPlaceholderActive] = useState(false);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
    setPlaceholderActive(event.target.value !== '');
  };
  return (
    <>
      <footer className='py-3 footer-middle pt-5'>
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className='mb-3'> Contact Us</h4>
              <p>

                <span>Address:</span>
                <address className='mb-2'> National Business Trade Center(NBTC),Khasibazar,1<sup>st</sup> Floor,Shop No.4138,Kathmandu,Nepal </address>


                <span>Call: </span><a href='tel:+9779813783811' className='mb-1 underline'> +9779813783811 </a>
                <div>
                  <span>Email: </span>
                  <a href='mailto:skbansal907@gmail.com' className='mt-2 mb-3 underline'> skbansal907@gmail.com
                  </a>
                </div>

                <div className='social-icons flex align-middle gap-10 fs-2'>
                  <a href="">
                    <IoLogoInstagram />
                  </a>
                  <a href="">
                    <IoLogoFacebook />
                  </a>


                </div>

              </p>
            </div>
            <div className="col-2">
              <br />
              <div className='footer-link flex flex-col'>
                <Link className='py-2 mb-1' to="privacy-policy"> Privacy Policy</Link>
                <Link className='py-2 mb-1' to="refund-policy"> Refund Policy</Link>
                <Link className='py-2 mb-1' to="shipping-policy"> Shipping Policy</Link>
                <Link className='py-2 mb-1' to="terms-conditions"> Terms & Conditions</Link>

              </div>
            </div>
            <div className="col-2">
              <br />
              <div className='footer-link flex flex-col'>
                <Link className='py-2 mb-1'> About Us</Link>
                <Link to="/my-orders" className='py-2 mb-1'>My Orders</Link>
                <Link className='py-2 mb-1'> Contact</Link>
                <Link to="/wishlist" className='py-2 mb-1'>My Wishlist</Link>



              </div>
            </div>
            <div className="col-4">
              <h4 className='mb-4'> sign up and save</h4>
              <div className='flex flex-col'>
                <p className='py-2 mb-1'>Sign up now and be the first to know about exclusive offers,latest fashion trends & style tips!</p>

                <div className="input-group">
                  <input type="text" className="form-control py-2 border-none underline2" placeholder="Enter Your Email" value={email} onChange={handleInputChange} />
                  {placeholderActive ? <button type="submit" className="p-1" onClick={() => console.log("subscribe")}>Subscribe</button> :
                    <div className="mt-1 ">
                      <CiMail className="fs-3" />
                    </div>}


                </div>

              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-3 bg-white footer-bottom '>
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-8 mt-1 text-black">&copy; {new Date().getFullYear()} DEFY | All Rights Reserved </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
