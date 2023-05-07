import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const SpecialProduct = (props) => {
  const { title, totalrating, price, sold, quantity, id, image } = props;
  // const productState = useSelector((state) => state?.product?.product)
  return (
    <div className='col-6 mb-3'>
      <div className="special-product-card">
        <div className="flex justify-between">
          <div className='special-image'>
            <img src={image} alt="watch" className='img-fluid' />
          </div>
          <div className='special-product-content'>
            <h6 className="title">
              {title}
            </h6>
            <ReactStars count={5} size={24} value={totalrating} edit={false} activeColor="#ffd700" />
            <p className="price">
              <span className="red-p">Rs.{price}</span> &nbsp;
              {/* <strike>$200</strike> */}
            </p>
            {/* <div className="discount-till d-flex align-items-center gap-10">
              <p className='mb-0'>
                <b>5 </b>days
              </p>
              <div className="d-flex gap-10 align-items-center">
                <span className='badge rounded-circle p-2 bg-danger'>1</span>:
                <span className='badge rounded-circle p-2 bg-danger'>1</span>:
                <span className='badge rounded-circle p-2 bg-danger'>1</span>
              </div>

            </div> */}
            <div className="prod-count my-3">
              <p>Products: {quantity}</p>
              <div className="progress">
                <div className="progress-bar"
                  role="progressbar"
                  style={{ width: quantity / quantity + sold * 100 + "%" }}
                  aria-valuenow={quantity / quantity + sold * 100}
                  aria-valuemin={quantity}
                  aria-valuemax={sold + quantity}>

                </div>
              </div>
            </div>
            <Link className='button' to={"/product/" + id}>View</Link>


          </div>

        </div>
      </div>
    </div>
  )
}

export default SpecialProduct
