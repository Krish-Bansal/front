import React from 'react'
import { FaRegPaperPlane } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import { CiInstagram, CiFacebook } from 'react-icons/ci'

const Footer = () => {
  return (
    <>
      <footer className='py-3 bg-black'>
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data flex gap-20 align-middle text-white">
                <FaRegPaperPlane className='fs-4 ' />
                <h2 className='mb-0 '>Sign Up for NewsLetter</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group ">
                <input type="text" className="form-control py-1" placeholder='Your Email Address'
                  aria-label='Your Email Address'
                  aria-describedby='basic-addon2' />
                <span className='input-group-text p-2' >Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-3'>
        <div className="container-xxl">
          <div className="row">

            <div className="col-4">
              <h4 className='mb-4'> Contact Us</h4>
              <div>
                <address className='fs-6'> Hno : 277 near Vill chopal,
                  Sonipat,Haryana <br />
                  Pincode:131103
                </address>
                <a href='tel:+9779813783811' className='mt-3 mb-1 d-block '> +9779813783811
                </a>
                <a href='mailto:skbansal907@gmail.com' className='mt-3 d-block mb-3'> skbansal907@gmail.com
                </a>
                <div className='social-icons flex align-middle gap-10 fs-5'>
                  <a href="">
                    <CiInstagram />
                  </a>
                  <a href="">
                    <CiFacebook />
                  </a>


                </div>

              </div>
            </div>
            <div className="col-3">
              <h4 className='mb-4'> Information</h4>
              <div className='footer-link flex flex-col'>
                <Link className='py-2 mb-1' to="privacy-policy"> Privacy Policy</Link>
                <Link className='py-2 mb-1' to="refund-policy"> Refund Policy</Link>
                <Link className='py-2 mb-1' to="shipping-policy"> Shipping Policy</Link>
                <Link className='py-2 mb-1' to="terms-conditions"> Terms & Conditions</Link>

              </div>
            </div>
            <div className="col-3">
              <h4 className='mb-4'> Account</h4>
              <div className='footer-link flex flex-col'>
                <Link className='py-2 mb-1'> About Us</Link>
                <Link className='py-2 mb-1'> Faq</Link>
                <Link className='py-2 mb-1'> Contact</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className='mb-4'> Quick Links</h4>
              <div className='footer-link flex flex-col'>
                <Link className='py-2 mb-1'> Laptops</Link>
                <Link className='py-2 mb-1'> Tablets</Link>
                <Link className='py-2 mb-1'> Headphones</Link>
                <Link className='py-2 mb-1'> Watch</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-3 bg-black'>
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">&copy; {new Date().getFullYear()}: Made by Krish Bansal</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
