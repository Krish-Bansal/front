import React from 'react'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <Meta title={"404 Not Found - DEFY"} />
      <div className='flex align-middle justify-center'>
        <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_xiebbQE7S1.json" style={{ width: "38%" }} background="transparent" speed="1" loop autoplay></lottie-player>
      </div>
      <div className='not-found text-center'>
        <h3>Are you sure the website URL is correct?</h3>
        <h2>Get in touch with the site owner. </h2>
        <button><Link to={"/"}>
          Go to home page</Link>

        </button>
      </div>
    </>
  )
}

export default NotFound