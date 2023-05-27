import React, { useEffect } from 'react';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/user/userSlice';
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';

const Orders = () => {
  const getTokenFromLocalStorage = localStorage.getItem('customer')
    ? JSON.parse(localStorage.getItem('customer'))
    : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ''
        }`,
      Accept: 'application/json',
    },
  };

  const dispatch = useDispatch();
  const orderState = useSelector(state => state?.auth?.getorderedProduct?.orders);
  console.log(orderState);

  useEffect(() => {
    dispatch(getOrders(config2));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {/* <BreadCrumb title="My Orders" /> */}
      <Meta title={'My Orders'} />
      <Container class1='cart-wrapper home-wrapper-2 py-5'>
        {orderState?.length === 0 ? (
          <div className='flex justify-center align-items-center'>
            <div>
            </div>
            <div className='no-wish-contents'>
              <div classname="lottie">
                <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_iikbn1ww.json" background="transparent" speed="1" style={{ width: "300px", height: "300px" }} loop autoplay></lottie-player>              </div>
              <h2>Your Order List is empty!</h2>
              <div className='flex align-middle justify-around'>
                <Link to="/product"><button className='order-empty'>Continue to Shopping</button></Link>
              </div>
            </div>
          </div>
        ) : (
          <div className='row my-orders'>
            <div className='col-12'>
              <div className='row'>
                <div className='col-4 px-[2.5%]'>
                  <h5>Order Id</h5>
                </div>
                <div className='col-3 px-[3.5%]'>
                  <h5>Total Amount</h5>
                </div>
                <div className='col-3 px-[3.5%]'>
                  <h5>Total Amount After Discount</h5>
                </div>
                <div className='col-2 px-[3.5%]'>
                  <h5>Status</h5>
                </div>
              </div>
            </div>
            <div className='col-12 mt-3'>
              {orderState && orderState?.map((item, index) => {
                return (
                  <div style={{ backgroundColor: '#febd69' }} className='row pt-3 my-3' key={index}>
                    <div className='col-4 pr-[3.5%] pl-[2%] overflow-auto'>
                      <p>{item?._id}</p>
                    </div>
                    <div className='col-3  px-[3.5%]'>
                      <p>{item?.totalPrice}</p>
                    </div>
                    <div className='col-3  px-[3.5%]'>
                      <p>{item?.totalPriceAfterDiscount}</p>
                    </div>
                    <div className='col-2  px-[3.5%]'>
                      <p>{item?.orderStatus}</p>
                    </div>
                    <div className='col-12'>
                      <div className='row py-3' style={{ backgroundColor: '#232f3e' }}>
                        <div className='col-3 px-[3.5%]'>
                          <h6>Product Name</h6>
                        </div>
                        <div className='col-3 px-[3.5%]'>
                          <h6>Quantity</h6>
                        </div>
                        <div className='col-2 px-[3.5%]'>
                          <h6>Price</h6>
                        </div>
                        <div className='col-2 px-[3.5%]'>
                          <h6>Color</h6>
                        </div>
                        <div className='col-2 px-[3.5%]'>
                          <h6>Size</h6>
                        </div>
                        {item?.orderItems?.map((i, index) => {
                          return (
                            <div className='col-12'>
                              <div className='row p-3'>
                                <div className='col-3  px-[3.5%]'>
                                  <p className='text-white'>{i?.product?.title}</p>
                                </div>
                                <div className='col-3  px-[3.5%]'>
                                  <p className='text-white'>{i?.quantity}</p>
                                </div>
                                <div className='col-2  px-[3.5%]'>
                                  <p className='text-white'>{i?.price}</p>
                                </div>
                                <div className='col-2  px-[3.5%]'>
                                  <p>
                                    <ul className='colors ps-0'>
                                      <div className='bg-white p-[3.5%]'>
                                        <li style={{ backgroundColor: i?.color?.title }}></li>
                                      </div>
                                    </ul>
                                  </p>
                                </div>
                                <div className='col-2  px-[3.5%]'>
                                  <p className='text-white'>{i?.size}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default Orders;
