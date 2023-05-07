import React, { useEffect } from 'react'
import Container from '../components/Container'
// import Meta from '../components/Meta'
// import BreadCrumb from '../components/BreadCrumb'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProductWishlist } from '../features/user/userSlice'
import nowish from "../assests1/no-results-found.png"
import { addToWishlist } from '../features/products/productSlice'
import { Link } from "react-router-dom"

const Wishlist = () => {
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
  }, []);
  const getWishlistFromDb = () => {
    dispatch(getUserProductWishlist())
  };
  const wishlistState = useSelector(state => state?.auth?.wishlist?.wishlist)
  const removeFromWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist(config2))
    }, 300)
  }

  return (
    <>
      {/* <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" /> */}
      <Container class1="wishlist-wrapper home-wrapper-2
       py-5">
        <div className="row">
          {
            wishlistState && wishlistState.length === 0 &&
            <div className='flex justify-center align-items-center'>
              <div>
                <img src={nowish} alt="test" width={320} height={320} />
              </div>
              <div className='space-y-3 no-wish-contents'>
                <h2>Your Wishlist is empty!</h2>
                <h3>seems like you don't have wishes here.<br />Make a wish!</h3>
                <Link to="/"><button>Continue to Shopping</button></Link>
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
                <div className="col-3" key={index}>
                  <div className="wishlist-card position-relative">
                    <img onClick={() => {
                      removeFromWishlist(item?._id);
                      getUserProductWishlist(config2)
                    }} src="images/cross.svg" alt="cross" className='position-absolute cross img-fluid' />
                    <div className="wishlist-card-image bg-white">
                      <img src={item?.images[0].url ? item?.images[0].url : "images/watch.jpg"} className='img-fluid  d-block mx-auto' alt="watch" width={160} />
                    </div>
                    <div className='px-3 py-3'>
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
