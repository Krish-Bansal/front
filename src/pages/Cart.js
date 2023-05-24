import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta'
import { AiFillDelete } from "react-icons/ai"
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartProduct, getUserCart, updateCartProduct } from '../features/user/userSlice'

const Cart = () => {
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
              <div>
              </div>
              <div className='no-wish-contents'>
                <div classname="lottie">
                  <lottie-player src="https://assets1.lottiefiles.com/private_files/lf30_oqpbtola.json" background="transparent" speed="1" style={{ width: "300px", height: "300px" }} loop autoplay></lottie-player>
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
                <div className='cart-header d-flex justify-content-between align-items-center py-3 mt-2'>
                  <h4 className='cart-col-1'>Product</h4>
                  <h4 className='cart-col-2'>Price</h4>
                  <h4 className='cart-col-3'>Quantity</h4>
                  <h4 className='cart-col-4'>Total</h4>
                </div>

                {
                  userCartState && userCartState?.map((item, index) => {
                    return (
                      <div key={index} className='cart-data py-3 mb-2 d-flex justify-content-between align-items-center'>
                        <div className='cart-col-1 d-flex align-items-center gap-15'>
                          <div className='w-25'>
                            <img src={item?.productId?.images[0]?.url} alt="Product 1" className='img-fluid' />

                          </div>
                          <div className='w-75'>
                            <p>
                              {item?.productId?.title}
                            </p>
                            <p className='d-flex gap-3 mt-1'>
                              Color: <ul className='colors ps-0'>
                                <li style={{ backgroundColor: item?.color?.title }}></li>
                              </ul>
                            </p>
                            <p>
                              Size: {item?.size}
                            </p>
                          </div>

                        </div>
                        <div className='cart-col-2'>
                          <h5 className="price">Rs.{item?.price}</h5>
                        </div>
                        <div className='cart-col-3 d-flex align-items-center gap-15'>
                          <div>
                            <input type="number"
                              name={"quantity" + item?._id} className='form-control' min={1} max={10} id={"cart" + item?._id}
                              value={item?.quantity}
                              onChange={(e) => {
                                setProductUpdateDetail({ cartItemId: item?._id, quantity: e.target.value })
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
                          <h5 className="price">Rs{item?.price * item?.quantity}</h5>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <div className="col-12 py-2 mt-4">
                <div className="d-flex justify-content-between align-items-baseline">
                  <Link className='button' to="/product">Continue To Shopping</Link>
                  {totalAmount !== null && totalAmount !== 0 && (
                    <div className='d-flex flex-column align-items-end gap-10'>
                      <h4>SubTotal: Rs.{totalAmount}</h4>
                      <p>Taxes and Shipping Calulated At Checkout.</p>
                      <Link className='button' to="/checkout">Checkout</Link>
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
