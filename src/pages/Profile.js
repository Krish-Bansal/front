import React, { useState } from 'react'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { updateProfile } from '../features/user/userSlice'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { FiEdit } from "react-icons/fi"



const profileSchema = yup.object({
  firstname: yup.string().required("First Name Is Required"),
  lastname: yup.string().required("Last Name Is Required"),
  email: yup.string().email("Email Should be Valid").required("Last Name Is Required"),
  mobile: yup.string().required("Mobile No Is Required"),
})


const Profile = () => {

  const dispatch = useDispatch();
  const userState = useSelector(state => state?.auth?.user)
  const [edit, setEdit] = useState(true)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userState?.firstname,
      lastname: userState?.lastname,
      email: userState?.email,
      mobile: userState?.mobile,
    }
    ,

    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateProfile(values))
      setEdit(true)
    }
  })
  return (
    <div>
      <BreadCrumb title="My Profile" />
      <Container class1='cart-wrapper home-wrapper-2 py-5'>
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="my-3">Update Profile</h3>
              <FiEdit onClick={() => setEdit(false)} className='fs-5' />
            </div>
          </div>
          <div className="col-12">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="example1" className='form-label'>First Name
                </label>
                <CustomInput type="text" id="example1" name='firstname' placeholder="First Name" value={formik.values.firstname} onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")} disabled={edit} />
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="example2" className='form-label'>Last Name</label>
                <CustomInput type="text" id="example2" name='lastname' placeholder="last Name" value={formik.values.lastname} onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")} disabled={edit} />
                <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail" className='form-label'>Email Address
                </label>
                <CustomInput type="email" id="exampleInputEmail" name='email' value={formik.values.email} onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("lastname")} disabled={edit} />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail2" className='form-label'>Mobile No
                </label>
                <CustomInput type="number" name='mobile' id="exampleInputEmail2" value={formik.values.mobile} onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")} disabled={edit} />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>

                {
                  edit === false && <button type="submit" className='btn btn-primary mt-3 bg-primary'>Save</button>
                }
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Profile