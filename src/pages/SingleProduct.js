import React, { useEffect, useState, useRef } from 'react'
import Meta from '../components/Meta'
import ProductCard from '../components/ProductCard'
import ReactStars from 'react-rating-stars-component'
import Color from "../components/Color"
import Container from '../components/Container'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addReview, getAProduct, getAllProducts } from '../features/products/productSlice'
import { toast } from 'react-toastify'
import { addProdToCart, getOrders, getUserCart } from "../features/user/userSlice"
import { addToWishlist } from '../features/products/productSlice'
import DOMPurify from 'dompurify';
import * as yup from "yup"
import { useFormik } from "formik"
import StarRatings from 'react-star-ratings';
import { useMediaQuery } from 'react-responsive';
import { Carousel } from 'react-bootstrap';


// Rating Schema Starts Here
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
// Rating Schema Ends Here


const SingleProduct = () => {
  const [uploadCartLoading, setUploadCartLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // For Screen less than 768 Pixels  Starts here 
  const isMobile = useMediaQuery({ maxWidth: 767 });
  // For Screen less than 768 Pixels  Ends here 


  // Authorization Token Starts Here
  const getTokenFromLocalStorage = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")) : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
        }`,
      Accept: "application/json",
    },
  };
  // Authorization Token Ends Here

  // converting html tags in description Starts Here
  const descriptionRef = useRef(null);
  useEffect(() => {
    if (descriptionRef.current) {
      const description = descriptionRef.current.innerHTML;
      descriptionRef.current.innerHTML = DOMPurify.sanitize(description);
    }
  }, []);
  // converting html tags in description Ends Here
  const [quantity, setQuantity] = useState(1)
  const location = useLocation()
  const navigate = useNavigate()
  const getProductId = location.pathname.split("/")[2]
  const dispatch = useDispatch();
  const ProductState = useSelector(state => state?.product?.singleproduct)
  const productsState = useSelector(state => state?.product?.product)
  const userState = useSelector(state => state?.auth?.user)
  const orderState = useSelector(state => state?.auth?.getorderedProduct)


  let isProductAddedToOrders = false;
  orderState?.orders.forEach(orders => {
    orders.orderItems.forEach(orderItem => {
      if (orderItem.product?._id === getProductId) {
        isProductAddedToOrders = true;
      }
    });
  });
  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getAProduct(getProductId))
    if (userState !== null) {
      dispatch(getOrders(config2))
    }
    // eslint-disable-next-line
  }, [])


  const uploadCart = async () => {
    if (selectedSize === null) {
      toast.error("Please choose a size");
      return false;
    } else {
      try {
        setUploadCartLoading(true); // Set loading state to true before dispatching the addProdToCart action

        await dispatch(
          addProdToCart({
            productId: ProductState?._id,
            quantity,
            size: selectedSize,
            price: ProductState?.price,
            config2: config2,
            color: ProductState?.color,
          })
        );

        // Handle the successful addProdToCart action here
        navigate("/cart");
        dispatch(getUserCart(config2));

      } catch (error) {
        // Handle any errors that occur during the addProdToCart action
        // You can display an error message or perform any necessary error handling

      } finally {
        setUploadCartLoading(false); // Set loading state to false after handling the response (success or error)
      }
    }
  };
  // image selection Starts Here
  const [selectedImage, setSelectedImage] = useState('');
  useEffect(() => {
    setSelectedImage(ProductState?.images[0]?.url || '');
  }, [ProductState]);
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  // image selection Ends Here


  // add a review part Starts Here
  const formik = useFormik({
    initialValues: {
      rating: 0,
      comment: '',
    },
    validationSchema: reviewSchema,

    onSubmit: async (values) => {
      setLoading(true); // Set loading state to true before dispatching the addReview action

      try {
        const updatedValues = {
          ...values,
          postedBy: loggedinUser.name // Replace `loggedinUser.name` with the actual variable holding the user's name
        };
        await dispatch(addReview({ id: getProductId, values: updatedValues, config: config2 }));
        formik.resetForm();
        setSubmitted(true); // Set the submitted state to true after successful submission

        // Handle the successful review submission here
        // You can display a success message or perform any necessary actions

      } catch (error) {
        // Handle any errors that occur during the review submission process
        // You can display an error message or perform any necessary error handling

      } finally {
        setLoading(false); // Set loading state to false after handling the response (success or error)
      }
    }
  });
  // total rating  Starts here
  const reviews = ProductState?.reviews; // Assuming ProductState contains the reviews data

  // Calculate the total rating
  let totalRating = 0;
  if (reviews && reviews.length > 0) {
    reviews.forEach(review => {
      totalRating += review.rating;
    });
    totalRating /= reviews.length;
  }

  // total rating Ends here

  const loggedinUser = {
    name: userState?.firstname + " " + userState?.lastname
  };

  // add a review part Ends Here


  // size selection Starts Here
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeSelection = (size) => {
    if (selectedSize === size) {
      // If the same size is clicked again, deselect it
      setSelectedSize(null);
    } else {
      setSelectedSize(size);
    }
  };
  // size selection Ends Here

  // useEffect(() => {
  //   // Check if the product is in the user's order history
  //   // const isProductOrdered = checkIfProductOrdered(getProductId); 
  //   // Replace `checkIfProductOrdered` with your logic to determine if the product is ordered

  //   // setOrderedProduct(isProductOrdered);
  // }, [getProductId]);

  // copy to clipboard Starts Here
  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  }
  // copy to clipboard Ends Here

  // You May Also Like Section Starts Here 

  const [allProducts, setAllProducts] = useState([])
  useEffect(() => {
    if (!Array.isArray(productsState)) {
      // If productsState is not an array, set an empty array as the initial value
      setAllProducts([]);
      return;
    }

    const filteredProducts = productsState
      .filter((product) => product._id !== getProductId)
      .slice(0, 20); // Limit the products to 20

    setAllProducts(filteredProducts);
    // eslint-disable-next-line
  }, [productsState, getProductId]);



  // You May Also Like Section Ends Here 

  // Add to Wishlist Starts Here 
  const addToWish = (id, config) => {
    dispatch(addToWishlist({ id, config }));
  };
  // Add to Wishlist Starts Here 

  return (
    <>
      <Meta title={ProductState?.title} />
      {/*<BreadCrumb title="Product Name" /> */}
      <Container class1="main-product-wrapper py-[3%] home-wrapper-2">
        <div className="row">
          <div className="col-1 mobile-other">
            <div className="other-product-images flex flex-col gap-10">
              {ProductState?.images.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleImageClick(item?.url)}
                  className={`image-container ${item?.url === selectedImage ? "selected" : ""
                    }`}
                >
                  <img src={item?.url} alt="" className="img-fluid" />
                </div>
              ))}
            </div>
          </div>
          <div className={`col-${selectedImage ? '6' : '12'} desktop-image`}>
            <div className="main-product-image">
              <div className="">
                <img src={selectedImage || "Main Product Image"} alt="" />
              </div>
            </div>
          </div>
          <div className={isMobile ? 'col-12' : 'col-5'}>
            <div className="main-product-details">
              <div className=''>
                <h3 className={`title ${isMobile ? 'text-center' : ''}`}>
                  {ProductState?.title}
                </h3>
              </div>
              <div className="border-bottom py-[1.25%]">
                <p className={`price ${isMobile ? 'text-center' : ''}`}>
                  Rs.{ProductState?.price}
                </p>
                <div className={`d-flex align-items-center gap-10 ${isMobile ? 'justify-content-center' : ''}`}>
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
                {isProductAddedToOrders && (
                  <div className={`text-black ${isMobile ? 'text-center' : ''}`}>
                    <a href="#review" className='review-btn'>
                      Write a Review
                    </a>
                  </div>
                )}
                <p className={`shipping ${isMobile ? 'text-center' : ''}`}>Shipping calculated at checkout</p>
              </div>
              <div className="py-[1.8%]">
                <div className={`d-flex justify-content-${isMobile ? 'center' : 'start'} gap-[1.2%] my-[1.5%]`}>
                  <h3 className="product-heading">Title:</h3>
                  <p className="product-data">{ProductState?.title}</p>
                </div>
                <div className={`d-flex justify-content-${isMobile ? 'center' : 'start'}  gap-[1.2%]  my-[1.5%]`}>
                  <h3 className="product-heading">Category:</h3>
                  <p className="product-data">{ProductState?.category}</p>
                </div>
                <div className={`d-flex justify-content-${isMobile ? 'center' : 'start'} gap-[1.2%] my-[1.5%]`}>
                  <h3 className='product-heading'>Tags :</h3>
                  <p className='product-data capitalize'>{ProductState?.tags}</p>
                </div>
                <div className={`d-flex gap-[1.5%] ${isMobile ? 'justify-center' : ''}`}>
                  <h3 className='product-heading'>Color :</h3>
                  <Color colorData={ProductState?.color} />
                </div>
                {ProductState?.category === 'Shirt' && (
                  <div className={`d-flex flex-column gap-10 mt-2 mb-3 ${isMobile ? 'justify-center' : ''}`}>
                    <h3 className={`product-heading ${isMobile ? 'text-center' : ''}`}>Size:</h3>
                    <div className={`d-flex flex-wrap gap-2 ${isMobile ? 'justify-center' : ''}`}>
                      {['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((size) => (
                        <button
                          key={size}
                          className={`single-product-size${selectedSize === size ? ' selected-size' : ''}${!ProductState.size.includes(size) ? ' disabled' : ''}`}
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
                  <div className={`d-flex flex-column gap-10 mt-[2%] mb-[3%] ${isMobile ? 'justify-center' : ''}`}>
                    <h3 className={`product-heading ${isMobile ? 'text-center' : ''}`}>Size:</h3>
                    <div className={`d-flex flex-wrap gap-2 ${isMobile ? 'justify-center' : ''}`}>
                      {['29', '30', '32', '34', '36', '38'].map((size) => (
                        <button
                          key={size}
                          className={`single-product-size${selectedSize === size ? ' selected-size' : ''}${!ProductState.size.includes(size) ? ' disabled' : ''}`}
                          disabled={!ProductState.size.includes(size)}
                          onClick={() => handleSizeSelection(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}




                <div className='d-flex flex-column gap-15 mt-[1.5%] mb-[1.5%] '>
                  <div className={`d-flex ${isMobile ? 'flex-column align-items-center' : ''}`}>
                    <h3 className={`product-heading ${isMobile ? 'text-center' : 'mt-[1.5%]'}`}>Quantity:</h3>
                    {isMobile ? (
                      <div className="mt-[2%]">
                        <input
                          type="number"
                          name=""
                          min={1}
                          max={10}
                          className="form-control"
                          style={{ width: "100%" }}
                          id=""
                          onChange={(e) => setQuantity(e.target.value)}
                          value={quantity}
                        />
                      </div>
                    ) : (
                      <div className="ml-[2%]">
                        <input
                          type="number"
                          name=""
                          min={1}
                          max={10}
                          className="form-control"
                          style={{ width: "100%" }}
                          id=""
                          onChange={(e) => setQuantity(e.target.value)}
                          value={quantity}
                        />
                      </div>
                    )}
                  </div>



                  <div className={`d-flex align-items-center gap-[1.8%] ${isMobile ? 'flex-column justify-center' : ''}`}>
                    <h3 className='product-heading'>Product Link:</h3>
                    <a
                      href={getProductId}
                      onClick={(e) => {
                        e.preventDefault();
                        copyToClipboard(window.location.href);
                      }}
                    >
                      Copy Product Link
                    </a>
                  </div>


                  <div className="d-flex align-items-center gap-30">
                    <button
                      className="single-product-button"
                      type="button"
                      onClick={uploadCart}
                      disabled={uploadCartLoading} // Disable the button while uploading the cart
                    >
                      {uploadCartLoading ? "Adding to Cart..." : "Add to Cart"}
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
                <div className={`d-flex gap-1 flex-column my-[4%] ${isMobile ? 'text-center' : ''}`}>
                  <h3 className='product-heading'>Shipping & Returns :</h3>
                  <p className='product-data'>Free Shipping and Returns Available on all orders!
                    <br />
                    We Ship all domestic Orders Within <b>5-10 Business Days!</b>
                  </p>
                </div>
                <div className={`flex flex-col my-[1%] ${isMobile ? 'items-center' : ''}`}>
                  <h4 className='product-heading'>Product Description:</h4>
                  <div className="py-[1.2%]" ref={descriptionRef} dangerouslySetInnerHTML={{ __html: ProductState?.description }}>
                  </div>
                </div>
                <div className={`flex ${isMobile ? 'justify-center' : ''} align-items-center gap-[.75%]`}>
                  <div className="product-header capitalize">Wash Care:</div>
                  <div className="product-data">&nbsp;Cold machine wash</div>
                </div>
                <div className={`my-[1.2%] ${isMobile ? 'text-center' : ''}`}>
                  <p className='product-header'>Actual color of the product may vary slightly due to photographic lighting sources or your devices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container >
      <Container class1="pb-[5%]">
        <div className="row">
          <div className={`col-12 px-[3%] ${isMobile ? '' : ' flex align-middle justify-around'}`}>
            <div className={`single-product-first-policy ${isMobile ? 'mb-[1%]' : 'col-3'}`}>
              <h3 className={`single-product-heading ${isMobile ? 'text-center' : ''}`}>Product Info</h3>
              <div className="single-product-data">{ProductState?.title}</div>
            </div>
            {isMobile ? (
              <div className="row">
                <div className="col-12">
                  <div className="single-product-second-policy-mmobile">
                    <h3 className="single-product-heading">Return and refund policy</h3>
                    <div className="single-product-data">
                      Replacement is available for size issues only, and you have to send it by courier yourself and the shipping cost will be borne by the customer. In case the desired size or color is out of stock, we won't be able to replace the product until it's restocked again.
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-4 single-product-second-policy">
                <h3 className={`single-product-heading ${isMobile ? 'text-center' : ''}`}>Return and refund policy</h3>
                <div className="single-product-data">
                  Replacement is available for size issues only, and you have to send it by courier yourself and the shipping cost will be borne by the customer. In case the desired size or color is out of stock, we won't be able to replace the product until it's restocked again.
                </div>
              </div>
            )}
            <div className={`${isMobile ? 'mb-[1%]' : 'col-3'}`}>
              <h3 className={`single-product-heading ${isMobile ? 'text-center' : ''}`}>Shipping Info</h3>
              <div className="single-product-data">
                After your order being received by us, the order will be dispatched soon, and will be delivered to your doorstep in about 7-10 days.
              </div>
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
                  <h4 className='mb-[1%]'>
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
                  {isProductAddedToOrders && (
                    <a href="#review" className='text-dark text-decoration-underline'>
                      Write a Review
                    </a>
                  )}
                </div>

              </div>
              {isProductAddedToOrders && (
                <div className="review-form py-[3%]">
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
                      <button
                        className="button border-0"
                        type="submit"
                        disabled={loading || submitted} // Disable the button while loading or if already submitted
                      >
                        {loading ? 'Submitting...' : (submitted ? 'Submitted' : 'Submit Review')}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <h2 className='text-lg mt-[1%]'>Recent Reviews</h2>
              <div className="reviews">
                <div>
                  {ProductState?.reviews
                    ?.slice() // Create a shallow copy of the reviews array
                    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort the reviews by createdAt in descending order
                    ?.slice(0, 3) // Get the first three reviews
                    ?.map((review, index) => (
                      <div className="review mt-[1%] border-t-2" key={index}>
                        <div className="d-flex align-items-center">
                          <ReactStars
                            count={5}
                            size={24}
                            activeColor="#ffd700"
                            edit={false}
                            value={review.rating}
                          />
                        </div>
                        <h6 className={`text-${isMobile ? 'sm' : 'lg'} ${isMobile ? 'text-[#ffd700]' : ''}`}>{review.postedBy}</h6>
                        <p className={`text-${isMobile ? 'xs' : 'sm'} ${isMobile ? 'text-[#ffd700]' : ''}`}>{review?.createdAt && new Date(review.createdAt).toLocaleDateString()}</p>
                        <h2 className={`mt-[1%] text-${isMobile ? 'sm' : 'lg'}`}>{review.comment}</h2>

                      </div>
                    ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading uppercase">You May Also Like</h3>
          </div>
        </div>
        <div>
          {isMobile ? (
            <div className="row row-scroll">
              <div className="col-12">
                <div className="d-flex flex-nowrap overflow-auto">
                  {allProducts.map((product, index) => (
                    <div
                      key={index}
                      className="col-6"
                    >
                      <ProductCard data={[product]} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          ) : (
            <Carousel indicators={false} interval={null}>
              {Array.from({ length: Math.ceil(allProducts.length / 4) }, (_, index) => (
                <Carousel.Item key={index}>
                  <div className="row">
                    {allProducts.slice(index * 4, (index + 1) * 4).map((product) => (
                      <div className="col-md-3" key={product.id}>
                        <ProductCard data={[product]} />
                      </div>
                    ))}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </div>

      </Container>
    </>
  )
}
export default SingleProduct
