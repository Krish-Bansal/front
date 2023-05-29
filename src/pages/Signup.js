import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap"
import Logo1 from "../assests1/defy_logo-removebg-preview.png";
import CustomInput from '../components/CustomInput'
import { useFormik } from "formik"
import * as yup from 'yup'
import { useDispatch } from "react-redux"
import { registerUser, resetState } from '../features/user/userSlice'
import { useSelector } from "react-redux"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useMediaQuery } from 'react-responsive';



const images = [
  require('../assests/285820107_969410360393154_8615687616660637758_n.jpg'),
  require('../assests/299934016_606137061154381_4926188596946588395_n.jpg'),
  require("../assests/315897274_1310933299654769_6150792394996701061_n.jpg"),
  require("../assests/299228253_760910808572564_2479402739618947677_n.jpg"),
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
const signUpSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  email: yup.string().email("Email Should be Valid").required("Email Address is Required"),
  mobile: yup.number().min(1000000000, "Mobile Number must be at least 10 digits").typeError("Mobile Number must be a number").required("Mobile Number is Required"),
  password: yup.string()
    .required("Password is Required")
    .matches(
      /^(?=.*[A-Z]).{8,}$/,
      "Password must contain at least 8 characters, including one uppercase letter"
    )
})

const Signup = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const isMobile = !isDesktop;
  const errorMessage = useSelector((state) => state.auth.errorMessagesignup);
  const authState = useSelector(state => state?.auth)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % imageCount);
    }, 5500);
    return () => clearInterval(intervalId)
  }, [])
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: ""
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values))
    }
  })
  useEffect(() => {
    if (authState?.createdUser !== null && authState?.isSuccess === true && authState?.isError === false) {
      navigate("/login");
      dispatch(resetState())
    }
    // eslint-disable-next-line
  }, [authState]);

  // const [showPassword, setShowPassword] = useState(false);

  // const toggleShowPassword = () => {
  //   setShowPassword(prevShowPassword => !prevShowPassword);
  // };
  return (
    <div>
      <Container fluid>
        <Row>
          {!isMobile && (
            <Col md={6} className="p-0">
              <img src={images[currentImageIndex]} alt="DEFY Product" className='opacity-80' style={{ width: '100%', height: '100vh', objectFit: 'cover', opacity: "95" }} />
            </Col>
          )}
          <Col style={{ fontFamily: 'sans-serif' }}>
            <div className='flex justify-between align-items-center'>
              <img src={Logo1} alt="DEFY Logo" style={{ width: '27%', height: "20%" }} />
              <Link to="/login" key={Math.random()} className='mr-[3.5%] inline-flex'>
                <AiOutlineArrowLeft className='pt-0 m-0 fs-4' />&nbsp;Go Back </Link>
            </div>
            <div className="mt-0 px-[5.5%] py-[2.5%]">
              <h1 className='text-center title text-[#260810] text-3xl'>SignUp</h1>
              <p className='text-center mt-[2%] text-[#2F4F5E]'>By having a Defy account, you can purchase items,get exciting offers and many more.
                Sign up in just seconds.</p>

              <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column '>
                <div>
                  {/* Render other UI components */}
                  {Array.isArray(errorMessage) && errorMessage.map((message, index) => (
                    <p key={index} className='action-error'>{message}</p>
                  ))}
                </div>

                <CustomInput type="text"
                  label="First Name" name='firstname' placeholder="First Name" value={formik.values.firstname} onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")} />
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
                <CustomInput type="text" placeholder="Last Name" label="Last Name" name='lastname' value={formik.values.lastname} onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")} />
                <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>

                <CustomInput type="email" name='email' placeholder='Email'
                  value={formik.values.email} onChange={formik.handleChange("email")} label="Email Address"
                  onBlur={formik.handleBlur("email")} />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
                <CustomInput type="tel" name='mobile' placeholder='Mobile Number' label="Mobile Number"
                  value={formik.values.mobile} onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>

                <CustomInput type="password" name='password' placeholder='Password'
                  label="Password"
                  value={formik.values.password} onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")} />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <p className='text-center mt-[1%]'>By signing up, you agree to the <Link to="/terms-conditions" className='text-blue-400'>terms and conditions</Link></p>
                <button className='border-0 rounded-3 px-3 py-1 text-white font-light w-100 fs-5 text-decoration-none my-[2.5%]' type="submit" style={{ backgroundColor: "#FBA71A" }}>Create a account</button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Signup
