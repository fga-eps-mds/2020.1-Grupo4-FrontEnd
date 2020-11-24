import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Input = ({
  label,
  name,
  type,
  placeholder,
  defaultValue,
  register,
  errors,
  required = false, // eslint-disable-line no-unused-vars
  pattern = {},  // eslint-disable-line no-unused-vars
  ...otherProps
}) => {
  return (
    <div className="custom-input">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        ref={register}
        {...otherProps}
      />
      {errors[name] ? <span className="error">{errors[name].message}</span> : null}
    </div>
)};

Input.defaultProps = {
  type: "text",
  placeholder: "",
  defaultValue: "",
  required: "",
  pattern: {value: {}, message: ""},
  errors: null
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  register: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.string,
  pattern: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.object]),
    message: PropTypes.string.isRequired
  }),
  errors: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.object
  ]),
};
export default (Input);
