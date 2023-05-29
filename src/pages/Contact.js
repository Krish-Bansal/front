import React from 'react'
import Meta from '../components/Meta'
// import BreadCrumb from '../components/BreadCrumb'
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai"
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi"
import Container from '../components/Container'
import * as yup from "yup"
import { useFormik } from "formik"
import { useDispatch } from 'react-redux'
import { createQuery } from '../features/contact/contactSlice'
import { useMediaQuery } from 'react-responsive';

const contactSchema = yup.object({
  name: yup.string().required("Name is Required"),
  email: yup.string().nullable().email("Email should be valid.").required("Email is Required"),
  mobile: yup.number().typeError("Mobile Number must be a number").required("Mobile Number is Required"),
  comment: yup.string().default("").nullable().required("Comment is Required"),
})

const Contact = () => {
  const isMobile = useMediaQuery({ maxWidth: 700 });

  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      email: "",
      comment: "",
    },
    validationSchema: contactSchema,
    onSubmit: values => {
      dispatch(createQuery(values))
    }
  })
  return (
    <>
      <Meta title={"Contact Us"} />
      {/* <BreadCrumb title="Contact Us" /> */}
      <Container class1="contact-wrapper py-[4%] home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14131.62642004159!2d85.27744113023991!3d27.689281324788567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19db552e700d%3A0xe8834659e01dc80c!2sDEFY%20LIFESTYLE!5e0!3m2!1sen!2snp!4v1679850407862!5m2!1sen!2snp" width="600" height="450" className='border-0 w-100' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title='location'>
            </iframe>
          </div>
          <div className="col-12 mt-[2%]">
            <div className="contact-inner-wrapper d-flex
              justify-content-between">
              <div>
                <h3 className='contact-title mb-[3%]'>Contact</h3>
                <form action="" className='d-flex flex-column gap-15' onSubmit={formik.handleSubmit}>
                  <div>
                    <input type="text" className='form-control' placeholder='Name'
                      onChange={formik.handleChange("name")}
                      onBlur={formik.handleBlur("name")}
                      value={formik.values.name} />
                    <div className="error">
                      {formik.touched.name && formik.errors.name}
                    </div>
                  </div>
                  <div>
                    <input type="email" className='form-control' placeholder='Email'
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                      value={formik.values.email} />
                    <div className="error">
                      {formik.touched.email && formik.errors.email}
                    </div>
                  </div>
                  <div>
                    <input type="tel" className='form-control' placeholder='Mobile Number'
                      onChange={formik.handleChange("mobile")}
                      onBlur={formik.handleBlur("mobile")}
                      value={formik.values.mobile} />
                    <div className="error">
                      {formik.touched.mobile && formik.errors.mobile}
                    </div>
                  </div>
                  <div>
                    <textarea
                      name="comment"
                      id="comment"
                      cols="30"
                      rows="4"
                      className="w-100 form-control"
                      placeholder="Comments &#10;(Please mention order id for exchange/return request)"
                      value={formik.values.comment}
                      onChange={formik.handleChange}
                    ></textarea>
                    <div className="error">
                      {formik.touched.comment && formik.errors.comment}
                    </div>
                  </div>
                  <div>
                    <button className='button border-0'> Submit</button>
                  </div>

                </form>
              </div>
              <div>
                <h3 className="contact-title mb-[2%]">Get in Touch With Us</h3>
                <div>
                  <ul className='ps-0'>
                    <li className='mb-3 d-flex gap-15 align-items-center'><AiOutlineHome className='fs-5' /><address className='mb-0'>
                      My Home/Shop Address</address></li>
                    <li className='mb-3 d-flex gap-15 align-items-center'><BiPhoneCall className='fs-5' />
                      <a href="tel:+919813783811">9813783811</a></li>
                    <li className='mb-3 d-flex gap-15 align-items-center'><AiOutlineMail className='fs-5' />
                      <a href="mailto:skbansal907@gmail.com">skbansal907@gmail.com</a></li>
                    <li className='mb-3 d-flex gap-15 align-items-center'><BiInfoCircle className='fs-5' /><p className='mb-0'>Monday-Friday 10AM - 6 PM</p></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </Container>
    </>
  )
}

export default Contact
