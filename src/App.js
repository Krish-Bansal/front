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

        <Route path='login' element={<OpenRoutes><Login /></OpenRoutes>} />  {/* Mobile Done */}
        <Route path='forgot-password' element={<ForgotPassword />} /> {/* Mobile Done */}
        <Route path='reset-password/:token' element={<ResetPassword />} />{/* Mobile Done */}
        <Route path='signup' element={
          <OpenRoutes>
            <Signup />{/* Mobile Done */}
          </OpenRoutes>} />
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Layout2 />} >
          <Route index element={<Home />} /> {/* Mobile Done */}
        </Route>
        <Route path='/' element={<Layout />} >
          <Route path="about" element={<About />} />
          <Route path='contact' element={<Contact />} /> {/* Mobile Done */}
          <Route path='product' element={<OurStore />} /> {/* Mobile Done */}
          <Route path='shirt' element={<ShirtCat />} /> {/* Mobile Done */}
          <Route path='pant' element={<PantCat />} />{/* Mobile Done */}
          <Route path='product/:id' element={<SingleProduct />} /> {/* Mobile Done */}
          <Route path='Wishlist' element={<PrivateRoutes>
            <Wishlist /> {/* Mobile Done */}
          </PrivateRoutes>} />
          <Route path='cart' element={<PrivateRoutes>
            <Cart />
          </PrivateRoutes>} />
          <Route path='my-orders' element={<PrivateRoutes>
            <Orders /> {/* Mobile Done */}
          </PrivateRoutes>} />
          <Route path='my-profile' element={<PrivateRoutes>
            <Profile /> {/* Mobile Done */}
          </PrivateRoutes>} />
          <Route path='checkout' element={<PrivateRoutes>
            <Checkout />  {/* Mobile Done */}
          </PrivateRoutes>} />
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
