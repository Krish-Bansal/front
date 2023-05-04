import React from 'react'
import { Link } from 'react-router-dom'
import Container from './Container'

const BreadCrumb = (props) => {
  const { title } = props
  return (
    <Container class1='breadcrumb mb-0 py-4 '>
      <div className="row">
        <div className="col-12 ">
          <p className='text-center mb-0'>
            <Link to="/" className='text-dark'>Home &nbsp;</Link>

            / {title}
          </p>
        </div>
      </div>

    </Container>
  )
}

export default BreadCrumb
