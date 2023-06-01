import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import Meta from '../components/Meta'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getTotalReviews } from '../features/products/productSlice'
import { NavLink, useNavigate } from 'react-router-dom'
// import { addToWishlist } from '../features/products/productSlice'
import { getUserCart } from '../features/user/userSlice'
import StarRatings from 'react-star-ratings';
import { Carousel } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';



const Home = () => {
  const getTokenFromLocalStorage = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")) : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
        }`,
      Accept: "application/json",
    },
  };



  // Mobile Responive Starts Here 

  const isSmallScreen = useMediaQuery({ maxWidth: 576 });
  const isMediumScreen = useMediaQuery({ maxWidth: 991.98 });

  let numberOfReviews;

  if (isSmallScreen) {
    // Small screen (less than 576px)
    numberOfReviews = 1;
  } else if (isMediumScreen) {
    // Medium screen (between 576px and 991.98px)
    numberOfReviews = 2;
  } else {
    // Large and Extra Large screens (greater than or equal to 992px)
    numberOfReviews = 3;
  }

  // Mobile Responive Ends Here 

  // const addToWish = (id) => {
  //   dispatch(addToWishlist(id));
  // };
  const productState = useSelector((state) => state.product.product)
  const totalState = useSelector((state) => state.product.totalreviews)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // const [showAllProducts, setShowAllProducts] = useState(false);
  const displayedProducts1 = productState && productState.filter((item) => item.tags === 'Top Selling').slice(0, 8);
  const displayedProducts2 = productState && productState.filter((item) => item.tags === 'special').slice(0, 8);
  const displayedProducts = productState && productState.filter((item) => item.tags === 'popular').slice(0, 8);




  useEffect(() => {
    getallProducts();
    getUserCart(config2);
    // eslint-disable-next-line
  }, [])
  const getallProducts = () => {
    dispatch(getAllProducts())
    dispatch(getTotalReviews())
    // dispatch(getUserCart(config2))
  }
  return (
    <>
      <Meta title={"Defy Lifestyle"} />
      {/* <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative ">
              <img src="images/main-banner-1.jpg" alt="Main Banner" className='img-fluid rounded-3' />
              <div className="main-banner-content absolute">
                <h4>
                  Best Sale
                </h4>
                <h5>iPad S13+ Pro.</h5>
                <p>From $999 or $41.62/mo.</p>
                <Link className='button'>BUY NOW</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-between align-middle">
              <div className="small-banner relative ">
                <img src="images/catbanner-01.jpg" alt="Main Banner" className='img-fluid rounded-3' />
                <div className="small-banner-content absolute">
                  <h4>SUPERCHARGED FOR PROS</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>From $999 <br /> or $41.62/mo.</p>
                </div>
              </div>
              <div className="small-banner relative ">
                <img src="images/catbanner-02.jpg" alt="Main Banner" className='img-fluid rounded-3' />
                <div className="small-banner-content absolute">
                  <h4>new arrival</h4>
                  <h5>Buy iPad Air</h5>
                  <p>From $999 <br /> or $41.62/mo.</p>
                </div>
              </div>
              <div className="small-banner relative ">
                <img src="images/catbanner-03.jpg" alt="Main Banner" className='img-fluid rounded-3' />
                <div className="small-banner-content absolute">
                  <h4>SUPERCHARGED FOR PROS</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>From $999 <br /> or $41.62/mo.</p>
                </div>
              </div>
              <div className="small-banner relative ">
                <img src="images/catbanner-04.jpg" alt="Main Banner" className='img-fluid rounded-3' />
                <div className="small-banner-content absolute">
                  <h4>SUPERCHARGED FOR PROS</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>From $999 <br /> or $41.62/mo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container> */}
      {/* <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between
            ">
              {
                services?.map((i, j) => {
                  return (
                    <div className="d-flex align-items-center gap-15" key={j}>
                      <img src={i.image} alt="services" />
                      <div>
                        <h6>{i.title}</h6>
                        <p className="mb-0">
                          {i.tagline}
                        </p>
                      </div>
                    </div>

                  )
                })
              }

            </div>
          </div>
        </div>
      </Container> */}
      {/* <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories flex justify-between flex-wrap align-middle">
              <div className='d-flex align-middle'>
                <div>
                  <h6>Music And Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className='d-flex  align-middle'>
                <div>
                  <h6>
                    Cameras
                  </h6>
                  <p>
                    10 Items
                  </p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className='d-flex align-middle'>
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className='d-flex align-middle'>
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
              <div className='d-flex align-middle'>
                <div>
                  <h6>Music And Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className='d-flex align-middle'>
                <div>
                  <h6>
                    Cameras
                  </h6>
                  <p>
                    10 Items
                  </p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className='d-flex gap-30 align-middle'>
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className='d-flex gap-30 align-middle'>
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
            </div>
          </div>
        </div>

      </Container> */}
      <Container class1="popular-wrapper home-wrapper-2">
        <h3 className="section-heading uppercase">
          Top Selling
        </h3>
        <div>
          {isMobile ? (
            <div className="row row-scroll">
              <div className="col-12">
                <div className="d-flex flex-nowrap overflow-auto">
                  {displayedProducts1 &&
                    displayedProducts1.map((item, index) => (
                      <div
                        key={index}
                        className="col-5"
                        onClick={() => {
                          navigate("/product/" + item?._id);
                        }}
                      >
                        <div className="product-card position-relative">
                          <div className="product-image">
                            <img
                              src={item?.images[0]?.url}
                              className="img-fluid d-block mx-auto"
                              alt="Product 1"
                              width={300}
                            />
                            <img
                              src={item?.images[1]?.url}
                              className="img-fluid"
                              alt="Product 2"
                            />
                          </div>
                          <div className="product-details">
                            <h5 className="product-title">{item?.title}</h5>
                            <p className="price">Rs.{item?.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  {Array.isArray(productState) &&
                    productState.filter((item) => item.tags === "Top Selling").length >
                    8 && (
                      <div className="col-2 flex flex-col justify-center items-center">
                        <NavLink to="/product">
                          <button className="bg-black text-white px-3 py-1 mb-[70%]">
                            View All
                          </button>
                        </NavLink>
                      </div>
                    )}
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              {displayedProducts1 &&
                displayedProducts1.map((item, index) => (
                  <div
                    key={index}
                    className="col-3"
                    onClick={() => {
                      navigate("/product/" + item?._id);
                    }}
                  >
                    <div className="product-card position-relative">
                      <div className="product-image">
                        <img
                          src={item?.images[0]?.url}
                          className="img-fluid d-block mx-auto"
                          alt="Product 1"
                          width={300}
                        />
                        <img
                          src={item?.images[1]?.url}
                          className="img-fluid"
                          alt="Product 2"
                        />
                      </div>
                      <div className="product-details">
                        <h5 className="product-title">{item?.title}</h5>
                        <p className="price">Rs.{item?.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              {Array.isArray(productState) &&
                productState.filter((item) => item.tags === "Top Selling").length > 8 && (
                  <div className="col-12">
                    <div className="flex justify-end align-middle">
                      <NavLink to="/product">
                        <button className="bg-black text-white px-3 py-1 mt-1">
                          View All
                        </button>
                      </NavLink>
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>


      </Container >
      <Container class1="popular-wrapper home-wrapper-2">
        <h3 className="section-heading uppercase">
          Special Products
        </h3>
        <div>
          {isMobile ? (
            <div className="row row-scroll">
              <div className="col-12">
                <div className="d-flex flex-nowrap overflow-auto">
                  {displayedProducts2 &&
                    displayedProducts2.map((item, index) => (
                      <div
                        key={index}
                        className="col-5"
                        onClick={() => {
                          navigate("/product/" + item?._id);
                        }}
                      >
                        <div className="product-card position-relative">
                          <div className="product-image">
                            <img
                              src={item?.images[0]?.url}
                              className="img-fluid d-block mx-auto"
                              alt="Product 1"
                              width={300}
                            />
                            <img
                              src={item?.images[1]?.url}
                              className="img-fluid"
                              alt="Product 2"
                            />
                          </div>
                          <div className="product-details">
                            <h5 className="product-title">{item?.title}</h5>
                            <p className="price">Rs.{item?.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  {Array.isArray(productState) &&
                    productState.filter((item) => item.tags === "special").length >
                    8 && (
                      <div className="col-2 flex flex-col justify-center items-center">
                        <NavLink to="/product">
                          <button className="bg-black text-white px-3 py-1 mb-[70%]">
                            View All
                          </button>
                        </NavLink>
                      </div>
                    )}
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              {displayedProducts2 &&
                displayedProducts2.map((item, index) => (
                  <div
                    key={index}
                    className="col-3"
                    onClick={() => {
                      navigate("/product/" + item?._id);
                    }}
                  >
                    <div className="product-card position-relative">
                      <div className="product-image">
                        <img
                          src={item?.images[0]?.url}
                          className="img-fluid d-block mx-auto"
                          alt="Product 1"
                          width={300}
                        />
                        <img
                          src={item?.images[1]?.url}
                          className="img-fluid"
                          alt="Product 2"
                        />
                      </div>
                      <div className="product-details">
                        <h5 className="product-title">{item?.title}</h5>
                        <p className="price">Rs.{item?.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              {Array.isArray(productState) &&
                productState.filter((item) => item.tags === "special").length > 8 && (
                  <div className="col-12">
                    <div className="flex justify-end align-middle">
                      <NavLink to="/product">
                        <button className="bg-black text-white px-3 py-1 mt-1">
                          View All
                        </button>
                      </NavLink>
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>


      </Container >
      <Container class1="popular-wrapper home-wrapper-2">
        <h3 className="section-heading uppercase">
          New Arrivals
        </h3>
        <div>
          {isMobile ? (
            <div className="row row-scroll">
              <div className="col-12">
                <div className="d-flex flex-nowrap overflow-auto">
                  {displayedProducts &&
                    displayedProducts.map((item, index) => (
                      <div
                        key={index}
                        className="col-5"
                        onClick={() => {
                          navigate("/product/" + item?._id);
                        }}
                      >
                        <div className="product-card position-relative">
                          <div className="product-image">
                            <img
                              src={item?.images[0]?.url}
                              className="img-fluid d-block mx-auto"
                              alt="Product 1"
                              width={300}
                            />
                            <img
                              src={item?.images[1]?.url}
                              className="img-fluid"
                              alt="Product 2"
                            />
                          </div>
                          <div className="product-details">
                            <h5 className="product-title">{item?.title}</h5>
                            <p className="price">Rs.{item?.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  {Array.isArray(productState) &&
                    productState.filter((item) => item.tags === "popular").length >
                    8 && (
                      <div className="col-2 flex flex-col justify-center items-center">
                        <NavLink to="/product">
                          <button className="bg-black text-white px-3 py-1 mb-[70%]">
                            View All
                          </button>
                        </NavLink>
                      </div>
                    )}
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              {displayedProducts &&
                displayedProducts.map((item, index) => (
                  <div
                    key={index}
                    className="col-3"
                    onClick={() => {
                      navigate("/product/" + item?._id);
                    }}
                  >
                    <div className="product-card position-relative">
                      <div className="product-image">
                        <img
                          src={item?.images[0]?.url}
                          className="img-fluid d-block mx-auto"
                          alt="Product 1"
                          width={300}
                        />
                        <img
                          src={item?.images[1]?.url}
                          className="img-fluid"
                          alt="Product 2"
                        />
                      </div>
                      <div className="product-details">
                        <h5 className="product-title">{item?.title}</h5>
                        <p className="price">Rs.{item?.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              {Array.isArray(productState) &&
                productState.filter((item) => item.tags === "popular").length > 8 && (
                  <div className="col-12">
                    <div className="flex justify-end align-middle">
                      <NavLink to="/product">
                        <button className="bg-black text-white px-3 py-1 mt-1">
                          View All
                        </button>
                      </NavLink>
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>


      </Container >
      <Container class1="pb-[5%] mt-[6.5%]">
        <h3 className='review-heading uppercase'>our Customer Speaks for us</h3>
        <div className='text-center'>
          <StarRatings
            rating={5}
            starRatedColor="#ffd700"
            starEmptyColor="#e4e4e4"
            starDimension="18px"
            starSpacing="1px"
            numberOfStars={5}
            name="rating"
          /><br />
          <p className='underline'>from {totalState?.numberReviews} reviews</p>
        </div>
        <div className='text-center mt-[4%] review-carousel'>
          <Carousel pause={false} interval={4500} slide={true} indicators={false}>
            {totalState?.allreviews?.map((review, index) => {
              if (index % numberOfReviews === 0) {
                const reviewsChunk = totalState?.allreviews.slice(index, index + numberOfReviews); return (
                  <Carousel.Item key={index}>
                    <div className="row px-14">
                      {reviewsChunk.map((chunkedReview, chunkIndex) => (
                        <div className="col" key={chunkIndex}>
                          <StarRatings
                            rating={chunkedReview?.rating}
                            starRatedColor="#ffd700"
                            starEmptyColor="#e4e4e4"
                            starDimension="18px"
                            starSpacing="1px"
                            numberOfStars={5}
                            name="rating"
                          />
                          <div className="review-item ">
                            <div className="img-container mt-2">
                              <img src={chunkedReview?.image} alt="" className="review-image img-fluid d-block mx-auto" />
                            </div>
                            <p className='porduct-data'>{chunkedReview.comment}</p>
                            <p className='mt-2 font-bold'>{chunkedReview?.postedBy}</p>
                            <h3 className='font-light fs-6'>{chunkedReview.productTitle}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Carousel.Item>
                );
              }
              return null;
            })}
          </Carousel>

        </div>
      </Container>


    </>
  )
}

export default Home
