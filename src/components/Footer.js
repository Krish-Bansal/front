import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoLogoInstagram, IoLogoFacebook } from "react-icons/io"


const Footer = () => {

  //First Column Starts Here
  const [isContactOpen, setIsContactOpen] = useState(false);
  useEffect(() => {
    // Open the contact section by default for screen sizes larger than 1200 pixels
    const screenWidth = window.innerWidth;
    if (screenWidth > 768) {
      setIsContactOpen(true);
    }
  }, []);
  const handleContactToggle = () => {
    setIsContactOpen(!isContactOpen);
  };
  //First Column Ends Here

  //Second Column Starts Here
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  useEffect(() => {
    // Open the contact section by default for screen sizes larger than 768 pixels
    const screenWidth = window.innerWidth;
    if (screenWidth > 768) {
      setIsPolicyOpen(true);
    }
  }, []);
  const [isPolicyVisible, setIsPolicyVisible] = useState(true);

  useEffect(() => {
    //Terms And Privacy invisible for Screen Size Larger than 768 Pixels
    const screenWidth = window.innerWidth;
    if (screenWidth > 768) {
      setIsPolicyVisible(false);
    }
  }, []);


  useEffect(() => {
    //Terms & Privacy Visible for Screen Size smaller than 768 Pixels
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      setIsPolicyVisible(true);
    }
  }, []);
  const handlePolicyToggle = () => {
    setIsPolicyOpen(!isPolicyOpen);
  };

  // Second Column Ends Here


  // Third Column Starts Here
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  useEffect(() => {
    // Open the contact section by default for screen sizes larger than 768 pixels
    const screenWidth = window.innerWidth;
    if (screenWidth > 768) {
      setIsLinkOpen(true);
    }
  }, []);
  const [isLinkVisible, setIsLinkVisible] = useState(true);

  useEffect(() => {
    //Links invisible for Screen Size Larger than 768 Pixels
    const screenWidth = window.innerWidth;
    if (screenWidth > 768) {
      setIsLinkVisible(false);
    }
  }, []);

  const handleLinkToggle = () => {
    setIsLinkOpen(!isLinkOpen);
  };
  // Third Column Ends Here

  // const [email, setEmail] = useState('');
  // const [placeholderActive, setPlaceholderActive] = useState(false);

  // const handleInputChange = (event) => {
  //   setEmail(event.target.value);
  //   setPlaceholderActive(event.target.value !== '');
  // };
  return (
    <>
      <footer className='py-3 footer-middle pt-5'>
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 col-md-6 contact-mobile">
              <h4 className="mb-3" onClick={handleContactToggle}>
                Contact Us
              </h4>
              {isContactOpen && (
                <div className="contact-info">
                  <p>
                    <span className="">Address:</span>
                    <address className="mb-2">
                      National Business Trade Center (NBTC), Khasibazar, 1<sup>st</sup> Floor, Shop No. 4138, Kathmandu, Nepal
                    </address>
                    <span>Call:</span>
                    <a href="tel:+9779813783811" className="mb-1 underline">
                      +9779813783811
                    </a>
                    <div>
                      <span>Email:</span>
                      <a href="mailto:skbansal907@gmail.com" className="mt-2 mb-3 underline">
                        skbansal907@gmail.com
                      </a>
                    </div>
                    <div className="social-icons fs-2">
                      <a href="https://www.instagram.com/defy.lifestyle/?hl=en">
                        <IoLogoInstagram />
                      </a>
                      <a href="https://www.facebook.com/defylifestyle/">
                        <IoLogoFacebook />
                      </a>
                    </div>
                  </p>
                </div>
              )}
            </div>
            <div className="col-12 col-md-3 ">

              <br />
              <div className="footer-link flex flex-col">
                {isPolicyVisible && (
                  <h4 className="mb-3" onClick={handlePolicyToggle}>
                    Terms & Policies
                  </h4>
                )}
                {isPolicyOpen && (
                  <>
                    <Link className="py-2 mb-1" to="privacy-policy">
                      Privacy Policy
                    </Link>
                    <Link className="py-2 mb-1" to="refund-policy">
                      Refund Policy
                    </Link>
                    <Link className="py-2 mb-1" to="shipping-policy">
                      Shipping Policy
                    </Link>
                    <Link className="py-2 mb-1" to="terms-conditions">
                      Terms & Conditions
                    </Link>
                  </>
                )}
              </div>

            </div>
            <div className="col-12 col-md-3">
              <br />
              <div className="footer-link flex flex-col">
                {isLinkVisible && (
                  <h4 className="mb-3" onClick={handleLinkToggle}>
                    Links
                  </h4>
                )}

                {isLinkOpen && (
                  <>
                    <Link className="py-2 mb-1" to="/about-us">
                      About Us
                    </Link>
                    <Link to="/my-orders" className="py-2 mb-1">
                      My Orders
                    </Link>
                    <Link className="py-2 mb-1" to="/contact">
                      Contact
                    </Link>
                    <Link to="/wishlist" className="py-2 mb-1">
                      My Wishlist
                    </Link>
                  </>
                )}
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
