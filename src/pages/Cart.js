import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta'
import { AiFillDelete } from "react-icons/ai"
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartProduct, getUserCart, updateCartProduct } from '../features/user/userSlice'
import { useMediaQuery } from 'react-responsive';

const Cart = () => {

  const isDesktop = useMediaQuery({ minWidth: 768 });
  const isMobile = !isDesktop;
  const fontSize = isMobile ? '12px' : 'inherit';
  const getTokenFromLocalStorage = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")) : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
        }`,
      Accept: "application/json",
    },
  };

  const dispatch = useDispatch();
  const [ProductUpdateDetail, setProductUpdateDetail] = useState(null)
  const [totalAmount, setTotalAmount] = useState(null)
  const userCartState = useSelector(state => state.auth.cartProducts)
  useEffect(() => {
    dispatch(getUserCart(config2))
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    if (ProductUpdateDetail !== null) {
      dispatch(updateCartProduct({ cartItemId: ProductUpdateDetail?.cartItemId, quantity: ProductUpdateDetail?.quantity, config2: config2 }))
      setTimeout(() => {
        dispatch(getUserCart(config2))
      }, 200)

    }
    // eslint-disable-next-line
  }, [ProductUpdateDetail])

  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct({ id: id, config2: config2 }))
    setTimeout(() => {
      dispatch(getUserCart(config2))
    }, 200)
  }

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      sum = sum + (Number(userCartState[index].quantity) * userCartState[index].price)
      setTotalAmount(sum)
    }

  }, [userCartState])
  return (
    <>
      <Meta title={"Cart"} />
      {/* <BreadCrumb title="Cart" /> */}
      <Container class1="cart-wrapper home-wrapper-2 pb-5">
        <div className="row">
          {userCartState && userCartState.length === 0 && (
            <div className='flex justify-center align-items-center'>
              <div className='no-wish-contents'>
                <div classname="lottie">
                  <lottie-player src="https://assets1.lottiefiles.com/private_files/lf30_oqpbtola.json" background="transparent" speed="1" style={{ width: "50%", height: "50%" }} loop autoplay></lottie-player>
                </div>
                <h2>Your Cart is empty!</h2>
                <h3>Add something to make me happy :)</h3>
                <div className='flex align-middle justify-around'>
                  <Link to="/product"><button >Continue to Shopping</button></Link>
                </div>
              </div>
            </div>
          )}
          {userCartState && userCartState.length > 0 && (
            <>
              <div className="col-12">
                <div className='cart-header d-flex justify-content-between align-items-center py-[1.5%] mt-[1%]'>
                  <h4 className='cart-col-1'>Product</h4>
                  <h4 className='cart-col-2'>Price</h4>
                  <h4 className='cart-col-3'>Quantity</h4>
                  <h4 className='cart-col-4'>Total</h4>
                </div>

                {
                  userCartState && userCartState?.map((item, index) => {
                    return (
                      <div key={index} className='cart-data py-[1%] d-flex justify-content-between align-items-center'>
                        <div className='cart-col-1 d-flex align-items-center' style={{ gap: '3%' }}>
                          <div className='w-25'>
                            <img src={item?.productId?.images[0]?.url} alt="Product 1" className='img-fluid' />
                          </div>
                          <div className='w-75 cart-item-data'>
                            <p>
                              {item?.productId?.title}
                            </p>
                            <p className='d-flex  mt-[1%]' style={{ gap: '2%' }}>
                              Color:
                              <ul className='colors ps-0'>
                                <li style={{ backgroundColor: item?.color[0]?.title }}></li>
                              </ul>
                            </p>
                            <p>
                              Size: {item?.size}
                            </p>
                          </div>
                        </div>

                        <div className='cart-col-2'>
                          <h5 className="cart-price">Rs.{item?.price}</h5>
                        </div>
                        <div className='cart-col-3 d-flex align-items-center' style={{ gap: '19%' }}>
                          <div>
                            <input
                              type="number"
                              name={"quantity" + item?._id}
                              style={{
                                width: "100%",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                maxWidth: "130%",
                                boxSizing: "border-box",
                                fontSize: "14px",
                                backgroundColor: "#fff", // Add background color
                              }}
                              className=""
                              min={1}
                              max={10}
                              id={"cart" + item?._id}
                              value={item?.quantity}
                              onChange={(e) => {
                                setProductUpdateDetail({ cartItemId: item?._id, quantity: e.target.value });
                              }}
                            />
                          </div>


                          <div>
                            <AiFillDelete className='text-danger cursor-pointer ' onClick={() => {
                              deleteACartProduct(item?._id)
                            }} />
                          </div>

                        </div>
                        <div className='cart-col-4'>
                          <h5 className="cart-price">Rs{item?.price * item?.quantity}</h5>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <div className="col-12 py-[1%] mt-[3%]">
                <div className="d-flex justify-content-between align-items-baseline">
                  <Link className='cart-button text-center' to="/product">Continue To Shopping</Link>
                  {totalAmount !== null && totalAmount !== 0 && (
                    <div className='d-flex flex-column align-items-end' style={{ "--gap": "1.2%" }}>
                      <h4 style={{ marginBottom: "var(--gap)" }} className='cart-total'>SubTotal: Rs.{totalAmount}</h4>
                      <div style={{ marginTop: "auto", marginBottom: "var(--gap)" }} className=''>
                        <p className='text-right' style={{ fontSize }}>
                          Taxes and Shipping Calculated At Checkout.
                        </p>
                      </div>
                      <Link className={isMobile ? 'checkout-button' : 'button'} to="/checkout">
                        Checkout
                      </Link>

                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

      </Container>
    </>
  )
}

export default Cart
