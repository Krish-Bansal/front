import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap"
import { useFormik } from "formik"
import * as yup from 'yup'
import CustomInput from '../components/CustomInput'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Logo1 from "../assests1/defy_logo-removebg-preview.png";
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/user/userSlice'
import { AiOutlineArrowRight } from "react-icons/ai"
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

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Email Should be Valid")
    .matches(/^[^@]+@[^@]+\.[^@]+$/, "Email Should be Valid")
    .required("Email Address is Required"),
  password: yup.string().required("Password is Required"),
})

const Login = () => {
  const [loading, setLoading] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const isMobile = !isDesktop;
  const errorMessage = useSelector((state) => state.auth.errorMessagelogin);
  const authState = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true); // Set loading state to true before making the login request
      try {
        await dispatch(loginUser(values)); // Make the login request to the backend

        // Handle the successful login response here, such as redirecting to a new page

      } catch (error) {
        // Handle any errors that occur during the login process, such as displaying an error message

      } finally {
        setLoading(false); // Set loading state to false after handling the response (success or error)
      }
    }
  })
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % imageCount);
    }, 5500);
    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (authState.user !== null && authState.isSuccess === true) {
      navigate("/")
    } else {
      if (authState.isError === true) {
      }
    }
    // eslint-disable-next-line
  }, [authState])


  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };
  return (

    <Container fluid>
      <Row>
        {/* Assuming you have a state variable 'isMobile' that determines if the device is mobile or not  */}
        {!isMobile && (
          <Col md={6} className="p-0">
            <img src={images[currentImageIndex]} alt="DEFY Product" className='opacity-80' style={{ width: '100%', height: '100vh', objectFit: 'cover', opacity: "95" }} />
          </Col>
        )}
        <Col style={{ fontFamily: 'sans-serif' }}>
          <div className='flex justify-between align-items-center'>
            <NavLink to={'/'}>
              <img src={Logo1} alt="DEFY Logo" style={{ width: '56%', height: "auto" }} /></NavLink>
            <Link to="/signup" className='mr-[3.5%] inline-flex text-center'>Register &nbsp;<AiOutlineArrowRight className='pt-0 m-0  fs-4' /></Link>
          </div>


          {/* <div className="d-flex justify-content-center align-items-center border-black" style={{ height: '100vh', width: "100vh", border: '1px solid black' }}> */}
          <div className="mt-[2%] px-[5.5%]  py-[2.5%]">
            <h1 className='text-center title text-[#260810] text-3xl'>SignIn</h1>
            <p className='text-center text-[#2F4F5E]'>Login to your account to continue</p>
            <form action="" className='mt-[3%]' onSubmit={formik.handleSubmit}>
              <div>
                {/* Render other UI components */}
                {errorMessage && <p className='action-error'>{errorMessage}</p>}
              </div>
              <CustomInput type="text" name="email" label="Email Address" placeholder="Email Address" id="email" value={formik.values.email} onChange={formik.handleChange("email")} />
              <div className="error">
                {formik.touched.email && formik.errors.email}
              </div>
              <CustomInput type={showPassword ? "text" : "password"} name="password" placeholder="Email Address" label="Password" id="password" value={formik.values.password} onChange={formik.handleChange("password")} icon={showPassword ? <FaEyeSlash onClick={toggleShowPassword} /> : <FaEye onClick={toggleShowPassword} />} />
              <div className="error">
                {formik.touched.password && formik.errors.password ? (<div>{formik.errors.password}</div>) : null}
              </div>
              <button
                className="border-0 rounded-3 px-3 py-1 text-white font-light w-100 fs-5 text-decoration-none my-[2.5%]"
                type="submit"
                style={{ backgroundColor: "#FBA71A" }}
                disabled={loading} // Disable the button while loading
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <div className='text-end'>
                <Link to="/forgot-password" className='text-sm text-[#2F4F5E]' style={{ textDecoration: "none", fontFamily: "unset" }}>FORGOT LOGIN PASSWORD?</Link>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Login
