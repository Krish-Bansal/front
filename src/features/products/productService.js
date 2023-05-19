import axios from "axios";
import { base_url } from "../../utils/axiosConfig";
const getProducts = async (data) => {
  console.log(data)
  const response = await axios.get(`${base_url}product?${data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""}${data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""}${data?.sort ? `sort=${data?.sort}&&` : ""}`
  );
  if (response.data) {
    return response.data;
  }
}
const getSingleProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  if (response.data) {
    return response.data;
  }
}
const addToWishlist = async (prodId, config) => {
  const response = await axios.put(`${base_url}product/wishlist`, { prodId }, config);
  if (response.data) {
    return response.data;
  }
}
const addaReview = async (id, values, config) => {
  const response = await axios.post(`${base_url}product/${id.id}/reviews`, id.values, id.config,)
  if (response.data) {
    return response.data
  }
}
const getReviews = async () => {
  const response = await axios.get(`${base_url}product/reviews/total`)
  if (response.data) {
    return response.data
  }
}




export const productService = {
  getProducts, addToWishlist, getSingleProduct, addaReview, getReviews
}