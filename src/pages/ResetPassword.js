import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import Logo1 from "../assests/defy_logo-removebg-preview.png"
import { useFormik } from "formik"
import { resetPassword } from '../features/user/userSlice'
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

const passwordSchema = yup.object({
  password: yup.string().required("Password is Required")
})
const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const isMobile = !isDesktop;
  const ResetPassErrorMessage = useSelector((state) => state.auth.resetError);
  const ResetPassSuccessMessage = useSelector((state) => state.auth.resetPass);

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % imageCount);
    }, 5500);
    return () => clearInterval(intervalId)
  }, [])
  const location = useLocation();
  const getToken = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      dispatch(resetPassword({ token: getToken, password: values.password }))
    }
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true before dispatching the password reset action

    try {
      await formik.handleSubmit();
      // Handle successful password reset here
      // You can display a success message or navigate to the login page
    } catch (error) {
      // Handle error here
      // You can display an error message or perform any necessary error handling
    } finally {
      setLoading(false); // Set loading state to false after handling the response (success or error)
    }
  };
  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <Container fluid>
        <Row>
          {!isMobile && (
            <Col md={6} className="p-0">
              <img src={images[currentImageIndex]} alt="DEFY Product" className='opacity-80' style={{ width: '100%', height: '100vh', objectFit: 'cover', opacity: "95" }} />
            </Col>
          )}
          <Col style={{ fontFamily: "sans-serif" }}>
            <img src={Logo1} alt="DEFY Logo" style={{ width: '26%', height: "auto" }} />
            <div className="mt-0 px-[5.5%] py-[2.5%]">
              <h1 className='text-center title text-[#260810] text-2xl'>Reset Password</h1>
              <p className='text-center text-[#2F4F5E]'>Please Enter your new password</p>
              <form action="" className="mt-[2%]" onSubmit={handleSubmit}>
                <CustomInput
                  type="password"
                  name="password"
                  label="New Password"
                  placeholder="New Password"
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  value={formik.values.email}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                {ResetPassSuccessMessage && (
                  <div className="success">{ResetPassSuccessMessage}</div>
                )}
                {ResetPassErrorMessage && (
                  <div className="error">{ResetPassErrorMessage}</div>
                )}
                <button
                  className="border-0 rounded-3 px-3 py-1 text-white font-light fs-5 w-100 text-decoration-none my-[2.5%]"
                  type="submit"
                  style={{ backgroundColor: "#FBA71A" }}
                  disabled={loading} // Disable the button while loading
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>

            </div>
          </Col>
        </Row>
      </Container>
    </div>

  )
}

export default ResetPassword
