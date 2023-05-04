import React from 'react'
import { useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { BsEyeSlash } from 'react-icons/bs'

const CustomInput = (props) => {
  const { type, label, placeholder, name, id, className, value, onChange, onBlur, disabled } = props;
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="form-floating mt-3 position-relative">
      <input type={showPassword ? 'text' : type}
        name={name}
        id={id}
        className={`form-control ${className}`}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      <label htmlFor={id}>{label}</label>
      {type === 'password' && (
        <button
          type="button"
          className="password-toggle position-absolute top-50 end-0 translate-middle-y border-0 bg-white " style={{ marginRight: "6px" }}
          onClick={toggleShowPassword}

        >
          {showPassword ? <BsEyeSlash className='' /> : <AiOutlineEye />}
        </button>
      )}
    </div>
  )
}

export default CustomInput
