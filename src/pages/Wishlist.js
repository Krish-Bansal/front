import React, { useEffect } from 'react'
import Container from '../components/Container'
// import Meta from '../components/Meta'
// import BreadCrumb from '../components/BreadCrumb'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProductWishlist } from '../features/user/userSlice'
import nowish from "../assests1/no-results-found.png"
import { addToWishlist } from '../features/products/productSlice'
import { Link } from "react-router-dom"
import { useMediaQuery } from 'react-responsive';


const Wishlist = () => {
  const isSmall = useMediaQuery({ maxWidth: 575.98 });
  const isMiddle = useMediaQuery({ minWidth: 576, maxWidth: 991.98 });
  const colClass = isSmall ? 'col-6' : isMiddle ? 'col-4' : 'col-3';
  const getTokenFromLocalStorage = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")) : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
        }`,
      Accept: "application/json",
    },
  };
  const dispatch = useDispatch();
  useEffect(() => {
    getWishlistFromDb();
    // eslint-disable-next-line
  }, []);
  const getWishlistFromDb = () => {
    dispatch(getUserProductWishlist(config2))
  };
  const wishlistState = useSelector(state => state?.auth?.wishlist?.wishlist)
  const removeFromWishlist = (id, config) => {
    dispatch(addToWishlist({ id, config }));
    setTimeout(() => {
      dispatch(getUserProductWishlist(config2))
    }, 300)
  }

  return (
    <>
      {/* <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" /> */}
      <Container class1="wishlist-wrapper home-wrapper-2
       py-[7%]">
        <div className="row">
          {
            wishlistState && wishlistState.length === 0 &&
            <div className='flex justify-center align-items-center'>

              <div className='space-y-3 no-wish-contents'>
                <div>
                  <img src={nowish} alt="test" style={{ width: "50%", height: "50%" }} />
                </div>
                <h2>Your Wishlist is empty!</h2>
                <h3>seems like you don't have wishes here.<br />Make a wish!</h3>
                <div className='flex align-middle justify-around'>                  <Link to="/"><button>Continue to Shopping</button></Link>
                </div>

              </div>
            </div>



            // < div className='text-center text-lg'>
            //   div
            //   <img src="../assests1/no-results-found.png" alt="Picture" />
            //   You haven't wishlisted any products
            // </div>
          }
          {
            wishlistState && wishlistState?.map((item, index) => {
              return (
                <div className={colClass} key={index}>
                  <div className="wishlist-card position-relative">
                    <img onClick={() => {
                      removeFromWishlist(item?._id, config2);
                      getUserProductWishlist(config2)
                    }} src="images/cross.svg" alt="cross" className='position-absolute cross img-fluid' />
                    <div className="wishlist-card-image bg-white">
                      <img src={item?.images[0].url ? item?.images[0].url : "images/watch.jpg"} className='img-fluid  d-block mx-auto' alt="watch" width={160} />
                    </div>
                    <div className='px-[2%] py-[2%]'>
                      <h5 className="title">
                        {item?.title}
                      </h5>
                      <h6 className="price">{item?.price} </h6>
                    </div>
                  </div>
                </div>
              )
            })
          }

        </div>
      </Container >
    </>
  )
}

export default Wishlist
