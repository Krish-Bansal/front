import React, { useEffect } from 'react'
import Marquee from 'react-fast-marquee'
import ProductCard from '../components/ProductCard'
import SpecialProduct from '../components/SpecialProduct'
import Container from '../components/Container'
import { services } from '../utils/Data'
import Meta from '../components/Meta'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../features/products/productSlice'
import ReactStars from 'react-rating-stars-component'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import wish from "../images/wish.svg"
import addcart from "../images/add-cart.svg"
import view from "../images/view.svg"
import { addToWishlist } from '../features/products/productSlice'
import { getUserCart } from '../features/user/userSlice'


const Home = () => {
  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };
  const productState = useSelector((state) => state.product.product)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getallProducts();
    getUserCart()
  }, [])
  const getallProducts = () => {
    dispatch(getAllProducts())
    dispatch(getUserCart())
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
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading uppercase">Featured Collection</h3>
          </div>
          {productState && productState?.map((item, index) => {
            if (item.tags === "featured") {
              return (
                <div
                  key={index}
                  className='col-3' onClick={() => {
                    navigate("/product/" + item?._id);
                    window.scrollTo(0, 0);
                  }}>
                  <div
                    className="product-card position-relative">
                    {/* <div className="wishlist-icon absolute">
                      <button className='border-0 bg-transparent' onClick={(e) => { addToWish(item?._id) }}>
                        <img src={wish} alt="wishlist" />
                      </button>
                    </div> */}
                    <div className="product-image">
                      <img src={item?.images[0]?.url} className='img-fluid d-block mx-auto' alt="product image" width={300} />
                      <img src={item?.images[1]?.url} className='img-fluid' alt="product image" />

                    </div>
                    <div className="product-details">
                      <h5 className="product-title">
                        {item?.title}
                      </h5>
                      {/* <ReactStars count={5} size={24} activeColor='#ffd700' value={item?.totalrating.toString()} edit={false} /> */}


                      <p className="price">Rs.{item?.price}</p>
                    </div>
                    {/* <div className="action-bar absolute">
                      <div className="flex flex-col gap-15">
                        <button className='border-0 bg-transparent'>
                          <img src={view}
                            alt="view" onClick={() => navigate("/product/" + item?._id)} />
                        </button>
                        <button className='border-0 bg-transparent'>
                          <img src={addcart}
                            alt="addcart" />
                        </button>

                      </div>
                    </div> */}
                  </div >
                </div >
              )
            }
          })}
        </div>
      </Container>
      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading uppercase">
              Special Products
            </h3>
          </div>
        </div>
        <div className="row">
          {productState && productState?.map((item, index) => {
            if (item.tags === "special") {
              return <SpecialProduct key={index} title={item?.title}
                id={item?._id}
                totalrating={item?.totalrating.toString()}
                price={item?.price}
                sold={item?.sold}
                quantity={item?.quantity} />

            }
          })}

        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading uppercase">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          {productState && productState?.map((item, index) => {
            if (item.tags === "popular") {
              return (
                <div
                  key={index}
                  className='col-3'
                  onClick={() => {
                    navigate("/product/" + item?._id);
                    window.scrollTo(0, 0);
                  }}

                >
                  <div

                    className="product-card position-relative">
                    {/* <div className="wishlist-icon absolute">
                      <button className='border-0 bg-transparent' onClick={(e) => { addToWish(item?._id) }}>
                        <img src={wish} alt="wishlist" />
                      </button>
                    </div> */}
                    <div className="product-image">
                      <img src={item?.images[0]?.url} className='img-fluid d-block mx-auto' alt="product image" width={300} />
                      <img src={item?.images[1]?.url} className='img-fluid' alt="product image" />

                    </div>
                    <div className="product-details">
                      <h5 className="product-title">
                        {item?.title}
                      </h5>
                      {/* <ReactStars count={5} size={24} activeColor='#ffd700' value={item?.totalrating.toString()} edit={false} class /> */}


                      <p className="price">Rs.{item?.price}</p>
                    </div>
                    {/* <div className="action-bar absolute">
                      <div className="flex flex-col gap-15">
                        <button className='border-0 bg-transparent'>
                          <img src={view}
                            alt="view"
                          //  onClick={() => navigate("/product/" + item?._id)}
                          />
                        </button>
                        <button className='border-0 bg-transparent'>
                          <img src={addcart}
                            alt="addcart" />
                        </button>

                      </div>
                    </div> */}
                  </div>
                </div >
              )
            }
          })}
        </div>
      </Container >


    </>
  )
}

export default Home
