import React from 'react';
import { useDispatch } from 'react-redux';
import { addToWishlist, getAProduct } from '../features/products/productSlice';
import { AiOutlineHeart } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductCard = (props) => {
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
  const { grid, data } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation()
  const addToWish = (id, config) => {
    dispatch(addToWishlist({ id, config }));
  };
  // const getProductId = location.pathname.split("/")[2]

  return (
    <>
      {data &&
        data.map((item, index) => (
          <div
            key={index}
            className={`gr-${grid} cursor-pointer`}
          >
            <div onClick={() => {
              dispatch(getAProduct(item?._id));
              navigate(`/product/${item?._id}`)
            }}>
              <div className="product-card position-relative">
                <div
                  className="absolute wish-icon-box cursor-pointer"
                  onClick={(e) => {
                    addToWish(item?._id, config2);
                    e.stopPropagation();
                  }}
                >
                  <AiOutlineHeart className="fs-4" />
                </div>
                <div className="product-image">
                  <img
                    src={item?.images[0]?.url}
                    className="img-fluid d-block mx-auto"
                    alt="Product 1"
                    width={160}
                  />
                  <img src={item?.images[1]?.url} className="img-fluid" alt="Product 2" />
                </div>
                <div className="product-details">
                  <h5 className="product-title">{item?.title}</h5>
                  <p
                    className={`description ${grid === 12 ? 'd-block' : 'd-none'}`}
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></p>
                  <p className="price">Rs.{item?.price}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
export default ProductCard;
