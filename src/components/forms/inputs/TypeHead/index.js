import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

export default ({
	                input, placeholder, meta, className, options, style, rest,
                }) => {
	return <Typeahead
		{...input}
		className={`form-control custom-input ${className || ''} ${meta.invalid && meta.error ? 'is-invalid' : ''}`}
		options={options}
		clearButton={true}
		minLength={1}
		style={style}
		{...rest}
	/>;
};
