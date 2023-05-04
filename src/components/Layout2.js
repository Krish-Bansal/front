import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header2 from './Header2'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Hero from './Hero';
const Layout2 = () => {
  return (
    <>
      <Header2 />
      <Hero />
      <Outlet />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss draggable
        pauseOnHover theme="light"
      />
    </>
  )
}

export default Layout2;
