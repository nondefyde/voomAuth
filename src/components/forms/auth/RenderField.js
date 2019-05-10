import React from 'react';

const RenderField = ({
	input,
	placeholder,
	type,
	meta: { touched, error, warning }
  }) => (
    <div className="form-group">
    <input {...input} placeholder={placeholder} type={type} className="form-control"  />
    {touched &&
        ((error && <small className="form-text text-danger">{error}</small>) ||
        (warning && <span>{warning}</span>))}
    </div>
)

export default RenderField;
