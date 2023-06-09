import React, { useEffect } from 'react'
import Meta from '../components/Meta'
import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useDispatch, useSelector } from "react-redux"
import Container from '../components/Container'
import { getAllProducts } from '../features/products/productSlice'
import { useMediaQuery } from 'react-responsive';


const PantCat = () => {
  const isSmall = useMediaQuery({ maxWidth: 575.98 });
  const isMiddle = useMediaQuery({ minWidth: 576, maxWidth: 991.98 });
  const width = isSmall ? '20px' : isMiddle ? '80px' : '100px';
  const productState = useSelector((state) => state?.product?.product);
  const dispatch = useDispatch();
  const [sort, setSort] = useState(null)
  useEffect(() => {
    let category = []
    let newtags = [];
    let newColors = []
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      category.push(element.category)
      newtags.push(element.tags)
      newColors.push(element.color)
    }
  }, [productState])

  useEffect(() => {
    getProducts()
    // eslint-disable-next-line
  }, [sort])
  const getProducts = () => {
    dispatch(getAllProducts({ sort }))
  }
  const pantProducts = productState ? productState.filter(product => product.category === "Pant") : [];
  const pantProductsCount = pantProducts.length;
  return (
    <>
      <Meta title={"Pants"} />

      <Container class1="store-wrapper home-wrapper-2 py-[5rem]">
        <div className="row">
          {/* <div className="col-3">
            <div className='filter-card mb-3'>
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
                <ul className='ps-0'>
                  {
                    categories && [...new Set(categories)].map((item, index) => {
                      return <li key={index} onClick={() => setCategory(item)}>{item}</li>
                    })
                  }
                </ul>
              </div>
            </div>
            <div className='filter-card mb-3'>
              <h3 className="filter-title">Filter By</h3>
              <div>
                <h5 className="sub-title">Availability</h5>
                <div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" value="" id="" />
                    <label htmlFor="" className='form-check-label'>
                      In Stock(1)
                    </label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" value="" id="" />
                    <label htmlFor="" className='form-check-label'>
                      Out of Stock(0)
                    </label>
                  </div>

                </div>
                <h5 className="sub-title">Price</h5>
                <div className='d-flex align-items-center gap-10'>
                  <div className="form-floating ">
                    <input type="email" className='form-control' id='floatingInput' placeholder='From' onChange={(e) => setMinPrice(e.target.value)} />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating ">
                    <input type="email" className='form-control' id='floatingInput1' placeholder='To'
                      onChange={(e) => setMaxPrice(e.target.value)} />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>
                <h5 className="sub-title">Colors</h5>
                <div>
                  <Color />
                </div>

                <h5 className="sub-title">Size</h5>
                <div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" value="" id="color-1" />
                    <label htmlFor="color-1" className='form-check-label'>
                      S (2)
                    </label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" value="" id="color-2" />
                    <label htmlFor="color-2" className='form-check-label'>
                      M (2)
                    </label>
                  </div>

                </div>
              </div>
            </div>
            <div className='filter-card mb-3'>
              <h3 className="filter-title">Product Tags</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items center gap-10">

                  {
                    tags && [...new Set(tags)].map((item, index) => {
                      return (<span onClick={() => {
                        setTag(item)
                      }} key={index} className='badge bg-light text-secondary rounded-3 py-2 px-3'>{item}</span>)
                    })
                  }


                </div>
              </div>
            </div>
            <div className='filter-card mb-3'>
              <h3 className="filter-title">
                Random Product
              </h3>
              <div>
                <div className="random-products d-flex mb-3">
                  <div className="w-50">
                    <img src="images/watch.jpg" alt="watch" className='img-fluid' />
                  </div>
                  <div className="w-50">
                    <h5>
                      Kids headphone bulk 10 pack multi colored for students
                    </h5>
                    <ReactStars count={5} size={24} value={4} edit={false}
                      activeColor="#ffd700" />

                    <b>$300</b>

                  </div>

                </div>
                <div className="random-products d-flex">
                  <div className="w-50">
                    <img src="images/watch.jpg" alt="watch" className='img-fluid' />
                  </div>
                  <div className="w-50">
                    <h5>
                      Kids headphone bulk 10 pack multi colored for students
                    </h5>
                    <ReactStars count={5} size={24} value={4} edit={false}
                      activeColor="#ffd700" />

                    <b>$300</b>

                  </div>

                </div>
              </div>
            </div>
          </div> */}
          <div className="col-12">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className='d-flex align-items-center gap-10'>
                  <p className="mb-0 d-block store-sort" style={{ width }}>Sort By:</p>
                  <select name="" id="" className='form-control form-select py-[2%] ' onChange={(e) => setSort(e.target.value)}>
                    <option value="title">Alphabetically, A-Z</option>
                    <option value="-title">Alphabetically,Z-A</option>
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                  </select>
                </div>
                <div className='d-flex align-items-center gap-10 grid'>
                  <p className="totalproducts mb-0">
                    {pantProductsCount} Products
                  </p>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex justify-around flex-wrap" style={{ gap: '0%' }}>
                <ProductCard
                  data={pantProducts ? pantProducts : []}
                  grid={isSmall ? 6 : isMiddle ? 4 : 3}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default PantCat
