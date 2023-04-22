import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link, useLocation } from 'react-router-dom'
import wish from "../images/wish.svg"
import addcart from "../images/add-cart.svg"
import view from "../images/view.svg"
import tab2 from "../images/tab2.jpg"
import { useDispatch } from 'react-redux'
import { addToWishlist } from '../features/products/productSlice'

const ProductCard = (props) => {
  const { grid, data } = props
  const dispatch = useDispatch();
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
              className={`${location.pathname == "/product" ? `gr-${grid}` : "col-3"}`}>
              <div

                className="product-card position-relative">
                <div className="wishlist-icon absolute">
                  <button className='border-0 bg-transparent' onClick={(e) => { addToWish(item?._id) }}>
                    <img src={wish} alt="wishlist" />
                  </button>
                </div>
                <div className="product-image">
                  <img src={item?.images[0]?.url} className='img-fluid d-block mx-auto' alt="product image" width={160} />
                  <img src={tab2} className='img-fluid' alt="product image" />

                </div>
                <div className="product-details">
                  <h5 className="product-title">
                    {item?.title}
                  </h5>
                  <ReactStars count={5} size={24} activeColor='#ffd700' value={item?.totalrating.toString()} edit={false} />
                  <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}
                    dangerouslySetInnerHTML={{ __html: item?.description }}>

                  </p>

                  <p className="price">Rs.{item?.price}</p>
                </div>
                <div className="action-bar absolute">
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
                </div>
              </div >
            </div >
          )
        })
      }

    </>
  )
}

export default ProductCard
