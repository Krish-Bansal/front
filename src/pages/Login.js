import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap"
import { useFormik } from "formik"
import * as yup from 'yup'
import CustomInput from '../components/CustomInput'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Logo1 from "../assests1/defy_logo-removebg-preview.png";
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/user/userSlice'
import { AiOutlineArrowRight } from "react-icons/ai"

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
  const errorMessage = useSelector((state) => state.auth.errorMessagelogin);
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % imageCount);
    }, 5500);
    return () => clearInterval(intervalId)
  }, [])
  const authState = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values))
    }
  })

  useEffect(() => {
    if (authState.user !== null && authState.isSuccess === true) {
      navigate("/")
      // toast.info("User Logged In Successfully")
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
    <div style={{ background: "white", minHeight: '100vh' }}>

      <Container fluid>
        <Row>
          <Col md={6} className="p-0">
            <img src={images[currentImageIndex]} alt="DEFY Product" className='opacity-80' style={{ width: '100%', height: '100vh', objectFit: 'cover', opacity: "95" }} />
          </Col>
          <Col style={{ fontFamily: 'sans-serif' }}>
            <div className='flex justify-between align-items-center'>
              <img src={Logo1} alt="DEFY Logo" style={{ width: '27%', height: "20%" }} />
              <Link to="/signup" className='mr-7 inline-flex'>Create an account &nbsp;<AiOutlineArrowRight className='pt-0 m-0 fs-4' /></Link>
            </div>


            <div className="mt-0 px-5 w-75 py-3">
              <h1 className='text-left title text-[#260810]' style={{ fontSize: "26px" }}>SignIn</h1>
              <p className='text-left text-[#2F4F5E]'>Login to your account to continue</p>

              <form action="" className='mt-2' onSubmit={formik.handleSubmit}>
                <div>
                  {/* Render other UI components */}
                  {errorMessage && <p className='action-error'>{errorMessage}</p>} {/* Render the error message if it exists */}
                </div>
                <CustomInput type="text" name="email" label="Email Address" placeholder="Email Address" id="email" value={formik.values.email}
                  onChange={formik.handleChange("email")} />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
                <CustomInput type={showPassword ? "text" : "password"} name="password" placeholder="Email Address" label="Password" id="password" value={formik.values.password}
                  onChange={formik.handleChange("password")}

                  icon={showPassword ? <FaEyeSlash onClick={toggleShowPassword} /> : <FaEye onClick={toggleShowPassword} />} />
                <div className="error">
                  {formik.touched.password && formik.errors.password ? (<div>{formik.errors.password}</div>) : null}
                </div>
                <button className='border-0 rounded-3 px-3 py-1 text-white font-light w-35 fs-5 text-decoration-none my-3' type="submit" style={{ backgroundColor: "#FBA71A" }}>Login</button>

                <div className='mb-3 text-start'>
                  <Link to="/forgot-password" className='text-[#2F4F5E]' style={{ textDecoration: "none", fontSize: "14px", fontFamily: "unset" }}>FORGOT LOGIN PASSWORD?
                  </Link>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>

    </div>);
};



// {/* <div className="col-6 p-0">

//                   <div className="auth-card">
//                     <h3 className='text-center mb-3'>Login</h3>
//                     <form action="" className='d-flex flex-column gap-15' onSubmit={formik.handleSubmit}>
//                       <CustomInput type="email" name='email' placeholder='Email'
//                         onChange={formik.handleChange("email")}
//                         onBlur={formik.handleBlur("email")}
//                         value={formik.values.email} />
//                       <div className="error">
//                         {formik.touched.email && formik.errors.email}
//                       </div>
//                       <CustomInput type="password" name='password' placeholder='Password' onChange={formik.handleChange("password")}
//                         onBlur={formik.handleBlur("password")}
//                         value={formik.values.password} />
//                       <div className="error">
//                         {formik.touched.password && formik.errors.password}
//                       </div>
//                       <div>
//                         <Link to="/forgot-password">Forgot your Password?</Link>
//                         <div className=' mt-3 d-flex justify-content-center align-items-center gap-15'>
//                           <button className='button border-0' type='submit'>Login</button>
//                           <Link className='button signup' to="/signup">SignUp</Link>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div> */}



export default Login
