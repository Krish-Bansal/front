import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
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
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={
            <OpenRoutes>
              <Login />
            </OpenRoutes>} />
          <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path='contact' element={<Contact />} />
            <Route path='product' element={<OurStore />} />
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
            <Route path='reset-password/:token' element={<ResetPassword />} />
            <Route path='privacy-policy' element={<PrivacyPolicy />} />
            <Route path='refund-policy' element={<RefundPolicy />} />
            <Route path='shipping-policy' element={<ShippingPolicy />} />
            <Route path='terms-conditions' element={<TermsandConditions />} />









          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
