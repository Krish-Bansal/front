import React from 'react'
import { Link } from 'react-router-dom'
import Marquee from 'react-fast-marquee'
import ProductCard from '../components/ProductCard'
import SpecialProduct from '../components/SpecialProduct'
import Container from '../components/Container'
import { services } from '../utils/Data'

const Home = () => {
  return (
    <>
      <Container class1="home-wrapper-1 py-5">
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
      </Container>
      <Container class1="home-wrapper-2 py-5">
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
      </Container>
      <Container class1="home-wrapper-2 py-5">
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

      </Container>
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Container>
      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">
              Special Products
            </h3>
          </div>
        </div>
        <div className="row">
          <SpecialProduct />
          <SpecialProduct />
          <SpecialProduct />
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Container>
      <Container class1="marquee-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className='flex'>
                I can be a React Component,multiple react components or some text.
              </Marquee>
            </div>
          </div>
        </div>
      </Container>

    </>
  )
}

export default Home
