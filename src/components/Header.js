import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { CiShoppingCart, CiHeart, CiUser, CiSearch, CiMenuBurger } from 'react-icons/ci'
import Logo from '../assets/defy_logo-removebg-preview.png';
import { useDispatch, useSelector } from 'react-redux'
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css"

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };
  const dispatch = useDispatch();
  const cartState = useSelector(state => state?.auth?.cartProducts);
  const productState = useSelector(state => state?.product?.product)
  const [productOpt, setProductOpt] = useState([])
  const authState = useSelector(state => state?.auth)
  const [paginate, setPaginate] = useState(true);
  console.log(productState);
  const [total, setTotal] = useState(null)
  const navigate = useNavigate();
  useEffect(() => {
    let sum = 0
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + (Number(cartState[index].quantity) * cartState[index].price)
      setTotal(sum)
    }
  }, [cartState])
  useEffect(() => {
    let data = []
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title })

    }
    setProductOpt(data)
  }, [productState])


  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }
  return (
    <>
      <header className="header-top-strip bg-black text-white py-1  text-center">
        <p>made by rebels for all rebels</p>
      </header>
      <header className='header-upper py-[10px] '>
        <div className='mx-11'>
          <div className='row align-items-center'>
            <div className='col-3'>
              <CiMenuBurger alt="Menu" className='fs-2 cursor-pointer' onClick={handleMenuClick} />
            </div>
            {showMenu && (
              <div className='side-menu-container'>
                <p>123</p>
                <p>234</p>

              </div>
            )}
            <div className="col-6 flex justify-center">
              <NavLink to={'/'}><img src={Logo} alt="Defy logo" className='w-40 header-logo' /></NavLink>
            </div>
            {/* <div className="col-5 ">
              <div className="input-group mb-3 ">
                <Typeahead id="pagination-example" onPaginate={() => console.log("Results Paginated")}
                  onChange={(selected) => {
                    navigate(`/product/${selected[0].prod}`)
                  }}
                  options={productOpt}
                  minLength={2}
                  paginate={paginate}
                  labelKey={"name"}
                  placeholder='Search for products here...' />
                <span className='input-group-text p-2' id="basic-addon2"><CiSearch className='fs-6' />
                </span>
              </div>
            </div> */}
            <div className="col-3">
              <div className="header-upper-links flex align-items-center justify-end gap-[25px] ">
                <div>
                  <button className='d-flex align-items-center text-black'>
                    <CiSearch alt="Search" className='fs-2' />
                    {/* <p className='mb-0'>Search<br /> Products
                    </p> */}
                  </button>
                </div>
                <div>
                  <Link className='d-flex align-items-center text-black' to="/wishlist">
                    <CiHeart alt="heart" className='fs-2' />
                    {/* <p className='mb-0'>Favourite <br /> Wishlist
                    </p>  */}
                  </Link>
                </div>
                <div>
                  <Link className='d-flex align-items-center text-black' to={authState?.user === null ? "/login" : "/my-profile"}>
                    <CiUser alt="User" className='fs-2' />
                    {/* {
                      authState.user === null ?
                      //  <p className='mb-0'>Log in <br /> My Account</p>
                        : <p className='mb-0'>
                          Welcome {authState.user.firstname}
                        </p>
                    } */}

                  </Link>


                </div>
                <div>
                  <Link className='d-flex align-items-center text-black' to="/cart">
                    <CiShoppingCart alt="Cart" className="fs-2" />
                    <div className='flex flex-col gap-10'>
                      {/* <span className='badge bg-white text-dark'>{cartState?.length ? cartState?.length : 0}</span>
                      <p className='mb-0'>Rs {total ? total : 0}</p> */}

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

                <div className='menu-links'>
                  <div className='d-flex align-items-center gap-15'>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/my-orders">My Orders</NavLink>

                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <button onClick={handleLogout} className='text-uppercase text-white' style={{ fontSize: "14px" }}>Logout</button>

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
