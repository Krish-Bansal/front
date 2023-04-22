import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import ProductCard from '../components/ProductCard'
import ReactStars from 'react-rating-stars-component'
import ReactImageZoom from "react-image-zoom"
import Color from "../components/Color"
import { TbGitCompare } from "react-icons/tb"
import { AiOutlineHeart } from "react-icons/ai"
import Container from '../components/Container'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAProduct } from '../features/products/productSlice'
import { toast } from 'react-toastify'
import { addProdToCart, getUserCart } from "../features/user/userSlice"

const SingleProduct = () => {
  const [color, setColor] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const location = useLocation()
  const navigate = useNavigate()
  const getProductId = location.pathname.split("/")[2]
  const dispatch = useDispatch();
  const ProductState = useSelector(state => state?.product?.singleproduct)
  const productsState = useSelector(state => state?.product?.product)
  const cartState = useSelector(state => state?.auth?.cartProducts)
  useEffect(() => {
    dispatch(getAProduct(getProductId))
    dispatch(getUserCart())
  }, [])
  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true)
      }
    }
  })
  const uploadCart = () => {
    if (color === null) {
      toast.error("Please Choose A Color")
      return false
    } else {
      dispatch(addProdToCart({ productId: ProductState?._id, quantity, color, price: ProductState?.price }))
      navigate("/cart")
    }
  }



  const props = {
    width: 400, height: 600, zoomWidth: "600",
    img: ProductState?.images[0]?.url ? ProductState?.images[0]?.url : "ok"
  }
  const [orderedProduct, setorderedProduct] = useState(true);
  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  }
  const closeModal = () => { };
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
  }, [ProductState])
  console.log(popularProduct)
  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title="Product Name" />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {ProductState?.images.map((item, index) => {
                return <div>
                  <img src={item?.url}
                    alt="" className='img-fluid' />
                </div>
              })}


            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className='border-bottom'>
                <h3 className='title'>
                  {ProductState?.title}
                </h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">
                  Rs.{ProductState?.price}
                </p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars count={5} size={24} activeColor='#ffd700' value={ProductState?.totalrating} edit={false} />
                  <p className='mb-0 t-review'>(2 Reviews)</p>
                </div>
                <a href="#review" className='review-btn'>
                  Write a Review
                </a>
              </div>
              <div className="py-3">
                <div className='d-flex align-items-center gap-10 my-2'>
                  <h3 className='product-heading'>Type :</h3>
                  <p className='product-data'>Shirt</p>
                </div>
                <div className='d-flex align-items-center gap-10 my-2'>
                  <h3 className='product-heading'>Title :</h3>
                  <p className='product-data'>Shirt</p>
                </div>
                <div className='d-flex align-items-center gap-10 my-2'>
                  <h3 className='product-heading'>Category :</h3>
                  <p className='product-data'>{ProductState?.category}</p>
                </div>
                <div className='d-flex align-items-center gap-10 my-2'>
                  <h3 className='product-heading'>Tags :</h3>
                  <p className='product-data'>{ProductState?.tags}</p>
                </div>
                <div className='d-flex align-items-center gap-10 my-2'>
                  <h3 className='product-heading'>Availability :</h3>
                  <p className='product-data'>In Stock</p>
                </div>
                <div className='d-flex flex-column gap-10 mt-2 mb-3'>
                  <h3 className='product-heading'>Size :</h3>
                  <div className='d-flex flex-wrap gap-15'>
                    <span className="badge border-1 bg-white text-dark border-secondary">
                      S
                    </span>
                    <span className="badge border-1 bg-white text-dark border-secondary">
                      M
                    </span>
                    <span className="badge border-1 bg-white text-dark border-secondary">
                      L
                    </span>
                    <span className="badge border-1 bg-white text-dark border-secondary">
                      XL
                    </span>
                    <span className="badge border-1 bg-white text-dark border-secondary">
                      XXL
                    </span>
                  </div>
                </div>
                {
                  alreadyAdded === false && <>
                    <div className='d-flex flex-column gap-10 mt-2 mb-3'>
                      <h3 className='product-heading'>Color :</h3>
                      <Color setColor={setColor} colorData={ProductState?.color} />
                    </div>
                  </>
                }
                <div className='d-flex flex-row gap-15 mt-2 mb-3 align-items-center'>
                  {alreadyAdded === false && <>
                    <h3 className='product-heading'>Quantity:</h3>
                    <div className=''>
                      <input type="number" name="" min={1} max={10} className='form-control'
                        style={{ width: "70px" }} id="" onChange={(e) => setQuantity(e.target.value)}
                        value={quantity} />
                    </div>
                  </>
                  }
                  <div className={alreadyAdded ? "ms-0" : "ms-5" + 'd-flex align-items-center gap-30 ms-5'}>
                    <button
                      className='button border-0'
                      //  data-bs-toggle="modal"
                      // data-bs-target="#staticBackDrop"
                      type='button'
                      onClick={() => {
                        alreadyAdded ? navigate('/cart') : uploadCart()
                      }}>
                      {alreadyAdded ? "Go to Cart" : "Add to Cart"}
                    </button>
                    {/* <button className='button signup'>Buy It Now</button> */}

                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div className="">
                    <a href="" className='d-flex flex-row'>
                      <AiOutlineHeart className='fs-5 me-2' />Add to Wishlist
                    </a>
                  </div>
                  <div>
                    <a href="" className='d-flex flex-row'> <TbGitCompare className='fs-5 me-2' />Add to Compare</a>
                  </div>
                </div>
                <div className='d-flex gap-10 flex-column my-3'>
                  <h3 className='product-heading'>Shipping & Returns :</h3>
                  <p className='product-data'>Free Shipping  and Returns Available on all orders !
                    <br />
                    We Ship all domestic Orders Within <b> 5-10 Business Days!</b></p>
                </div>

                <div className='d-flex align-items-center gap-10 my-3'>
                  <h3 className='product-heading'>Product Link :</h3>
                  <a href="javascript:void(0);" onClick={() => {
                    copyToClipboard(
                      window.location.href
                    );
                  }}>
                    Copy Product Link                    </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container >
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className='bg-white p-3'>
              <p dangerouslySetInnerHTML={{
                __html: ProductState?.description
              }} >

              </p>
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
                  <h4 className=' mb-2'>
                    Customer Reviews
                  </h4>
                  <div className='d-flex gap-10 align-items-center'>
                    <ReactStars count={5} size={24} activeColor='#ffd700' value={4} edit={false} />
                    <p className='mb-0'>Based on 2 Reviews</p>
                  </div>
                </div>
                {
                  orderedProduct && (<div>
                    <a href="" className='text-dark text-decoration-underline'>Write a Review</a>
                  </div>)
                }
              </div>
              <div className="review-form py-4" >
                <h4>Write a Review</h4>
                <form action="" className='d-flex flex-column gap-15'>
                  <div>
                    <ReactStars count={5} size={24} activeColor='#ffd700' value={4} edit={true} />
                  </div>
                  <div>
                    <textarea name="" id="" cols="30" rows="4" className='w-100 form-control' placeholder='Comments'>

                    </textarea>
                  </div>
                  <div className='d-flex justify-content-end'>
                    <button className='button border-0'>Submit Review</button>
                  </div>

                </form>
              </div>
              <div className="reviews mt-4">
                <div className="review">
                  <div className='d-flex gap-10 align-items-center'>
                    <h6 className='mb-0'>Krish Bansal</h6>
                    <ReactStars count={5} size={24} activeColor='#ffd700' value={4} edit={false} />
                  </div>

                  <p className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore tempora ratione, voluptatibus eligendi dignissimos eos? </p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
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
