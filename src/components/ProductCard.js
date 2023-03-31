import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link, useLocation } from 'react-router-dom'
import wish from "../images/wish.svg"
import watch from "../images/watch.jpg"
import addcart from "../images/add-cart.svg"
import view from "../images/view.svg"
import tab2 from "../images/tab2.jpg"
import tab1 from "../images/tab.jpg"

const ProductCard = (props) => {
  const { grid } = props
  let location = useLocation();
  return (
    <>
      <div
        className={`${location.pathname == "/product" ? `gr-${grid}` : "col-3"}`}>
        <Link to={`${location.pathname == "/"
          ? "/product/:id"
          : location.pathname == "/product/:id"
            ? "/product/:id"
            : ":id"}`}
          className="product-card position-relative">
          <div className="wishlist-icon absolute">
            <button className='border-0 bg-transparent'>
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <img src={watch} className='img-fluid' alt="product image" />
            <img src={tab2} className='img-fluid' alt="product image" />

          </div>
          <div className="product-details">
            <h5 className="product-title">
              Kids Headphones bulk 10 pack multi colored for students
            </h5>
            <ReactStars count={5} size={24} activeColor='#ffd700' value={3} edit={false} />
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequatur voluptate expedita veniam pariatur officia dolor voluptatibus soluta minus? Possimus!
            </p>

            <p className="price">$100.00</p>
          </div>
          <div className="action-bar absolute">
            <div className="flex flex-col gap-15">
              <button className='border-0 bg-transparent'>
                <img src={view}
                  alt="view" />
              </button>
              <button className='border-0 bg-transparent'>
                <img src={addcart}
                  alt="addcart" />
              </button>

            </div>
          </div>
        </Link>
      </div>
      <div
        className={`${location.pathname == "/product" ? `gr-${grid}` : "col-3"}`}>
        <Link to={`${location.pathname == "/"
          ? "/product/:id"
          : location.pathname == "/product/:id"
            ? "/product/:id"
            : ":id"}`} className="product-card relative">
          <div className="wishlist-icon absolute">
            <button className='border-0 bg-transparent'>
              <img src={wish}
                alt="wishlist" /></button>
          </div>
          <div className="product-image">
            <img src={tab1} className='img-fluid' alt="product image" />
            <img src={tab2} className='img-fluid' alt="product image" />

          </div>
          <div className="product-details">
            <h5 className="product-title">
              Kids Headphones bulk 10 pack multi colored for students
            </h5>
            <ReactStars count={5} size={24} activeColor='#ffd700' value={3} edit={false} />
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequatur voluptate expedita veniam pariatur officia dolor voluptatibus soluta minus? Possimus!
            </p>
            <p className="price">$100.00</p>
          </div>
          <div className="action-bar absolute">
            <div className="flex flex-col gap-15">
              <button className='border-0 bg-transparent'>
                <img src={view} alt="view" />
              </button>
              <button className='border-0 bg-transparent'>
                <img src={addcart}
                  alt="addcart" />
              </button>

            </div>
          </div>
        </Link>
      </div>
    </>


  )
}

export default ProductCard
