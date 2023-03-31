import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { BsSearch, } from 'react-icons/bs'
import { CiBoxes } from 'react-icons/ci'
import { CiShoppingCart, CiHeart, CiUser } from 'react-icons/ci'
import Logo from '../assets/defy_logo-removebg-preview.png';

const Header = () => {
  return (
    <>
      <header className="header-top-strip bg-black text-white py-2 text-center">
        <p>MADE BY REBELS FOR ALL REBELS</p>
      </header>
      <header className='header-upper py-3'>
        <div className='container-xxl'>
          <div className='row align-items-center'>
            <div className='col-2'>

              <NavLink to={'/'}><img src={Logo} alt="Defy logo" className='w-40 header-logo' /></NavLink>

            </div>
            <div className="col-5 ">
              <div className="input-group mb-3 ">
                <input type="text" className="form-control py-2" placeholder='Search Products Here...'
                  aria-label='Search Products Here...'
                  aria-describedby='basic-addon2' />
                <span className='input-group-text p-2' id="basic-addon2"><BsSearch className='fs-6' />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links flex align-items-center justify-around">
                <div>
                  <Link className='d-flex align-items-center gap-10 text-black' to="/wishlist">
                    <CiHeart alt="heart" className='fs-2' />
                    <p className='mb-0'>Favourite <br /> Wishlist

                    </p>
                  </Link>


                </div>
                <div>
                  <Link className='d-flex align-items-center gap-10 text-black' to="/login">
                    <CiUser alt="User" className='fs-2' />
                    <p className='mb-0'>Log in <br /> My Account

                    </p>
                  </Link>


                </div>
                <div>
                  <Link className='d-flex align-items-center gap-10 text-black' to="/cart">
                    <CiShoppingCart alt="Cart" className="fs-2" />
                    <div className='flex flex-col gap-10'>
                      <span className='badge bg-white text-dark'>0</span>
                      <p className='mb-0'>$ 500</p>

                    </div>
                  </Link>

                </div>

              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-1 ">
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className='dropdown'>
                    <button className='btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center'
                      type='button'
                      id='dropdownMenuButton1'
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <CiBoxes />
                      <span className='me-5 d-inline-block'
                      >Shop Categories</span>
                    </button>
                    <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                      <li>
                        <Link className='dropdown-item' to='#'>Rocket
                        </Link></li>
                      <li>
                        <Link className='dropdown-item' to='#'>Beta</Link></li>
                      <li>
                        <Link className='dropdown-item' to='#'>Raju Peter</Link></li>

                    </ul>
                  </div>

                </div>
                <div className='menu-links'>
                  <div className='d-flex align-items-center gap-15'>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/contact">Contact</NavLink>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;
