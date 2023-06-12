import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoLogoInstagram, IoLogoFacebook } from "react-icons/io"
import { useMediaQuery } from 'react-responsive';


const Footer = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const isMobile = !isDesktop;

  // First Column Starts Here
  const [isContactOpen, setIsContactOpen] = useState(isDesktop);
  const handleContactToggle = () => {
    setIsContactOpen(!isContactOpen);
  };
  // First Column Ends Here

  // Second Column Starts Here
  const [isPolicyOpen, setIsPolicyOpen] = useState(isDesktop);
  const [isPolicyVisible, setIsPolicyVisible] = useState(isMobile);

  useEffect(() => {
    setIsPolicyVisible(isMobile);
  }, [isMobile]);

  const handlePolicyToggle = () => {
    setIsPolicyOpen(!isPolicyOpen);
  };
  // Second Column Ends Here

  // Third Column Starts Here
  const [isLinkOpen, setIsLinkOpen] = useState(isDesktop);
  const [isLinkVisible, setIsLinkVisible] = useState(isMobile);

  useEffect(() => {
    setIsLinkVisible(isMobile);
  }, [isMobile]);

  const handleLinkToggle = () => {
    setIsLinkOpen(!isLinkOpen);
  };
  // Third Column Ends Here

  // Third Column Ends Here

  // const [email, setEmail] = useState('');
  // const [placeholderActive, setPlaceholderActive] = useState(false);

  // const handleInputChange = (event) => {
  //   setEmail(event.target.value);
  //   setPlaceholderActive(event.target.value !== '');
  // };
  return (
    <>
      <footer className='footer-middle'>
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="footer-link flex flex-col">
                <h4 className="mb-[1%] cursor-pointer" onClick={handleContactToggle}>
                  Contact Us
                </h4>
                <div className={isContactOpen ? "link-container open" : "link-container"}>
                  <div className="link-item">
                    <span className="">Address:</span>
                    <address className="mb-2">
                      National Business Trade Center (NBTC), Khasibazar, 1<sup>st</sup> Floor, Shop No. 4138, Kathmandu, Nepal
                    </address>
                  </div>
                  <div className="link-item">
                    <span>Call:</span>
                    <a href="tel:+9779813783811" className="mb-1 underline">
                      +9779813783811
                    </a>
                  </div>
                  <div className="link-item">
                    <span>Email:</span>
                    <a href="mailto:skbansal907@gmail.com" className="mt-2 mb-3 underline">
                      skbansal907@gmail.com
                    </a>
                  </div>
                  <div className="link-item">
                    <a href="https://www.instagram.com/defy.lifestyle/?hl=en" className='fs-2'>
                      <IoLogoInstagram />
                    </a>
                    <a href="https://www.facebook.com/defylifestyle/" className='fs-2'>
                      <IoLogoFacebook />
                    </a>
                  </div>
                </div>
              </div>

            </div>


            <div className="col-12 col-md-3">
              <br />

              <div className="footer-link flex flex-col">
                {isPolicyVisible && (
                  <h4 className="mb-[1%] cursor-pointer" onClick={handlePolicyToggle}>
                    Terms & Policies
                  </h4>
                )}

                <div className={isPolicyOpen ? "link-container open" : "link-container"}>
                  <div className="link-item">
                    <Link className="py-2 mb-1" to="privacy-policy">
                      Privacy Policy
                    </Link>
                  </div>
                  <div className="link-item">
                    <Link className="py-2 mb-1" to="refund-policy">
                      Refund Policy
                    </Link>
                  </div>
                  <div className="link-item">
                    <Link className="py-2 mb-1" to="shipping-policy">
                      Shipping Policy
                    </Link>
                  </div>
                  <div className="link-item">
                    <Link className="py-2 mb-1" to="terms-conditions">
                      Terms & Conditions
                    </Link>
                  </div>
                </div>
              </div>



            </div>
            <div className="col-12 col-md-3">
              <br />

              <div className="footer-link flex flex-col">
                {isLinkVisible && (
                  <h4 className="mb-[1%] cursor-pointer" onClick={handleLinkToggle}>
                    Links
                  </h4>
                )}

                <div className={isLinkOpen ? "link-container open" : "link-container"}>
                  <div className="link-item">
                    <Link className="py-2 mb-1" to="/about-us">
                      About Us
                    </Link>
                  </div>
                  <div className="link-item">
                    <Link className="py-2 mb-1" to="/my-orders">
                      My Orders
                    </Link>
                  </div>
                  <div className="link-item">
                    <Link className="py-2 mb-1" to="/contact">
                      Contact
                    </Link>
                  </div>
                  <div className="link-item">
                    <Link className="py-2 mb-1" to="/wishlist">
                      My Wishlist
                    </Link>
                  </div>
                </div>
              </div>



            </div>
          </div>
        </div>
      </footer>
      <footer className='py-2 bg-white footer-bottom '>
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-2 mt-1 text-black">&copy; {new Date().getFullYear()} DEFY | All Rights Reserved </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
