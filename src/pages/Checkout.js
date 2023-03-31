import React from 'react'
import { Link } from 'react-router-dom'
import { BiArrowBack } from "react-icons/bi"
import watch from "../images/watch.jpg"
import Container from '../components/Container'

const Checkout = () => {
  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h1 className="website-name">
                Defy LifeStyle
              </h1>
              <nav style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/cart" className='text-dark total-price'>Cart</Link>
                  </li>
                  &nbsp;/
                  <li className='breadcrumb-item total-price active' aria-current="page">
                    Information
                  </li>
                  &nbsp;/
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp;/
                  <li className='breadcrumb-item total-price active' aria-current="page">
                    Payment                    </li>
                </ol>
              </nav>
              <h4 className="title total">
                Contact Information
              </h4>
              <p className="user-details total">
                Krish Bansal (skbansal907@gmail.com)
              </p>
              <h4 className='mb-3'>Shipping Address</h4>
              <form action="" className='d-flex gap-15 flex-wrap justify-content-between'>
                <div className='w-100'>
                  <select name="" id="" className='form-control form-select'>
                    <option value="" selected disabled>Select Country </option>

                  </select>
                </div>
                <div className='flex-grow-1'>
                  <input type="text" className="form-control" placeholder='First Name' />
                </div>
                <div className='flex-grow-1'>
                  <input type="text" className="form-control" placeholder='Last Name' />
                </div>
                <div className='w-100'>
                  <input type="text" className="form-control" placeholder='Address' />
                </div>
                <div className='w-100'>
                  <input type="text" className="form-control" placeholder='Apartment,Suite,etc' />
                </div>
                <div className='flex-grow-1'>
                  <input type="text" className="form-control" placeholder='City' />
                </div>
                <div className='flex-grow-1'>
                  <select name="" id="" className='form-control form-select'>
                    <option value="" selected disabled>Select State</option>
                  </select>
                </div>
                <div className='flex-grow-1'>
                  <input type="text" className="form-control" placeholder='ZIP Code' />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className='text-dark d-flex align-items-center'>
                      <BiArrowBack /> Return to Cart</Link>
                    <Link to="/cart" className="button">Continue to Shipping</Link>

                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className='border-bottom py-4'>
              <div className="d-flex gap-10 mb-2 align-items-center">
                <div className="w-75 d-flex gap-10">
                  <div className="w-25 position-relative">
                    <span className="badge bg-secondary text-white rounded-circle p-2 position-absolute" style={{ top: "-10px", right: "-2px" }}>1</span>
                    <img src={watch} alt="product" className='img-fluid' />
                  </div>
                  <div>
                    <h5 className='total-price'>agafaf</h5>
                    <p className='total-price'>asdasdasdadw</p>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className='total d-flex justify-content-end'>$100</h5>
                </div>
              </div>
            </div>
            <div className='border-bottom py-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='total'>Subtotal</p>
                <p className='total-price'>$1000</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className='mb-0 total'>Shipping</p>
                <p className='mb-0 total-price'>$10000</p>
              </div>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <h4 className='total'>Total</h4>
              <h5 className='total-price'>$10000</h5>

            </div>

          </div>
        </div>
      </Container>
    </>
  )
}

export default Checkout
