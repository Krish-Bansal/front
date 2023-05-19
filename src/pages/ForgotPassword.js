import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import * as yup from "yup"
import { Container, Row, Col } from 'react-bootstrap';
import CustomInput from '../components/CustomInput'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { forgotPasswordToken } from '../features/user/userSlice'
import Logo1 from "../assests/defy_logo-removebg-preview.png"
import { AiOutlineArrowLeft } from "react-icons/ai"

const images = [
  require('../assests/285820107_969410360393154_8615687616660637758_n.jpg'),
  require('../assests/299934016_606137061154381_4926188596946588395_n.jpg'),
  // require("../assests/315897274_131093299654769_6150792394996701061_n.jpg"),
  require("../assests/174304971_162941172375004_4470709580256700664_n.jpg"),
  require("../assests/291986335_580280366956910_247166510855750651_n.jpg"),
  require("../assests/299855809_464251461968427_3382595852652178942_n.jpg"),
  require("../assests/280658654_744348826772712_3740684213881336350_n.jpg"),
  require("../assests/287059290_1219115748831788_8353289818307487506_n.jpg"),
  require("../assests/279574116_1393017354548923_191593714226726875_n.jpg"),
  require("../assests/281779478_293827942840968_522703434417999603_n.jpg"),
  require("../assests/299601210_593333319130926_8669958029937745870_n.jpg"),
  require("../assests/285862204_1644431799263076_2985826676092941228_n.jpg")
]

const imageCount = images.length;

const emailSchema = yup.object({
  email: yup.string().email("Email Should be Valid").required("Email Address is Required")
});

const ForgotPassword = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % imageCount);
    }, 5500);
    return () => clearInterval(intervalId)
  }, [])
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      dispatch(forgotPasswordToken(values))
    }
  })
  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <Container fluid>
        <Row>
          <Col md={6} className='p-0'>

            <img src={images[currentImageIndex]} alt="DEFY Product" className='opacity-80' style={{ width: '100%', height: '100vh', objectFit: 'cover', opacity: "95" }} />


          </Col>
          <Col style={{ fontFamily: "sans-serif" }}>

            <div className='flex justify-between align-items-center'>
              <img src={Logo1} alt="DEFY Logo" style={{ width: '27%', height: "20%" }} />
              <Link to="/login" className='mr-7 inline-flex'>
                <AiOutlineArrowLeft className='pt-0 m-0 fs-4' />&nbsp; Go Back</Link>
            </div>

            <div className="mt-0 px-5 w-75 py-3">
              <h1 className='text-left title text-[#260810]' style={{ fontSize: "24px" }}>Forgot Password</h1>
              <p className='text-left text-[#2F4F5E]'>Please Enter your registered email to reset password</p>
              <form action="" onSubmit={formik.handleSubmit} >
                <CustomInput type="email" name='email' placeholder='Email' label="Email Address"
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email} />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
                <div>

                  <button className='border-0 rounded-3 px-3 py-1 text-white font-light w-35 fs-5 text-decoration-none my-3' type="submit" style={{ backgroundColor: "#FBA71A" }}>Send Link</button>





                </div>
              </form>

            </div>
          </Col>
        </Row>
      </Container>
    </div>


  )
}

export default ForgotPassword
