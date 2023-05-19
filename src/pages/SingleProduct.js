import React, { useEffect, useState, useRef } from 'react'
import Meta from '../components/Meta'
import ProductCard from '../components/ProductCard'
import ReactStars from 'react-rating-stars-component'
import Color from "../components/Color"
import Container from '../components/Container'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addReview, getAProduct } from '../features/products/productSlice'
import { toast } from 'react-toastify'
import { addProdToCart, getUserCart } from "../features/user/userSlice"
import { addToWishlist } from '../features/products/productSlice'
import DOMPurify from 'dompurify';
import * as yup from "yup"
import { useFormik } from "formik"
import StarRatings from 'react-star-ratings';

const reviewSchema = yup.object().shape({
  rating: yup
    .number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5')
    .required('Rating is required'),
  comment: yup
    .string()
    .trim()
    .required('Comment is required')
    .max(500, 'Comment cannot exceed 500 characters'),
});

const SingleProduct = () => {

  // Authorization Token
  const getTokenFromLocalStorage = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")) : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
        }`,
      Accept: "application/json",
    },
  };
  // Authorization Token

  // converting html tags in description  
  const descriptionRef = useRef(null);
  useEffect(() => {
    if (descriptionRef.current) {
      const description = descriptionRef.current.innerHTML;
      descriptionRef.current.innerHTML = DOMPurify.sanitize(description);
    }
  }, []);
  // converting html tags in description  
  // const [color, setColor] = useState(null)
  const [quantity, setQuantity] = useState(1)
  // const [alreadyAdded, setAlreadyAdded] = useState(false);
  const location = useLocation()
  const navigate = useNavigate()
  const getProductId = location.pathname.split("/")[2]
  const dispatch = useDispatch();
  const ProductState = useSelector(state => state?.product?.singleproduct)
  const productsState = useSelector(state => state?.product?.product)
  // const cartState = useSelector(state => state?.auth?.cartProducts)
  const userState = useSelector(state => state?.auth?.user)

  useEffect(() => {
    dispatch(getAProduct(getProductId))
    // dispatch(getUserCart(config2))
    // eslint-disable-next-line
  }, [])
  // useEffect(() => {
  //   for (let index = 0; index < cartState?.length; index++) {
  //     if (getProductId === cartState[index]?.productId?._id) {
  //       setAlreadyAdded(true)
  //     }
  //   }
  // })

  const uploadCart = () => {
    if (selectedSize === null) {
      toast.error("Please choose a size");
      return false;
    } else {
      dispatch(addProdToCart({ productId: ProductState?._id, quantity, size: selectedSize, price: ProductState?.price, config2: config2 }));
      navigate("/cart");
      dispatch(getUserCart(config2));
    }
  };

  // image selection 
  const [selectedImage, setSelectedImage] = useState('');
  useEffect(() => {
    setSelectedImage(ProductState?.images[0]?.url || '');
  }, [ProductState]);
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  // image selection 


  // add a review part 




  const formik = useFormik({
    initialValues: {
      rating: 0,
      comment: '',
    },
    validationSchema: reviewSchema,
    onSubmit: (values) => {
      const updatedValues = {
        ...values,
        postedBy: loggedinUser.name  // Replace `loggedInUserName` with the actual variable holding the user's name
      };
      console.log(updatedValues)
      dispatch(addReview({ id: getProductId, values: updatedValues, config: config2 }))
      formik.resetForm();
    },
  });

  // total rating 
  const reviews = ProductState?.reviews; // Assuming ProductState contains the reviews data

  // Calculate the total rating
  let totalRating = 0;
  if (reviews && reviews.length > 0) {
    reviews.forEach(review => {
      totalRating += review.rating;
    });
    totalRating /= reviews.length;
  }

  // total rating 

  const loggedinUser = {
    name: userState?.firstname + " " + userState?.lastname
  };

  // add a review part 




  // const props = {
  //   img: ProductState?.images[0]?.url ? ProductState?.images[0]?.url : "Main Product Image"
  // }


  // size selection 
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeSelection = (size) => {
    if (selectedSize === size) {
      // If the same size is clicked again, deselect it
      setSelectedSize(null);
    } else {
      setSelectedSize(size);
    }
  };
  // size selection 

  useEffect(() => {
    // Check if the product is in the user's order history
    // const isProductOrdered = checkIfProductOrdered(getProductId); 
    // Replace `checkIfProductOrdered` with your logic to determine if the product is ordered

    // setOrderedProduct(isProductOrdered);
  }, [getProductId]);

  // copy to clipboard 
  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  }
  // copy to clipboard 

  const [popularProduct, setPopularProduct] = useState([])
  useEffect(() => {
    let data = []
    for (let index = 0; index < productsState.length; index++) {
      const element = productsState[index];
      if (element.tags === "popular") {
        data.push(element)
      }
      setPopularProduct(data)
    }
    // eslint-disable-next-line
  }, [ProductState])

  const addToWish = (id, config) => {
    dispatch(addToWishlist({ id, config }));
  };
  return (
    <>
      <Meta title={"Product Name"} />
      {/* <BreadCrumb title="Product Name" /> */}
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-1">
            <div className="other-product-images flex flex-col gap-10">
              {ProductState?.images.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleImageClick(item?.url)}
                  className={`image-container ${item?.url === selectedImage ? 'selected' : ''}`}
                >
                  <img src={item?.url} alt="" className='img-fluid' />
                </div>
              ))}
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-image">
              <div className=''>
                <img src={selectedImage || "Main Product Image"} alt="" />
              </div>
            </div>

          </div>
          <div className="col-5">
            <div className="main-product-details">
              <div className=''>
                <h3 className='title'>
                  {ProductState?.title}
                </h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">
                  Rs.{ProductState?.price}
                </p>
                <div className="d-flex align-items-center gap-10">
                  <StarRatings
                    rating={totalRating}
                    starRatedColor="#ffd700"
                    starEmptyColor="#e4e4e4"
                    starDimension="18px"
                    starSpacing="1px"
                    numberOfStars={5}
                    name="rating"
                  />
                  <p className='mb-0 t-review'>({ProductState?.reviews?.length} Reviews)</p>
                </div>
                <a href="#review" className='review-btn'>
                  Write a Review
                </a>
                <p className='shipping'>Shipping calculated at checkout</p>
              </div>
              <div className="py-3">
                <div className='d-flex align-items-center gap-10 my-2'>
                  <h3 className='product-heading'>Title :</h3>
                  <p className='product-data'>{ProductState?.title}</p>
                </div>
                <div className='d-flex align-items-center gap-10 my-2'>
                  <h3 className='product-heading'>Category :</h3>
                  <p className='product-data'>{ProductState?.category}</p>
                </div>
                <div className='d-flex align-items-center gap-10 my-2'>
                  <h3 className='product-heading'>Tags :</h3>
                  <p className='product-data capitalize'>{ProductState?.tags}</p>
                </div>


                <div className='d-flex gap-10'>
                  <h3 className='product-heading'>Color :</h3>
                  <Color colorData={ProductState?.color} />
                </div>
                {ProductState?.category === 'Shirt' && (
                  <div className='d-flex flex-column gap-10 mt-2 mb-3'>
                    <h3 className='product-heading'>Size :</h3>
                    <div className='d-flex flex-wrap gap-2'>
                      {['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((size) => (
                        <button
                          key={size}
                          className={`single-product-size${selectedSize === size ? ' selected' : ''}${!ProductState.size.includes(size) ? ' disabled' : ''
                            }`}
                          disabled={!ProductState.size.includes(size)}
                          onClick={() => handleSizeSelection(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {ProductState?.category === 'Pant' && (
                  <div className='d-flex flex-column gap-10 mt-2 mb-3'>
                    <h3 className='product-heading'>Size :</h3>
                    <div className='d-flex flex-wrap gap-2'>
                      {['29', '30', '32', '34', '36', '38'].map((size) => (
                        <button
                          key={size}
                          className={`single-product-size${selectedSize === size ? ' selected' : ''}${!ProductState.size.includes(size) ? ' disabled' : ''
                            }`}
                          disabled={!ProductState.size.includes(size)}
                          onClick={() => handleSizeSelection(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}


                <div className='d-flex flex-column gap-15 mt-2 mb-2 '>

                  <h3 className='product-heading'>Quantity:</h3>
                  <div className=''>
                    <input type="number" name="" min={1} max={10} className='form-control'
                      style={{ width: "70px" }} id="" onChange={(e) => setQuantity(e.target.value)}
                      value={quantity} />
                  </div>

                  <div className='d-flex align-items-center gap-10'>
                    <h3 className='product-heading'>Product Link :</h3>
                    <a
                      href={getProductId}
                      onClick={() => {
                        copyToClipboard(
                          window.location.href
                        );
                      }}>
                      Copy Product Link                    </a>
                  </div>

                  <div className="d-flex align-items-center gap-30">
                    <button
                      className="single-product-button"
                      type="button"
                      onClick={uploadCart}
                    >
                      Add to Cart
                    </button>
                  </div>

                </div>
                <div className="flex align-middle">
                  <button className='single-product-button-wishlist'
                    onClick={(e) => { addToWish(ProductState?._id, config2) }}
                  >
                    Add to Wishlist
                  </button>
                </div>
                {/* </div> */}
                <div className='d-flex gap-10 flex-column my-3'>
                  <h3 className='product-heading'>Shipping & Returns :</h3>
                  <p className='product-data'>Free Shipping  and Returns Available on all orders !
                    <br />
                    We Ship all domestic Orders Within <b> 5-10 Business Days!</b></p>
                </div>
                <div className="flex flex-col my-2">
                  <h4 className='product-heading'>Product Description :</h4>
                  <div className="py-2" ref={descriptionRef} dangerouslySetInnerHTML={{ __html: ProductState?.description }}></div>
                </div>
                <div className='flex align-items-center'>
                  <div className="product-header capitalize">Wash Care:</div>
                  <div className="product-data">&nbsp;Cold machine wash</div>
                </div>
                <div className="my-2">
                  <p className='text-start product-header'>Actual color of the product may vary slightly due to photographic lighting sources or your devices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container >
      <Container class1="pb-5">
        <div className="row">
          <div className="col-12 flex align-middle justify-around p-2">
            <div className="col-3 single-product-first-policy">
              <h3 className='single-product-heading'>Product Info</h3>
              <div className="single-product-data">{ProductState?.title}</div>
            </div>
            <div className="col-4 single-product-second-policy">
              <h3 className='single-product-heading'>Return and refund policy</h3>
              <div className="single-product-data">Replacement is available for size issues only, and you have to send it by courier yourself and the shipping cost will be beared by the customer. In case the desired size or color is out of stock, we won't be able to replace the product until it's restocked again.
              </div>
            </div>
            <div className="col-3">
              <h3 className='single-product-heading'>Shipping Info</h3>
              <div className="single-product-data">After your order being received by us, the order will be dispatched soon, and will be delivered to your doorstep in about 7-10 days. </div>
            </div>
          </div>
        </div>
      </Container >
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className='mb-2'>
                    Customer Reviews
                  </h4>
                  <div className='d-flex gap-10 align-items-center'>
                    <StarRatings
                      rating={totalRating}
                      starRatedColor="#ffd700"
                      starEmptyColor="#e4e4e4"
                      starDimension="18px"
                      starSpacing="1px"
                      numberOfStars={5}
                      name="rating"
                    />
                    <p className='mb-0'>Based on {ProductState?.reviews?.length} Reviews</p>
                  </div>
                </div>
                <div>
                  <a href="#review" className='text-dark text-decoration-underline'>Write a Review</a>
                </div>

              </div>
              <div className="review-form py-4" >
                <h4>Write a Review</h4>
                <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                  {/* Rating input */}
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      activeColor='#ffd700'
                      value={formik.values.rating}
                      edit={true}
                      onChange={(newRating) => formik.setFieldValue('rating', newRating)}
                    />
                    {formik.touched.rating && formik.errors.rating && (
                      <div className='error'>{formik.errors.rating}</div>
                    )}
                  </div>
                  {/* Comment input */}
                  <div>
                    <textarea
                      name='comment'
                      id='comment'
                      cols='30'
                      rows='4'
                      className='w-100 form-control'
                      placeholder='Comments'
                      value={formik.values.comment}
                      onChange={formik.handleChange}
                    ></textarea>
                    {formik.touched.comment && formik.errors.comment && (
                      <div className='error'>{formik.errors.comment}</div>
                    )}
                  </div>
                  {/* Submit button */}
                  <div className='d-flex justify-content-end'>
                    <button type='submit' className='button border-0'>
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
              <h2 className='text-lg mt-2'>Recent Reviews</h2>
              <div className="reviews">
                <div>
                  {ProductState?.reviews
                    ?.slice() // Create a shallow copy of the reviews array
                    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort the reviews by createdAt in descending order
                    ?.slice(0, 3) // Get the first three reviews
                    ?.map((review, index) => (
                      <div className="review mt-4 border-t-2" key={index}>


                        <div className="d-flex align-items-center">
                          <ReactStars
                            count={5}
                            size={24}
                            activeColor="#ffd700"
                            edit={false}
                            value={review.rating}
                          />
                        </div>
                        <h6 className='text-lg text-[#ffd700]'>{review.postedBy}</h6>
                        <p className='text-xs'>{review?.createdAt && new Date(review.createdAt).toLocaleDateString()}</p>
                        <h2 className="mt-1 text-lg">{review.comment}</h2>
                      </div>
                    ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading uppercase">You May Also Like</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard data={popularProduct} />
        </div>
      </Container>
    </>
  )
}
export default SingleProduct
