import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import wish from "../images/wish.svg"
import addcart from "../images/add-cart.svg"
import view from "../images/view.svg"
import { useDispatch } from 'react-redux'
import { addToWishlist } from '../features/products/productSlice'
import { IoMdHeartEmpty } from "react-icons/io"
import { AiOutlineHeart } from "react-icons/ai"

const ProductCard = (props) => {
  const { grid, data } = props
  const dispatch = useDispatch();
  const navigate = useNavigate()
  let location = useLocation();
  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };
  return (
    <>
      {
        data && data?.map((item, index) => {
          return (
            <div
              key={index}
              className={`${location.pathname == "/product" ? `gr-${grid} cursor-pointer` : "col-3 cursor-pointer"}`}
              onClick={() => {
                navigate("/product/" + item?._id);
                window.scrollTo(0, 0);
              }}>
              <div
                className="product-card position-relative">
                <div className='absolute wish-icon-box cursor-pointer' onClick={(e) => {
                  addToWish(item?._id);
                  navigate("/wishlist");
                  e.stopPropagation()
                }}>
                  <AiOutlineHeart className='fs-4' />
                </div>
                {/* <div className="wishlist-icon absolute">
                  <button className='m-0 p-0' onClick={(e) => { addToWish(item?._id) }}>
                    <IoMdHeartEmpty className='m-0 p-0 fs-3 text-center' />
                    <img src={wish} alt="wishlist" />
                  </button>
                </div> */}
                <div className="product-image">
                  <img src={item?.images[0]?.url} className='img-fluid d-block mx-auto' alt="product image" width={160} />
                  <img src={item?.images[1]?.url} className='img-fluid' alt="product image" />
                </div>
                <div className="product-details">
                  <h5 className="product-title">
                    {item?.title}
                  </h5>
                  {/* <ReactStars count={5} size={24} activeColor='#ffd700' value={item?.totalrating.toString()} edit={false} /> */}
                  <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}
                    dangerouslySetInnerHTML={{ __html: item?.description }}>
                  </p>
                  <p className="price">Rs.{item?.price}</p>
                </div>

                {/* <Link to={'/product/' + item?._id}> */}

                {/* <div className="action-bar absolute">
                  <div className="flex flex-col gap-15">
                    <Link className='border-0 bg-transparent' to={'/product/' + item?._id}>
                      <img src={view}
                        alt="view" />
                    </Link>
                    <button className='border-0 bg-transparent'>
                      <img src={addcart}
                        alt="addcart" />
                    </button>

                  </div>
                </div> */}
                {/* </Link> */}


              </div >

            </div >
          )
        })
      }

    </>
  )
}

export default ProductCard
