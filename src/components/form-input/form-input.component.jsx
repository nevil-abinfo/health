import React from "react";

import "./form-input.styles.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className="group">
    <input
      className={`${otherProps?.search ? "form-input-search" : "form-input"}`}
      onChange={handleChange}
      {...otherProps}
    />
    {label ? (
      <label
        className={`${otherProps?.value?.length ? "shrink" : ""} ${
          otherProps?.search ? "form-input-label-search" : "form-input-label"
        }`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
