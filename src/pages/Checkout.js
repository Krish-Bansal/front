import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiArrowBack } from "react-icons/bi"
import Container from '../components/Container'
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik"
import * as yup from "yup"
import { createAnOrder, deleteUserCart, resetState, applyAcoupon } from '../features/user/userSlice'
import CustomModal from '../components/CustomModal';

const shippingSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  address: yup.string().required("Address Details Are Required"),
  state: yup.string().required("State is Required"),
  city: yup.string().required("City is Required"),
  country: yup.string().required("Country is Required"),
  pincode: yup.number().required("Pincode is Required").typeError("ZIP code must be a number"),
  other: yup.string().required("Other Details Are Required"),
  mobile: yup.number().min(1000000000, "Mobile Number must be at least 10 digits").typeError("Mobile Number must be a number").required("Mobile Number is Required"),
})
const Checkout = (props) => {
  const getTokenFromLocalStorage = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")) : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
        }`,
      Accept: "application/json",
    },
  };
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartState = useSelector(state => state?.auth?.cartProducts)
  const userState = useSelector(state => state?.auth?.user)
  const authState = useSelector(state => state?.auth)
  const [totalAmount, setTotalAmount] = useState(null)
  const [grandTotal, setgrandTotal] = useState(null)
  const [shippingInfo, setShippingInfo] = useState(null);
  console.log(shippingInfo);
  const [shippingCost, setShippingCost] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [cartProductState, setCartProductState] = useState([]);
  const couponMessage = useSelector((state) => state.auth.couponMessage);
  const couponSuccess = useSelector((state) => state?.auth?.couponSuccess);
  const couponDiscount = useSelector((state) => state?.auth?.couponDiscount);
  const isSuccess = useSelector((state) => state?.auth?.isSuccess);
  const isError = useSelector((state) => state?.auth?.isError);
  const displayDiscount = isSuccess && couponDiscount ? `-${couponDiscount}%` : (isError ? "-0%" : "-0%");
  const discountedAmount = totalAmount ? (couponDiscount ? totalAmount - (totalAmount * couponDiscount) / 100 : totalAmount) : 0;

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + (Number(cartState[index].quantity) * cartState[index].price)
      setTotalAmount(sum)
    }
  }, [cartState])

  const calculateGrandTotal = () => {
    return discountedAmount + shippingCost;
  };

  useEffect(() => {
    // Calculate and update the grand total whenever totalAmount or shippingCost changes
    const updatedGrandTotal = calculateGrandTotal();
    setgrandTotal(updatedGrandTotal);
    // eslint-disable-next-line
  }, [totalAmount, shippingCost, displayDiscount, grandTotal]);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  useEffect(() => {
    if (authState?.orderedProduct?.order !== null && authState?.orderedProduct?.success === true) {
      navigate('/my-orders');
      dispatch(resetState());
    }
    // eslint-disable-next-line
  }, [authState?.orderedProduct?.order, authState?.orderedProduct?.success]);

  const handleOptionSelect = (option) => {
    if (option === "Inside Kathmandu Valley") {
      setShippingCost(0);
    } else if (option === "Outside Kathmandu Valley") {
      setShippingCost(100);
    }
    setIsModalOpen(false);
  };
  const handleApplyCoupon = () => {
    const couponCode = document.querySelector('.coupon-input').value;
    dispatch(applyAcoupon({ couponCode: couponCode, config2: config2 }));
  };
  const resetCouponSection = () => {
    // let couponCode = '';
    // let displayDiscount = "-0%";
    // Additional code to reset any other relevant coupon section variables or elements
  };
  window.onbeforeunload = resetCouponSection;
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
      other: "",
      mobile: "",
    },

    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values);
      localStorage.setItem("address", JSON.stringify(values))
      dispatch(createAnOrder({ totalPrice: totalAmount, totalPriceAfterDiscount: grandTotal, orderItems: cartProductState, shippingInfo: JSON.parse(localStorage.getItem("address")), config2: config2 }))
      dispatch(deleteUserCart(config2))
      localStorage.removeItem("address")
    }
  })

  useEffect(() => {
    let items = []
    for (let index = 0; index < cartState?.length; index++) {
      items.push({ product: cartState[index].productId?._id, quantity: cartState[index].quantity, color: cartState[index].productId.color, price: cartState[index].price, size: cartState[index].size })
    }
    setCartProductState(items)
    // eslint-disable-next-line
  }, [])


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
                    <Link to="/cart" className='total-price'>Cart</Link>
                  </li>
                  &nbsp;/

                  <li className="breadcrumb-item total-price active text-dark">
                    Shipping
                  </li>
                  &nbsp;
                </ol>
              </nav>
              <h4 className="title total">
                Contact Information
              </h4>
              <p className="user-details total">
                {`${userState?.firstname} ${userState?.lastname} (${userState?.email})`}
              </p>
              <h4 className='mb-3'>Shipping Address</h4>
              <form action=""
                onSubmit={formik.handleSubmit}
                className='d-flex gap-15 flex-wrap justify-content-between'>
                <div className='w-100'>
                  <select name="country" value={formik.values.country} onChange={formik.handleChange("country")}
                    onBlur={formik.handleBlur("country")} id="" className='form-control form-select'>
                    <option value="" selected disabled>Select Country
                    </option>
                    <option value="Nepal">
                      Nepal
                    </option>
                  </select>
                  <div className="error ms-1">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <input type="text" className="form-control" placeholder='First Name'
                    value={formik.values.firstname} onChange={formik.handleChange("firstname")}
                    onBlur={formik.handleBlur("firstname")} />
                  <div className="error ms-1">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                </div>

                <div className='flex-grow-1'>
                  <input type="text" className="form-control" placeholder='Last Name'
                    value={formik.values.lastname} onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur("lastname")} />
                  <div className="error ms-1">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>
                </div>
                <div className='w-100'>
                  <input type="text" className="form-control" placeholder='Address'
                    name="address"
                    value={formik.values.address} onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")} />
                  <div className="error ms-1">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className='w-100'>
                  <input type="text" name="other" className="form-control" placeholder='Apartment,Suite,etc'
                    value={formik.values.other} onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                  />
                  <div className="error ms-1">
                    {formik.touched.other && formik.errors.other}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <input type="text" className="form-control" placeholder='City'
                    name="city"
                    value={formik.values.city} onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")} />
                  <div className="error ms-1">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <select name="state" id="" className='form-control form-select' value={formik.values.state} onChange={formik.handleChange("state")}
                    onBlur={formik.handleBlur("state")}>
                    <option value="" selected disabled>
                      Select State
                    </option>
                    <option value="Koshi" >
                      Koshi
                    </option>
                    <option value="Madhesh" >
                      Madhesh
                    </option>
                    <option value="Bagmati" >
                      Bagmati
                    </option>
                    <option value="Gandaki" >
                      Gandaki
                    </option>
                    <option value="Lumbini" >
                      Lumbini
                    </option>
                    <option value="Karnali" >
                      Karnali
                    </option>
                    <option value="Sudurpashchim" >
                      Sudurpashchim
                    </option>
                  </select>
                  <div className="error ms-1">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <input type="text" className="form-control" placeholder='ZIP code'
                    name="pincode"
                    value={formik.values.pincode} onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleBlur("pincode")} />
                  <div className="error">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <input type="text" className="form-control" placeholder='Phone Number'
                    name="mobile"
                    value={formik.values.mobile} onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")} />
                  <div className="error">
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className='text-dark d-flex align-items-center'>
                      <BiArrowBack /> Return to Cart</Link>
                    <button className='button' type="submit">Place Order
                    </button>

                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className='border-bottom py-4'>
              {
                cartState && cartState?.map((item, index) => {
                  return (
                    <div key={index} className="d-flex gap-10 mb-2 align-items-center">
                      <div className="w-75 d-flex gap-10">
                        <div className="w-25 position-relative">
                          <span className="badge bg-secondary text-white rounded-circle p-2 position-absolute" style={{ top: "-10px", right: "-2px" }}>
                            {item?.quantity}
                          </span>
                          <img src={item?.productId?.images[0]?.url} alt="product" width={100} height={100} />
                        </div>
                        <div>
                          <h5 className='total-title'>
                            {item?.productId?.title}({item?.size})
                          </h5>
                          <p className='total-price'>
                            {item?.price}
                          </p>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className='total d-flex justify-content-end'>Rs {item?.price * item?.quantity}</h5>
                      </div>
                    </div>
                  )
                })
              }

            </div>
            <div className='border-bottom py-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='total'>Subtotal</p>
                <p className='total-price'>Rs.{totalAmount ? totalAmount : "0"}</p>
              </div>
              <div className='coupon-area flex justify-between align-middle'>
                <div>
                  <input type='text' placeholder='Enter coupon code' className='coupon-input' />
                  <button className='apply-button' onClick={handleApplyCoupon}>Apply</button>
                </div>
                <div>
                  <p className="total-price">{displayDiscount}</p>
                </div>
              </div>
              {couponMessage && !isSuccess ? (
                <p className="coupon-message">{couponMessage}</p>
              ) : (
                isSuccess && couponSuccess && <p className="coupon-success">{couponSuccess}</p>
              )}
              <div className="d-flex justify-content-between align-items-center">
                <p className='mb-0 total'>Shipping (Cash on delivery)</p>
                <p className='mb-0 total-price'>Rs.{shippingCost}</p>
                <CustomModal
                  open={isModalOpen}
                  hideModal={() => setIsModalOpen(false)}
                  handleOptionSelect={handleOptionSelect}
                  title="Select Shipping Option"
                />

              </div>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <h4 className='total'>Total</h4>
              <h5 className='total-price'>Rs.{grandTotal ? grandTotal

                : "0"}</h5>

            </div>

          </div>
        </div>
      </Container>
    </>
  )
}

export default Checkout
