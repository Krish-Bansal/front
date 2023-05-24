import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Layout2 from './components/Layout2';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import OurStore from './pages/OurStore';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import TermsandConditions from './pages/TermsandConditions';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing/OpenRoutes';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ShirtCat from './pages/ShirtCat';
import PantCat from './pages/PantCat';
function App() {
  return (
    <>

      <Routes>
        <Route path='login' element={<OpenRoutes><Login /></OpenRoutes>} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='reset-password/:token' element={<ResetPassword />} />
        <Route path='signup' element={
          <OpenRoutes>
            <Signup />
          </OpenRoutes>} />
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Layout2 />} >
          <Route index element={<Home />} />
        </Route>
        <Route path='/' element={<Layout />} >
          <Route path="about" element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='product' element={<OurStore />} />
          <Route path='shirt' element={<ShirtCat />} />
          <Route path='pant' element={<PantCat />} />

          <Route path='product/:id' element={<SingleProduct />} />
          <Route path='Wishlist' element={<PrivateRoutes>
            <Wishlist />
          </PrivateRoutes>} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='cart' element={<PrivateRoutes>
            <Cart />
          </PrivateRoutes>} />
          <Route path='my-orders' element={<PrivateRoutes>
            <Orders />
          </PrivateRoutes>} />
          <Route path='my-profile' element={<PrivateRoutes>
            <Profile />
          </PrivateRoutes>} />
          <Route path='checkout' element={<PrivateRoutes>
            <Checkout />
          </PrivateRoutes>} />
          <Route path='signup' element={
            <OpenRoutes>
              <Signup />
            </OpenRoutes>} />
          <Route path='privacy-policy' element={<PrivacyPolicy />} />
          <Route path='refund-policy' element={<RefundPolicy />} />
          <Route path='shipping-policy' element={<ShippingPolicy />} />
          <Route path='terms-conditions' element={<TermsandConditions />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;
