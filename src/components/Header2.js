
import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { CiShoppingCart, CiHeart, CiUser, CiSearch } from 'react-icons/ci'
import Logo from '../assests1/defy_logo-removebg-preview.png';
import { useSelector } from 'react-redux'
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css"
import "../styles.css"
import { MdOutlineClose } from 'react-icons/md';
import { CSSTransition } from 'react-transition-group';

const Header = () => {
  const [showTypeahead, setShowTypeahead] = useState(false);

  const handleSearchIconClick = () => {
    setShowTypeahead(!showTypeahead);
  };

  const handleCloseButtonClick = () => {
    setShowTypeahead(false);
  };

  const [color, setColor] = useState(false)
  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true)
    } else { setColor(false) }
  }

  window.addEventListener('scroll', changeColor)






  // const cartState = useSelector(state => state?.auth?.cartProducts);
  const productState = useSelector(state => state?.product?.product)
  const [productOpt, setProductOpt] = useState([])
  const authState = useSelector(state => state?.auth)
  // const [paginate, setPaginate] = useState(true);
  const navigate = useNavigate();
  // console.log(setPaginate)
  // useEffect(() => {
  //   let sum = 0
  //   for (let index = 0; index < cartState?.length; index++) {
  //     sum = sum + (Number(cartState[index].quantity) * cartState[index].price)
  //     setTotal(sum)
  //   }
  // }, [cartState])
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
      <header className={color ? 'header header-bg ' : 'header mt-4'
      }>
        <div className='mx-2'>
          <div className='row align-items-center'>
            <div className="col-6 flex justify-start">
              <NavLink to={'/'}><img src={Logo} alt="Defy logo" className={color ? 'lower-header-logo header-logo w-[60%]' : 'upper-header-logo header-logo w-[60%]'} /></NavLink>
            </div>
            <div className="col-6 px-[3%]">
              <div className="header-upper-links search-bar flex align-items-center justify-end gap-[4%]">
                <div className={color ? 'my-menu-class-light input-group' : 'my-menu-class-dark input-group'}>
                  <CSSTransition
                    in={showTypeahead}
                    timeout={300}
                    classNames="typeahead-animation"
                    unmountOnExit
                  >
                    <Typeahead
                      menuClassName={color ? 'my-menu-class-light' : 'my-menu-class-dark'}
                      id="pagination-example"
                      onPaginate={() => console.log("Results Paginated")}
                      onChange={(selected) => {
                        navigate(`/product/${selected[0].prod}`)
                      }}
                      options={productOpt}
                      minLength={2}
                      labelKey={"name"}
                      inputProps={{
                        style: { backgroundColor: 'inherit', color: color ? `black` : `white` },
                        placeholder: 'Search for products here...',
                        className: color ? 'typing-black' : "typing-white"
                      }}
                    />
                  </CSSTransition>
                  <span className='fs-2 bg-inherit'>
                    {showTypeahead ? (
                      <MdOutlineClose
                        className={color ? 'lower mt-[3%] ml-3 cursor-pointer mb-0' : 'upper mt-[3%] ml-3 mb-0 cursor-pointer'}
                        onClick={handleCloseButtonClick} />
                    ) : (
                      <CiSearch
                        className={color ? 'lower  mt-[3%] ml-3 cursor-pointer' : 'upper  mt-[3%] ml-3 cursor-pointer'}
                        onClick={handleSearchIconClick}
                      />
                    )}
                  </span>


                </div>
                <div>
                  <Link className='d-flex align-items-center text-black' to="/wishlist">
                    <CiHeart alt="heart" className={color ? 'lower fs-2' : 'upper fs-2'} />
                    {/* <p className='mb-0'>Favourite <br /> Wishlist
                    </p>  */}
                  </Link>
                </div>
                <div>
                  <Link className='d-flex align-items-center text-black' to={authState?.user === null ? "/login" : "/my-profile"}>
                    <CiUser alt="User" className={color ? 'lower fs-2' : 'upper fs-2'} />
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
                    <CiShoppingCart alt="Cart" className={color ? 'lower fs-2' : 'upper fs-2'} />
                    <div className='flex flex-col'>

                      {/* <span className='badge bg-white text-dark'>{cartState?.length ? cartState?.length : 0}</span> */}
                      {/* <p className='mb-0'>Rs {total ? total : 0}</p> */}

                    </div>
                  </Link>

                </div>

              </div>
            </div>
          </div>
        </div>
        {/* </nav> */}

      </header >
      <header className="header-bottom py-1 ">
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div className='menu-links'>
                  <div className=''>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/my-orders">My Orders</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    {authState?.user ? (
                      <NavLink><button onClick={handleLogout} className='text-uppercase text-white'>Logout</button></NavLink>

                    ) : null}
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



